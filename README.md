# Üzeyir İsmail Bahtiyar - Portföy Sitesi

Modern ve interaktif portföy sitesi. AI destekli chat sistemi ile ziyaretçilerle etkileşim kurun.

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