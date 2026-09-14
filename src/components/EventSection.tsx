import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Bell, Sparkles } from 'lucide-react';

export const EventSection: React.FC = () => {
  const targetDate = new Date('2026-09-27T09:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const mapsUrl = `https://goo.gl/maps/RgHYXsERLsZkjH3PA?g_st=aw`;
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Hero+%26+Sindy&dates=20260927T020000Z/20260927T100000Z&details=Pernikahan+Hero+Saksono+%26+Sindy+Ayunda+Putri.+Akad+dan+Adat+serta+Resepsi.&location=Kediaman+Mempelai+Wanita,+Jl.+Grumbul+Bakung+Kulon+No.51+Banyumas`;

  return (
    <section id="acara" className="px-5 py-10 text-center scroll-mt-6 flex flex-col items-center justify-center">
      {/* Section Title */}
      <div className="mb-10 sm:mb-12 w-full flex flex-col items-center justify-center">
        <p className="text-xs font-serif text-[#d4c3b5] tracking-widest uppercase mb-2 text-center">
          Rangkaian Acara
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gold text-center leading-snug mb-3">
          Sabtu &amp; Minggu, <br />
          26 – 27 September 2026
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto my-2"></div>
      </div>

      {/* Countdown Timer Card */}
      <div className="glass-card mt-8 mb-16 sm:mt-10 sm:mb-20 w-full flex flex-col items-center justify-center text-center p-7 sm:p-9 shadow-2xl">
        <p className="text-xs font-semibold text-[#d4a373] tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
          <Bell className="w-4 h-4" />
          <span>Menghitung Hari Bahagia</span>
        </p>

        <div className="grid grid-cols-4 gap-3 my-4 sm:my-6 w-full max-w-sm">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[rgba(28,21,18,0.75)] border border-[rgba(212,163,115,0.35)] shadow-inner text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs text-[#d4c3b5] uppercase tracking-wider font-semibold">Hari</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[rgba(28,21,18,0.75)] border border-[rgba(212,163,115,0.35)] shadow-inner text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-xs text-[#d4c3b5] uppercase tracking-wider font-semibold">Jam</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[rgba(28,21,18,0.75)] border border-[rgba(212,163,115,0.35)] shadow-inner text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-xs text-[#d4c3b5] uppercase tracking-wider font-semibold">Menit</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[rgba(28,21,18,0.75)] border border-[rgba(212,163,115,0.35)] shadow-inner text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-xs text-[#d4c3b5] uppercase tracking-wider font-semibold">Detik</span>
          </div>
        </div>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold mt-6 sm:mt-7 text-xs sm:text-sm w-full max-w-sm flex items-center justify-center gap-2 py-3.5 shadow-md"
        >
          <CalendarPlus className="w-4 h-4 text-[#d4a373]" />
          <span>Simpan ke Google Calendar</span>
        </a>
      </div>

      {/* Schedule Cards Container */}
      <div className="space-y-6 w-full">
        {/* Tasyakuran Card */}
        <div className="glass-card w-full text-center flex flex-col items-center justify-center p-6">
          <div className="flex items-center justify-center gap-2 text-[#d4a373] font-serif font-bold text-xl mb-3 border-b border-[rgba(212,163,115,0.2)] pb-3 w-full">
            <Sparkles className="w-5 h-5 text-[#d4a373]" />
            <span>Tasyakuran</span>
          </div>

          <div className="space-y-3 text-xs text-[#fdfbf7] w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-4 h-4 text-[#d4a373] mb-1.5" />
              <p className="font-semibold text-base font-serif text-[#f7e7ce] tracking-wide mb-1">
                Tasyakuran 26-27 September 2026
              </p>
              <p className="text-[#d4c3b5] text-xs">Sabtu &amp; Minggu, 26 – 27 September 2026</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-2">
              <MapPin className="w-4 h-4 text-[#d4a373] mb-1" />
              <p className="font-semibold text-sm text-[#f7e7ce]">Kediaman Mempelai Wanita</p>
              <p className="text-[#d4c3b5] leading-relaxed max-w-xs text-xs mt-0.5">
                Jl. Grumbul Bakung Kulon, No.51 RT.5/RW.1, Larangan, Kembaran, Banyumas, Jawa Tengah, 53182
              </p>
            </div>
          </div>
        </div>

        {/* Akad dan Adat Card */}
        <div className="glass-card w-full text-center flex flex-col items-center justify-center p-6">
          <div className="flex items-center justify-center gap-2 text-[#d4a373] font-serif font-bold text-xl mb-3 border-b border-[rgba(212,163,115,0.2)] pb-3 w-full">
            <Calendar className="w-5 h-5 text-[#d4a373]" />
            <span>Akad dan Adat</span>
          </div>

          <div className="space-y-3 text-xs text-[#fdfbf7] w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-4 h-4 text-[#d4a373] mb-1.5" />
              <p className="font-semibold text-base text-[#f7e7ce]">Minggu, 27 September 2026</p>
              <p className="text-[#d4a373] font-bold text-sm mt-0.5">09.00 WIB – selesai</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-2">
              <MapPin className="w-4 h-4 text-[#d4a373] mb-1" />
              <p className="font-semibold text-sm text-[#f7e7ce]">Kediaman Mempelai Wanita</p>
              <p className="text-[#d4c3b5] leading-relaxed max-w-xs text-xs mt-0.5">
                Jl. Grumbul Bakung Kulon, No.51 RT.5/RW.1, Larangan, Kembaran, Banyumas, Jawa Tengah, 53182
              </p>
            </div>
          </div>
        </div>

        {/* Resepsi Card */}
        <div className="glass-card w-full text-center flex flex-col items-center justify-center p-6">
          <div className="flex items-center justify-center gap-2 text-[#d4a373] font-serif font-bold text-xl mb-3 border-b border-[rgba(212,163,115,0.2)] pb-3 w-full">
            <Calendar className="w-5 h-5 text-[#d4a373]" />
            <span>Resepsi</span>
          </div>

          <div className="space-y-3 text-xs text-[#fdfbf7] w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-4 h-4 text-[#d4a373] mb-1.5" />
              <p className="font-semibold text-base text-[#f7e7ce]">Minggu, 27 September 2026</p>
              <p className="text-[#d4a373] font-bold text-sm mt-0.5">12.30 WIB – selesai</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-2">
              <MapPin className="w-4 h-4 text-[#d4a373] mb-1" />
              <p className="font-semibold text-sm text-[#f7e7ce]">Kediaman Mempelai Wanita</p>
              <p className="text-[#d4c3b5] leading-relaxed max-w-xs text-xs mt-0.5">
                Jl. Grumbul Bakung Kulon, No.51 RT.5/RW.1, Larangan, Kembaran, Banyumas, Jawa Tengah, 53182
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map View & Button */}
      <div className="glass-card mt-8 w-full flex flex-col items-center justify-center p-5 text-center">
        <div className="flex items-center justify-center gap-2 text-[#d4a373] font-serif font-bold text-lg mb-3">
          <MapPin className="w-5 h-5 text-[#d4a373]" />
          <span>Peta Lokasi Acara</span>
        </div>

        {/* Embedded Map Frame */}
        <div className="w-full h-56 rounded-2xl overflow-hidden border border-[rgba(212,163,115,0.35)] shadow-inner mb-4 relative bg-[#1c1512]">
          <iframe
            title="Google Maps Location"
            src="https://maps.google.com/maps?q=-7.395932,109.2947474&z=16&output=embed"
            className="w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p className="text-xs text-[#d4c3b5] mb-4 leading-relaxed">
          Klik tombol di bawah ini untuk melihat navigasi peta secara langsung di aplikasi Google Maps.
        </p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold w-full max-w-sm flex items-center justify-center gap-2 py-3.5 shadow-lg"
        >
          <MapPin className="w-5 h-5" />
          <span>Lihat Maps / Petunjuk Arah</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </section>
  );
};

