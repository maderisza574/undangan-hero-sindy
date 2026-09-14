import { Heart } from 'lucide-react';
import groom3dImg from '../assets/3d_groom.jpg';
import bride3dImg from '../assets/3d_bride.jpg';
import couple3dImg from '../assets/3d_couple.jpg';

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

      {/* Bride Card: Mempelai Wanita (Foto Kiri, Nama Kanan) */}
      <div className="glass-card mb-6 p-4 text-left">
        <div className="flex items-center gap-4">
          {/* Foto Mempelai Wanita (Kiri) */}
          <div className="arch-frame w-32 sm:w-36 h-44 sm:h-48 shrink-0 relative overflow-hidden rounded-t-full shadow-lg">
            <img
              src={bride3dImg}
              alt="Sindy Ayunda Putri 3D Pixar Avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-0 right-0 text-center">
              <span className="font-cursive text-2xl sm:text-3xl text-[#f7e7ce] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Sindy
              </span>
            </div>
          </div>

          {/* Nama & Detail Mempelai Wanita (Kanan) */}
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f7e7ce] mb-1 leading-snug">
              Sindy Ayunda Putri
            </h3>

            <div className="text-xs text-[#d4c3b5] space-y-1 mt-2">
              <p className="text-[#d4a373] text-[11px] uppercase tracking-wider font-semibold">
                Putri Kedua dari
              </p>
              <p className="font-semibold text-xs sm:text-sm text-[#fdfbf7] leading-relaxed">
                Bpk. Saiful Bintoro &amp; Ibu Jumeni
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Divider */}
      <div className="my-6 flex items-center justify-center gap-4 text-[#d4a373]">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4a373]"></div>
        <Heart className="w-6 h-6 fill-[#d4a373] animate-pulse" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4a373]"></div>
      </div>

      {/* Groom Card: Mempelai Pria (Foto Kanan, Nama Kiri) */}
      <div className="glass-card mb-6 p-4 text-right">
        <div className="flex items-center gap-4 flex-row-reverse">
          {/* Foto Mempelai Pria (Kanan) */}
          <div className="arch-frame w-32 sm:w-36 h-44 sm:h-48 shrink-0 relative overflow-hidden rounded-t-full shadow-lg">
            <img
              src={groom3dImg}
              alt="Hero Saksono 3D Pixar Avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-0 right-0 text-center">
              <span className="font-cursive text-2xl sm:text-3xl text-[#f7e7ce] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Hero
              </span>
            </div>
          </div>

          {/* Nama & Detail Mempelai Pria (Kiri) */}
          <div className="flex-1 min-w-0 pl-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f7e7ce] mb-1 leading-snug">
              Hero Saksono
            </h3>

            <div className="text-xs text-[#d4c3b5] space-y-1 mt-2">
              <p className="text-[#d4a373] text-[11px] uppercase tracking-wider font-semibold">
                Putra Ketiga dari
              </p>
              <p className="font-semibold text-xs sm:text-sm text-[#fdfbf7] leading-relaxed">
                Bpk. Suprayitno (Alm) &amp; Ibu Heni Ekowati (Alm)
              </p>
            </div>
          </div>
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
