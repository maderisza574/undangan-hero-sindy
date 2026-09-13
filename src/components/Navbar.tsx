import React from 'react';
import { Heart, Calendar, Image as ImageIcon, MessageSquare, Gift, ShieldAlert, Music, Music2 } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const navItems = [
    { id: 'mempelai', label: 'Mempelai', icon: Heart },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon },
    { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
    { id: 'gift', label: 'Hadiah', icon: Gift },
  ];

  return (
    <>
      {/* Music Floating Toggle Button */}
      <button
        onClick={onToggleMusic}
        className={`fixed top-4 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center border shadow-xl transition-all ${
          isPlayingMusic 
            ? 'bg-[#d4a373] text-[#1c1512] border-[#f7e7ce] animate-spin-slow' 
            : 'bg-[rgba(40,30,25,0.85)] text-[#d4a373] border-[rgba(212,163,115,0.4)]'
        }`}
        title={isPlayingMusic ? 'Pause Musik' : 'Play Musik'}
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {isPlayingMusic ? <Music className="w-5 h-5" /> : <Music2 className="w-5 h-5 opacity-60" />}
      </button>

      {/* Admin Button on Header */}
      <a
        href="/admin"
        className="fixed top-4 left-4 z-40 px-3 py-1.5 rounded-full text-xs font-semibold bg-[rgba(40,30,25,0.85)] text-[#d4a373] border border-[rgba(212,163,115,0.4)] flex items-center gap-1.5 shadow-lg backdrop-blur-md hover:bg-[#d4a373] hover:text-[#1c1512] transition-colors"
      >
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>Admin Link</span>
      </a>

      {/* Bottom Sticky Mobile Navbar */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[440px] bg-[rgba(28,21,18,0.95)] border border-[rgba(212,163,115,0.35)] backdrop-blur-xl rounded-full px-3 py-2 shadow-2xl">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-all ${
                  isActive
                    ? 'text-[#d4a373] scale-105 font-semibold'
                    : 'text-[#d4c3b5] opacity-70 hover:opacity-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4a373]' : ''}`} />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
