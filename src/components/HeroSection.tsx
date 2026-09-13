import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative px-5 pt-12 pb-8 text-center flex flex-col items-center justify-center">
      {/* Decorative Top Accent */}
      <div className="flex items-center gap-2 mb-4 text-[#dfb355] text-xs font-semibold tracking-widest uppercase">
        <Sparkles className="w-4 h-4" />
        <span>The Wedding Announcement</span>
        <Sparkles className="w-4 h-4" />
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gold mb-1 leading-tight">
        Hero &amp; Sindy
      </h1>
      <p className="text-xs font-title tracking-[0.2em] text-[#dfb355] uppercase mb-6">
        26 - 27 September 2026
      </p>

      {/* Photo Frame / Wedding Graphic */}
      <div className="relative my-4 w-48 h-64 mx-auto rounded-t-full p-2 border-2 border-[rgba(223,179,85,0.4)] shadow-2xl bg-[rgba(22,38,30,0.6)] backdrop-blur-md overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a130f] via-transparent to-transparent z-10"></div>
        {/* Modern Elegant Wedding Silhouette / Artwork */}
        <div className="w-full h-full rounded-t-full bg-gradient-to-b from-[#1b3b2e] to-[#0d1f18] flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(223,179,85,0.15)] border border-[#dfb355] flex items-center justify-center text-[#dfb355] mb-3 animate-float">
            <Heart className="w-8 h-8 fill-[#dfb355]" />
          </div>
          <span className="font-serif text-[#f9eaaf] text-xl font-bold">H &amp; S</span>
          <span className="text-[10px] text-[#b8c4bc] tracking-widest uppercase mt-1">September 2026</span>
        </div>
      </div>

      {/* Quran Quote Card */}
      <div className="glass-card mt-6 text-center text-xs leading-relaxed max-w-sm">
        <p className="font-serif italic text-[#f4efe6] mb-3">
          "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <p className="text-[11px] font-semibold text-[#dfb355] tracking-wide">
          (QS. Ar-Rum: 21)
        </p>
      </div>
    </section>
  );
};
