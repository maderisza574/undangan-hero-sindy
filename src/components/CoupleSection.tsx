import { Heart, Camera } from 'lucide-react';
import groom3dImg from '../assets/3d_groom.jpg';
import bride3dImg from '../assets/3d_bride.jpg';

export const CoupleSection = () => {
  return (
    <section id="mempelai" className="px-5 py-8 text-center scroll-mt-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="text-xs font-serif text-[#b8c4bc] tracking-widest uppercase mb-1">
          Mempelai Pengantin
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold">
          Mempelai Pria &amp; Wanita
        </h2>
        <div className="gold-divider"></div>
        <p className="text-xs text-[#b8c4bc] max-w-xs mx-auto leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
        </p>
      </div>

      {/* Groom Card: Hero Saksono */}
      <div className="glass-card ornament-frame mb-8">
        <div className="w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#dfb355] to-transparent mb-4 shadow-xl">
          <img
            src={groom3dImg}
            alt="Hero Saksono 3D Avatar"
            className="w-full h-full rounded-full object-cover border-2 border-[#dfb355]"
          />
        </div>

        <h3 className="text-2xl font-serif font-bold text-[#f9eaaf] mb-1">
          Hero Saksono
        </h3>
        <p className="text-xs font-semibold text-[#dfb355] tracking-widest uppercase mb-4">
          — Putra Ke-3 —
        </p>

        <div className="text-xs text-[#f4efe6] space-y-1 mb-4">
          <p className="text-[#b8c4bc]">Putra dari Pasangan:</p>
          <p className="font-semibold text-base text-[#f4efe6]">
            Bapak Suprayitno <span className="text-[10px] text-[#dfb355] italic">(Almarhum)</span>
          </p>
          <p className="text-xs text-[#b8c4bc]">&amp;</p>
          <p className="font-semibold text-base text-[#f4efe6]">
            Ibu Heni Ekowati <span className="text-[10px] text-[#dfb355] italic">(Almarhum)</span>
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(223,179,85,0.1)] text-[#dfb355] border border-[rgba(223,179,85,0.3)] hover:bg-[#dfb355] hover:text-[#07120d] transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>@hero_saksono</span>
        </a>
      </div>

      {/* Love Divider Icon */}
      <div className="my-6 flex items-center justify-center gap-4 text-[#dfb355]">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#dfb355]"></div>
        <Heart className="w-6 h-6 fill-[#dfb355] animate-pulse" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#dfb355]"></div>
      </div>

      {/* Bride Card: Sindy Ayunda Putri */}
      <div className="glass-card ornament-frame">
        <div className="w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#dfb355] to-transparent mb-4 shadow-xl">
          <img
            src={bride3dImg}
            alt="Sindy Ayunda Putri 3D Avatar"
            className="w-full h-full rounded-full object-cover border-2 border-[#dfb355]"
          />
        </div>

        <h3 className="text-2xl font-serif font-bold text-[#f9eaaf] mb-1">
          Sindy Ayunda Putri
        </h3>
        <p className="text-xs font-semibold text-[#dfb355] tracking-widest uppercase mb-4">
          — Putri Ke-2 —
        </p>

        <div className="text-xs text-[#f4efe6] space-y-1 mb-4">
          <p className="text-[#b8c4bc]">Putri dari Pasangan:</p>
          <p className="font-semibold text-base text-[#f4efe6]">
            Bapak Saiful Bintoro
          </p>
          <p className="text-xs text-[#b8c4bc]">&amp;</p>
          <p className="font-semibold text-base text-[#f4efe6]">
            Ibu Jumeni
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(223,179,85,0.1)] text-[#dfb355] border border-[rgba(223,179,85,0.3)] hover:bg-[#dfb355] hover:text-[#07120d] transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>@sindy_ayunda</span>
        </a>
      </div>
    </section>
  );
};
