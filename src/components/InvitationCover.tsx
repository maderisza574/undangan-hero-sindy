import React from 'react';
import { MailOpen, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InvitationCoverProps {
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({ guestName, onOpen, isOpen }) => {
  if (isOpen) return null;

  const handleOpenClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dfb355', '#f9eaaf', '#1e3d30', '#ffffff']
    });
    onOpen();
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 transition-all duration-1000 ${
      isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
    }`}
    style={{
      background: 'radial-gradient(circle at center, #0f221a 0%, #07120d 70%, #030805 100%)',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      {/* Background Floral Overlay Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between p-4">
        <div className="w-32 h-32 border-t-2 border-l-2 border-[#dfb355] rounded-tl-3xl"></div>
        <div className="w-32 h-32 border-t-2 border-r-2 border-[#dfb355] rounded-tr-3xl"></div>
      </div>

      {/* Header Badge */}
      <div className="mt-8 text-center animate-float">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(223,179,85,0.1)] border border-[rgba(223,179,85,0.3)] text-xs tracking-widest text-[#dfb355] uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Undangan Pernikahan Digital
        </div>
      </div>

      {/* Main Couple Names */}
      <div className="text-center my-auto px-4 z-10">
        <p className="text-sm font-serif tracking-widest text-[#b8c4bc] uppercase mb-3">
          Walimatul 'Ursy
        </p>

        <h1 className="text-4xl sm:text-5xl font-serif text-gold font-bold mb-2">
          Hero &amp; Sindy
        </h1>

        <p className="text-xs tracking-widest text-[#dfb355] font-title uppercase mb-6">
          Hero Saksono &amp; Sindy Ayunda Putri
        </p>

        <div className="gold-divider"></div>

        <p className="text-sm text-[#f4efe6] font-medium my-4">
          Sabtu &amp; Minggu, 26 - 27 September 2026
        </p>

        {/* Kepada Yth Card */}
        <div className="mt-6 p-5 rounded-2xl bg-[rgba(22,38,30,0.85)] border border-[rgba(223,179,85,0.3)] shadow-2xl backdrop-blur-md">
          <p className="text-xs text-[#b8c4bc] font-sans uppercase tracking-wider mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <div className="text-xl font-bold font-serif text-[#f9eaaf] my-2 px-2 py-1 rounded bg-[rgba(223,179,85,0.08)] inline-block">
            {guestName || 'Tamu Undangan'}
          </div>
          <p className="text-xs text-[#b8c4bc] italic mt-1">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
      </div>

      {/* Open Invitation Button */}
      <div className="mb-10 w-full px-4 text-center z-10">
        <button
          onClick={handleOpenClick}
          className="btn-gold animate-pulse-glow"
        >
          <MailOpen className="w-5 h-5" />
          <span>Buka Undangan</span>
        </button>
      </div>

      <div className="absolute bottom-3 text-center w-full">
        <p className="text-[10px] text-[#b8c4bc] opacity-60">
          Created with ❤️ for Hero &amp; Sindy
        </p>
      </div>
    </div>
  );
};
