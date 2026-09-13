import { Sparkles } from 'lucide-react';
import couple3dImg from '../assets/3d_couple.jpg';

export const HeroSection = () => {
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

      {/* 3D Character Luxury Frame */}
      <div className="relative my-4 w-56 h-72 mx-auto rounded-3xl p-2 border-2 border-[rgba(223,179,85,0.5)] shadow-2xl bg-[rgba(22,38,30,0.8)] backdrop-blur-md overflow-hidden animate-float">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a130f] via-transparent to-transparent z-10 opacity-60"></div>
        <img
          src={couple3dImg}
          alt="Hero & Sindy 3D Avatar"
          className="w-full h-full object-cover rounded-2xl border border-[rgba(223,179,85,0.3)] shadow-inner"
        />
        <div className="absolute bottom-3 left-0 right-0 z-20 text-center">
          <span className="font-serif text-[#f9eaaf] text-sm font-bold tracking-widest drop-shadow-md">
            HERO &amp; SINDY
          </span>
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
