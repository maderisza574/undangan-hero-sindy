import { Heart } from 'lucide-react';
import groom3dImg from '../assets/3d_groom.jpg';
import bride3dImg from '../assets/3d_bride.jpg';
import couple3dImg from '../assets/cover_3d.jpg';

export const CoupleSection = () => {
  return (
    <section id="mempelai" className="px-5 py-8 text-center scroll-mt-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="text-xs font-sans text-[#d4c3b5] tracking-widest uppercase mb-1">
          MEMPELAI PENGANTIN
        </p>
        <h2 className="text-4xl font-cursive text-gold">
          Mempelai Wanita &amp; Pria
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto my-3"></div>
      </div>

      {/* Bride Card: Sindy Ayunda Putri (Arch Frame) */}
      <div className="glass-card mb-8 text-center">
        {/* Arch Shaped Photo Frame with Cursive Overlay */}
        <div className="arch-frame w-48 h-64 mx-auto mb-5">
          <img
            src={bride3dImg}
            alt="Sindy Ayunda Putri 3D Avatar (No Hijab)"
            className="w-full h-full object-cover"
          />
          {/* Cursive Signature Overlay */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="font-cursive text-4xl text-[#f7e7ce] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Sindy
            </span>
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-[#f7e7ce] mb-1">
          Sindy Ayunda Putri
        </h3>

        <div className="text-xs text-[#d4c3b5] space-y-1 mt-2">
          <p className="text-[#d4a373] text-[11px] uppercase tracking-wider font-semibold">Putri Kedua dari</p>
          <p className="font-semibold text-sm text-[#fdfbf7]">
            Bpk. Saiful Bintoro &amp; Ibu Jumeni
          </p>
        </div>
      </div>

      {/* Heart Divider */}
      <div className="my-6 flex items-center justify-center gap-4 text-[#d4a373]">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4a373]"></div>
        <Heart className="w-6 h-6 fill-[#d4a373] animate-pulse" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4a373]"></div>
      </div>

      {/* Groom Card: Hero Saksono (Arch Frame) */}
      <div className="glass-card mb-8 text-center">
        {/* Arch Shaped Photo Frame with Cursive Overlay */}
        <div className="arch-frame w-48 h-64 mx-auto mb-5">
          <img
            src={groom3dImg}
            alt="Hero Saksono 3D Avatar"
            className="w-full h-full object-cover"
          />
          {/* Cursive Signature Overlay */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="font-cursive text-4xl text-[#f7e7ce] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Hero
            </span>
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-[#f7e7ce] mb-1">
          Hero Saksono
        </h3>

        <div className="text-xs text-[#d4c3b5] space-y-1 mt-2">
          <p className="text-[#d4a373] text-[11px] uppercase tracking-wider font-semibold">Putra Ketiga dari</p>
          <p className="font-semibold text-sm text-[#fdfbf7]">
            Bpk. Suprayitno (Alm) &amp; Ibu Heni Ekowati (Alm)
          </p>
        </div>
      </div>

      {/* Couple Together Arch Frame */}
      <div className="glass-card mt-8 p-3 text-center">
        <div className="arch-frame w-full h-72 mx-auto">
          <img
            src={couple3dImg}
            alt="Hero & Sindy 3D Couple"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};
