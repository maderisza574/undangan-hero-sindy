import { Heart } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative px-5 pt-12 pb-8 text-center flex flex-col items-center justify-center">
      {/* Top Minimalist Logo Icon */}
      <div className="w-12 h-12 rounded-full border border-[rgba(212,163,115,0.4)] bg-[rgba(40,30,25,0.7)] flex items-center justify-center mb-4 shadow-lg">
        <Heart className="w-5 h-5 text-[#d4a373] fill-[#d4a373]" />
      </div>

      {/* Main Title */}
      <p className="text-xs font-sans tracking-[0.3em] text-[#d4c3b5] uppercase font-semibold mb-2">
        THE WEDDING OF
      </p>

      <h1 className="text-5xl font-cursive text-gold mb-2 leading-tight">
        Hero &amp; Sindy
      </h1>

      <div 
        className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto"
        style={{ marginTop: '16px', marginBottom: '28px' }}
      ></div>

      {/* Arabic Quran Quote Card (Coklat/Cream theme) */}
      <div 
        className="glass-card mb-8 text-center text-xs leading-relaxed max-w-md w-full p-6 sm:p-7 shadow-xl"
        style={{ marginTop: '24px' }}
      >
        {/* Arabic Verse */}
        <p className="font-serif text-lg text-[#fdfbf7] mb-3 leading-loose tracking-wide">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>

        {/* Translation */}
        <p className="text-[11px] text-[#d4c3b5] leading-relaxed italic mb-3">
          "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
        </p>

        <p className="text-xs font-semibold text-[#d4a373] tracking-widest uppercase">
          (Ar Rum : 21)
        </p>
      </div>
    </section>
  );
};
