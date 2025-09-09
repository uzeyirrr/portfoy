'use client';

import { useState, useRef, useCallback, useTransition, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    User,
    Briefcase,
    FileText,
    Mail,
    Github,
    Linkedin,
    Download,
    Phone,
    SendIcon,
    XIcon,
    LoaderIcon,
    ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import Link from "next/link";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { containerClassName?: string; showRing?: boolean }>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
      <div className={cn(
        "relative",
        containerClassName
      )}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showRing && isFocused && (
          <motion.span 
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

function TypingDots() {
    return (
        <div className="flex items-center ml-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-white/90 rounded-full mx-0.5"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)"
                    }}
                />
            ))}
        </div>
    );
}

export default function ChatPage() {
    const [value, setValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [, startTransition] = useTransition();
    const [messages, setMessages] = useState<Message[]>([]);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // URL'den gelen mesajı otomatik gönder
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialMessage = urlParams.get('message');
        if (initialMessage && messages.length === 0) {
            // URL'yi temizle
            window.history.replaceState({}, document.title, window.location.pathname);
            // Mesajı direkt gönder
            const userMessage: Message = {
                id: Date.now().toString(),
                text: initialMessage,
                isUser: true,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, userMessage]);
            
            startTransition(() => {
                setIsTyping(true);
                
                fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: initialMessage }),
                })
                .then(response => response.json())
                .then(data => {
                    const aiMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: data.response,
                        isUser: false,
                        timestamp: new Date()
                    };
                    
                    setMessages(prev => [...prev, aiMessage]);
                    setIsTyping(false);
                })
                .catch(error => {
                    console.error('Hata:', error);
                    const errorMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.',
                        isUser: false,
                        timestamp: new Date()
                    };
                    
                    setMessages(prev => [...prev, errorMessage]);
                    setIsTyping(false);
                });
            });
        }
    }, [messages.length]);

    // handleSendMessage fonksiyonunu useEffect'ten önce tanımla
    const handleSendMessage = async () => {
        if (value.trim()) {
            const userMessage: Message = {
                id: Date.now().toString(),
                text: value,
                isUser: true,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, userMessage]);
            const currentMessage = value;
            setValue("");
            adjustHeight(true);
            
            startTransition(() => {
                setIsTyping(true);
                
                fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: currentMessage }),
                })
                .then(response => response.json())
                .then(data => {
                    const aiMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: data.response,
                        isUser: false,
                        timestamp: new Date()
                    };
                    
                    setMessages(prev => [...prev, aiMessage]);
                    setIsTyping(false);
                })
                .catch(error => {
                    console.error('Hata:', error);
                    const errorMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.',
                        isUser: false,
                        timestamp: new Date()
                    };
                    
                    setMessages(prev => [...prev, errorMessage]);
                    setIsTyping(false);
                });
            });
        }
    };

    const quickQuestions = [
        {
            icon: <User className="w-4 h-4" />,
            text: "Kendinden bahseder misin?",
            action: "about"
        },
        {
            icon: <Briefcase className="w-4 h-4" />,
            text: "Hangi projeleri yaptın?",
            action: "projects"
        },
        {
            icon: <FileText className="w-4 h-4" />,
            text: "CV'ni indirebilir miyim?",
            action: "cv"
        },
        {
            icon: <Mail className="w-4 h-4" />,
            text: "İletişim bilgilerin neler?",
            action: "contact"
        },
        {
            icon: <Github className="w-4 h-4" />,
            text: "GitHub profilin nasıl?",
            action: "github"
        },
        {
            icon: <Linkedin className="w-4 h-4" />,
            text: "LinkedIn profilin nasıl?",
            action: "linkedin"
        }
    ];

    const handleQuickAction = (action: string) => {
        let messageText = "";
        
        switch(action) {
            case "about":
                messageText = "Kendinden bahseder misin? Kimsin, ne yapıyorsun?";
                break;
            case "projects":
                messageText = "Hangi projeleri yaptın? En beğendiğin projeler neler?";
                break;
            case "cv":
                messageText = "CV'ni indirebilir miyim?";
                break;
            case "contact":
                messageText = "İletişim bilgilerin neler? Nasıl iletişime geçebilirim?";
                break;
            case "github":
                messageText = "GitHub profilin nasıl? Hangi projelerin var?";
                break;
            case "linkedin":
                messageText = "LinkedIn profilin nasıl? Profesyonel deneyimlerin neler?";
                break;
        }
        
        // Mesajı direkt gönder
        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            isUser: true,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        
        startTransition(() => {
            setIsTyping(true);
            
            fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageText }),
            })
            .then(response => response.json())
            .then(data => {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: data.response,
                    isUser: false,
                    timestamp: new Date()
                };
                
                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);
            })
            .catch(error => {
                console.error('Hata:', error);
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.',
                    isUser: false,
                    timestamp: new Date()
                };
                
                setMessages(prev => [...prev, errorMessage]);
                setIsTyping(false);
            });
        });
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Linkleri tıklanabilir yapmak için fonksiyon
    const renderMessageWithLinks = (text: string) => {
        // Markdown linklerini işle [text](url)
        const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        // HTTP/HTTPS linklerini işle
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        // Önce markdown linklerini işle
        let processedText = text.replace(markdownLinkRegex, (match, linkText, url) => {
            return `__MARKDOWN_LINK__${linkText}__URL__${url}__END__`;
        });
        
        // Sonra HTTP linklerini işle
        processedText = processedText.replace(urlRegex, (match) => {
            return `__HTTP_LINK__${match}__END__`;
        });
        
        const parts = processedText.split(/(__MARKDOWN_LINK__|__HTTP_LINK__|__URL__|__END__)/);
        
        return parts.map((part, index) => {
            if (part === '__MARKDOWN_LINK__') {
                const linkText = parts[index + 1];
                const url = parts[index + 3];
                return (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                    >
                        {linkText}
                    </a>
                );
            } else if (part === '__HTTP_LINK__') {
                const url = parts[index + 1];
                return (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                    >
                        {url}
                    </a>
                );
            } else if (part === '__URL__' || part === '__END__') {
                return null;
            }
            return part;
        }).filter(Boolean);
    };

    return (
        <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-white/10 p-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <Link href="/" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Ana Sayfa</span>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                                src="/avatar.jpeg" 
                                alt="Uzeyir İsmail Bahtiyar" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-white font-medium">Uzeyir İsmail Bahtiyar</h1>
                            <p className="text-xs text-white/60">Çevrimiçi</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <a 
                            href="https://github.com/uzeyirrr" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Github className="w-5 h-5 text-white/60" />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/%C3%BCzeyirismail/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Linkedin className="w-5 h-5 text-white/60" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full min-h-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                                <img 
                                    src="/avatar.jpeg" 
                                    alt="Uzeyir İsmail Bahtiyar" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-medium text-white mb-2">Uzeyir İsmail Bahtiyar</h2>
                            <p className="text-white/60 mb-6">Full Stack Developer & UI/UX Designer</p>
                            <p className="text-white/40 mb-8">Merhaba! Benimle sohbet etmek için aşağıdaki sorulardan birini seçebilir veya kendi sorunu yazabilirsin.</p>
                            
                            {/* Quick Questions Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                {quickQuestions.map((question, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleQuickAction(question.action)}
                                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            {question.icon}
                                        </div>
                                        <span className="text-sm text-white/90">{question.text}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Contact Actions */}
                            <div className="mt-8">
                                <h3 className="text-white font-medium mb-4">İletişim</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <a 
                                        href="mailto:uzeyirismailbahtiyar@gmail.com"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm text-white/90">Email</span>
                                    </a>
                                    <a 
                                        href="tel:+905332849076"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm text-white/90">Telefon</span>
                                    </a>
                                    <a 
                                        href="/cv.pdf" 
                                        download="Uzeyir_Ismail_Bahtiyar_CV.pdf"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="text-sm text-white/90">CV İndir</span>
                                    </a>
                                    <a 
                                        href="https://github.com/uzeyirrr" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span className="text-sm text-white/90">GitHub</span>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/%C3%BCzeyirismail/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span className="text-sm text-white/90">LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} gap-3`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {!message.isUser && (
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                    <img 
                                        src="/avatar.jpeg" 
                                        alt="Uzeyir İsmail Bahtiyar" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className={`max-w-[80%] p-4 rounded-lg ${
                                message.isUser 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/10 text-white'
                            }`}>
                                <p className="text-sm whitespace-pre-wrap">
                                    {message.isUser ? message.text : renderMessageWithLinks(message.text)}
                                </p>
                                <p className="text-xs opacity-60 mt-2">
                                    {message.timestamp.toLocaleTimeString('tr-TR', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    
                    {isTyping && (
                        <motion.div
                            className="flex justify-start gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <img 
                                    src="/avatar.jpeg" 
                                    alt="Uzeyir İsmail Bahtiyar" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-white/10 text-white p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Uzeyir yazıyor</span>
                                    <TypingDots />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Mesajınızı yazın..."
                            containerClassName="flex-1"
                            className={cn(
                                "w-full px-3 py-2",
                                "resize-none",
                                "bg-white/5",
                                "border border-white/20",
                                "text-white/90 text-sm",
                                "focus:outline-none",
                                "placeholder:text-white/40",
                                "min-h-[60px]"
                            )}
                            showRing={false}
                        />
                        <motion.button
                            type="button"
                            onClick={handleSendMessage}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isTyping || !value.trim()}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                "flex items-center gap-2",
                                value.trim()
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-white/40"
                            )}
                        >
                            {isTyping ? (
                                <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                            ) : (
                                <SendIcon className="w-4 h-4" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
