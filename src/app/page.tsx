'use client';

import { Demo } from "@/components/demo"
import { LimelightNav } from "@/components/limelight-nav"
import { 
  Home as HomeIcon, 
  User, 
  Briefcase, 
  Mail, 
  Github,
  Linkedin,
  FileText
} from "lucide-react"

export default function Home() {
  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Ana Sayfa' },
    { id: 'about', icon: <User />, label: 'Hakkımda' },
    { id: 'projects', icon: <Briefcase />, label: 'Projeler' },
    { id: 'skills', icon: <FileText />, label: 'Yetenekler' },
    { id: 'contact', icon: <Mail />, label: 'İletişim' },
    { id: 'github', icon: <Github />, label: 'GitHub', onClick: () => window.open('https://github.com/uzeyirrr', '_blank') },
    { id: 'linkedin', icon: <Linkedin />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/%C3%BCzeyirismail/', '_blank') },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Demo />
      </div>
      
      {/* Navigation at the bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <LimelightNav 
          items={navItems}
          className="bg-black/80 backdrop-blur-xl border-white/20"
        />
      </div>
    </div>
  )
}
