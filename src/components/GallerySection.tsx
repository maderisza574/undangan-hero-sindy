import { useState } from 'react';
import { X, Heart } from 'lucide-react';

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    {
      id: 1,
      title: 'Momen Bahagia',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Senyum Ceria',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Janji Suci',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Kebersamaan',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Kisah Cinta',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Menuju Hari H',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="galeri" className="px-5 py-8 text-center scroll-mt-6">
      {/* Title */}
      <div className="mb-6">
        <p className="text-xs font-serif text-[#b8c4bc] tracking-widest uppercase mb-1">
          Galeri Kenangan
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold">
          Momen Indah
        </h2>
        <div className="gold-divider"></div>
        <p className="text-xs text-[#b8c4bc] max-w-xs mx-auto">
          Setiap detik kebersamaan adalah anugerah yang patut disyukuri.
        </p>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedImage(photo.url)}
            className="group relative h-44 rounded-xl overflow-hidden border border-[rgba(223,179,85,0.3)] shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,15,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-xs font-serif text-[#f9eaaf] font-semibold flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#dfb355] fill-[#dfb355]" />
                {photo.title}
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
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-[#dfb355] p-2 hover:opacity-80"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded Preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border-2 border-[#dfb355] shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
