import { Heart } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative px-5 pt-12 pb-8 text-center flex flex-col items-center justify-center">
      {/* Top Minimalist Logo Icon */}
      <div className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(17,29,46,0.6)] flex items-center justify-center mb-4 shadow-lg">
        <Heart className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8]" />
      </div>

      {/* Main Title */}
      <p className="text-xs font-sans tracking-[0.3em] text-[#94a3b8] uppercase font-semibold mb-2">
        THE WEDDING OF
      </p>

      <h1 className="text-5xl font-cursive text-white mb-2 leading-tight">
        Hero &amp; Sindy
      </h1>

      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent my-4"></div>

      {/* Arabic Quran Quote Card (matching reference video) */}
      <div className="glass-card mt-4 text-center text-xs leading-relaxed max-w-md w-full">
        {/* Arabic Verse */}
        <p className="font-serif text-lg text-[#f8fafc] mb-3 leading-loose tracking-wide">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>

        {/* Translation */}
        <p className="text-[11px] text-[#cbd5e1] leading-relaxed italic mb-3">
          "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
        </p>

        <p className="text-xs font-semibold text-[#38bdf8] tracking-widest uppercase">
          (Ar Rum : 21)
        </p>
      </div>
    </section>
  );
};
