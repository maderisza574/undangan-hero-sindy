import { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import couple3dImg from '../assets/3d_couple.jpg';

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Luxury 3D No-Photo Artworks & Moments
  const items = [
    {
      id: 1,
      title: 'Hero & Sindy 3D Avatar',
      subtitle: 'Ilustrasi Momen Bahagia',
      url: couple3dImg
    },
    {
      id: 2,
      title: '3D Gold Wedding Rings',
      subtitle: 'Simbol Cincin Suci',
      url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: '3D Emerald Luxury Decor',
      subtitle: 'Nuansa Bunga & Emas',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: '3D Wedding Cake',
      subtitle: 'Kue Manis Kebersamaan',
      url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="galeri" className="px-5 py-8 text-center scroll-mt-6">
      {/* Title */}
      <div className="mb-6">
        <p className="text-xs font-serif text-[#b8c4bc] tracking-widest uppercase mb-1 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#dfb355]" />
          <span>Tema Eksklusif Tanpa Foto</span>
          <Sparkles className="w-3.5 h-3.5 text-[#dfb355]" />
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold">
          Galeri 3D &amp; Seni Pernikahan
        </h2>
        <div className="gold-divider"></div>
        <p className="text-xs text-[#b8c4bc] max-w-xs mx-auto">
          Eksklusif Digital Web Invitation dengan visual seni 3D luxury &amp; ornamen emas elegan.
        </p>
      </div>

      {/* 3D Art Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.url)}
            className="group relative h-48 rounded-2xl overflow-hidden border border-[rgba(223,179,85,0.35)] shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] bg-[rgba(22,38,30,0.8)]"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,15,0.9)] via-[rgba(10,19,15,0.3)] to-transparent opacity-90 transition-opacity flex flex-col justify-end p-3 text-left">
              <span className="text-[11px] font-serif text-[#f9eaaf] font-bold flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#dfb355] fill-[#dfb355]" />
                {item.title}
              </span>
              <span className="text-[9px] text-[#b8c4bc] tracking-wider">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-[rgba(4,8,6,0.95)] backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-lg w-full text-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-[#dfb355] p-2 hover:opacity-80"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded Preview"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl border-2 border-[#dfb355] shadow-2xl mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};
