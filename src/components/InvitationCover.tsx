import React from 'react';
import { Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import cover3dImg from '../assets/cover_3d.jpg';

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
      colors: ['#f7e7ce', '#d4a373', '#ffffff', '#a97142']
    });
    onOpen();
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-between items-center text-center p-6 transition-all duration-1000 ${
      isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
    }`}
    style={{
      minHeight: '100vh',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background 3D Couple Image */}
      <img
        src={cover3dImg}
        alt="Hero & Sindy 3D Couple"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Warm Cocoa Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1512]/90 via-[#1c1512]/40 to-[#1c1512]/95 z-10"></div>

      {/* Top Header Text (Centered) */}
      <div className="pt-6 sm:pt-10 text-center w-full z-20 flex flex-col items-center justify-center">
        <p className="text-xs font-sans tracking-[0.3em] text-[#f7e7ce] uppercase font-semibold mb-2 text-center">
          The Wedding Of
        </p>

        <h1 className="text-5xl sm:text-6xl font-cursive text-gold leading-tight mb-2 drop-shadow-md text-center">
          Hero &amp; Sindy
        </h1>

        <p className="text-xs font-sans tracking-widest text-[#d4c3b5] uppercase font-medium text-center">
          Minggu, 27 September 2026
        </p>
      </div>

      {/* Bottom Content: To Card & Buka Undangan Button (Perfect Center) */}
      <div className="pb-6 sm:pb-8 w-full z-20 text-center flex flex-col items-center justify-center gap-3.5">
        {/* To Card */}
        <div className="w-full max-w-xs mx-auto p-3.5 sm:p-4 rounded-2xl bg-[rgba(40,30,25,0.88)] border border-[rgba(212,163,115,0.35)] shadow-2xl backdrop-blur-md text-center flex flex-col items-center justify-center">
          <p className="text-[11px] text-[#d4c3b5] uppercase tracking-wider mb-0.5 text-center">
            TO:
          </p>
          <p className="text-lg font-bold font-serif text-[#f7e7ce] text-center">
            {guestName || 'Tamu Undangan'}
          </p>
        </div>

        {/* Buka Undangan Button */}
        <div className="w-full max-w-xs mx-auto flex items-center justify-center">
          <button
            onClick={handleOpenClick}
            className="btn-white-pill"
          >
            <Mail className="w-4 h-4 text-[#281e19]" />
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
