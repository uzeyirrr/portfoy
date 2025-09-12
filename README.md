# Üzeyir İsmail Bahtiyar - Portföy Sitesi

Modern ve interaktif portföy sitesi. AI destekli chat sistemi ile ziyaretçilerle etkileşim kurun.

---

## 🇹🇷 Türkçe | [🇺🇸 English](#english)

---

## 🚀 Özellikler

## 🚀 Özellikler

- **AI Chat Sistemi**: OpenAI GPT-3.5-turbo ile entegre chat
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Modern UI**: Shadcn UI ve Tailwind CSS
- **Animasyonlar**: Framer Motion ile smooth animasyonlar
- **Dark Mode**: Koyu tema desteği
- **Tıklanabilir Linkler**: CV, LinkedIn, GitHub linkleri
- **Hazır Sorular**: Hızlı etkileşim için önceden tanımlı sorular

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 📦 Kurulum

1. **Repository'yi klonlayın**:
```bash
git clone https://github.com/uzeyirrr/portfoy.git
cd portfoy
```

2. **Bağımlılıkları yükleyin**:
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**:
`.env.local` dosyası oluşturun:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Geliştirme sunucusunu başlatın**:
```bash
npm run dev
```

5. **Tarayıcıda açın**: [http://localhost:3000](http://localhost:3000)

## 🎯 Kullanım

### Ana Sayfa
- AI chat arayüzü ile etkileşim
- Hazır sorular ile hızlı başlangıç
- Responsive navigation

### Chat Sayfası
- Tam ekran chat deneyimi
- Mesaj geçmişi
- Tıklanabilir linkler (CV, LinkedIn, GitHub)
- Otomatik scroll
- Typing indicator

### Hazır Sorular
- `/about` - Hakkımda bilgi
- `/skills` - Teknik yetenekler
- `/projects` - Projeler
- `/contact` - İletişim bilgileri

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/chat/          # OpenAI API endpoint
│   ├── chat/              # Chat sayfası
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/
│   ├── ui/
│   │   ├── animated-ai-chat.tsx  # Ana chat komponenti
│   │   ├── button.tsx            # Button komponenti
│   │   └── card.tsx              # Card komponenti
│   ├── demo.tsx                  # Demo wrapper
│   └── limelight-nav.tsx         # Navigation komponenti
public/
├── avatar.jpeg            # Profil fotoğrafı
└── cv.pdf                 # CV dosyası
```

## 🔧 API Yapılandırması

Chat API'si `/api/chat` endpoint'inde çalışır:
- **Model**: GPT-3.5-turbo
- **System Prompt**: Üzeyir'in kişisel bilgileri
- **Response**: JSON formatında mesaj

## 🎨 Özelleştirme

### Sistem Prompt'u Güncelleme
`src/app/api/chat/route.ts` dosyasındaki `systemPrompt` değişkenini düzenleyin.

### Stil Değişiklikleri
- `src/app/globals.css` - Global stiller
- Tailwind CSS sınıfları - Komponent stilleri

### Yeni Hazır Sorular
`src/components/ui/animated-ai-chat.tsx` dosyasındaki `commandSuggestions` array'ini güncelleyin.

## 📱 Responsive Tasarım

- **Desktop**: Sidebar navigation
- **Mobile**: Top navigation
- **Chat**: Tek sütun layout (ChatGPT benzeri)
- **Breakpoints**: Tailwind CSS responsive utilities

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub repository'yi Vercel'e bağlayın
2. Environment variables ekleyin:
   - `OPENAI_API_KEY`
3. Deploy edin

### Diğer Platformlar
- Netlify
- Railway
- Heroku

## 📞 İletişim

- **Email**: uzeyirismailbahtiyar@gmail.com
- **LinkedIn**: [Üzeyir İsmail Bahtiyar](https://www.linkedin.com/in/%C3%BCzeyirismail/)
- **GitHub**: [uzeyirrr](https://github.com/uzeyirrr)
- **Phone**: +90 533 284 90 76

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Üzeyir İsmail Bahtiyar** - Full Stack Developer & UI/UX Designer

---

## 🇺🇸 English

# Üzeyir İsmail Bahtiyar - Portfolio Website

Modern and interactive portfolio website. Interact with visitors through AI-powered chat system.

## 🚀 Features

- **AI Chat System**: Integrated chat with OpenAI GPT-3.5-turbo
- **Responsive Design**: Mobile and desktop compatible
- **Modern UI**: Shadcn UI and Tailwind CSS
- **Animations**: Smooth animations with Framer Motion
- **Dark Mode**: Dark theme support
- **Clickable Links**: CV, LinkedIn, GitHub links
- **Quick Questions**: Pre-defined questions for quick interaction
- **Wave Background**: Animated wave background with gradient overlay

## 🛠️ Technologies

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Background**: Simplex Noise for wave animations
- **Deployment**: Vercel Ready

## 📦 Installation

1. **Clone the repository**:
```bash
git clone https://github.com/uzeyirrr/portfoy.git
cd portfoy
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start development server**:
```bash
npm run dev
```

5. **Open in browser**: [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Home Page
- AI chat interface for interaction
- Quick start with predefined questions
- Responsive navigation

### Chat Page
- Full-screen chat experience
- Message history
- Clickable links (CV, LinkedIn, GitHub)
- Auto scroll
- Typing indicator
- Wave background animation

### Quick Questions
- About me information
- Technical skills
- Projects showcase
- Contact information

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/          # OpenAI API endpoint
│   ├── chat/              # Chat page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/
│   │   ├── animated-ai-chat.tsx  # Main chat component
│   │   ├── wave-background.tsx   # Wave animation component
│   │   ├── button.tsx            # Button component
│   │   └── card.tsx              # Card component
│   ├── demo.tsx                  # Demo wrapper
│   └── limelight-nav.tsx         # Navigation component
public/
├── avatar.jpeg            # Profile photo
└── cv.pdf                 # CV file
```

## 🔧 API Configuration

Chat API runs on `/api/chat` endpoint:
- **Model**: GPT-3.5-turbo
- **System Prompt**: Üzeyir's personal information
- **Response**: JSON format message

## 🎨 Customization

### Update System Prompt
Edit the `systemPrompt` variable in `src/app/api/chat/route.ts`.

### Style Changes
- `src/app/globals.css` - Global styles
- Tailwind CSS classes - Component styles

### New Quick Questions
Update the `commandSuggestions` array in `src/components/ui/animated-ai-chat.tsx`.

## 📱 Responsive Design

- **Desktop**: Sidebar navigation
- **Mobile**: Top navigation
- **Chat**: Single column layout (ChatGPT-like)
- **Breakpoints**: Tailwind CSS responsive utilities

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables:
   - `OPENAI_API_KEY`
3. Deploy

### Other Platforms
- Netlify
- Railway
- Heroku

## 📞 Contact

- **Email**: uzeyirismailbahtiyar@gmail.com
- **LinkedIn**: [Üzeyir İsmail Bahtiyar](https://www.linkedin.com/in/%C3%BCzeyirismail/)
- **GitHub**: [uzeyirrr](https://github.com/uzeyirrr)
- **Phone**: +90 533 284 90 76

## 📄 License

This project is licensed under the MIT License.

---

**Üzeyir İsmail Bahtiyar** - Full Stack Developer & UI/UX Designer
