import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Bell } from 'lucide-react';

export const EventSection: React.FC = () => {
  const targetDate = new Date('2026-09-27T08:00:00+07:00').getTime();

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

  const mapsUrl = `https://www.google.com/maps/place/7%C2%B023'45.4%22S+109%C2%B017'41.1%22E/@-7.395932,109.2921725,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-7.395932!4d109.2947474?hl=en&entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D`;
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Hero+%26+Sindy&dates=20260927T010000Z/20260927T090000Z&details=Pernikahan+Hero+Saksono+%26+Sindy+Ayunda+Putri.+Akad+dan+Resepsi.&location=Kediaman+Mempelai+Wanita,+Jl.+Grumbul+Bakung+Kulon+No.51+Banyumas`;

  return (
    <section id="acara" className="px-5 py-8 text-center scroll-mt-6 flex flex-col items-center justify-center">
      {/* Section Title */}
      <div className="mb-8 w-full flex flex-col items-center justify-center">
        <p className="text-xs font-serif text-[#d4c3b5] tracking-widest uppercase mb-1 text-center">
          Rangkaian Acara
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold text-center">
          Waktu &amp; Tempat
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto my-3"></div>
        
        {/* Prominent Large Date Highlight */}
        <div className="w-full max-w-sm px-5 py-3 rounded-2xl bg-gradient-to-r from-[rgba(212,163,115,0.25)] via-[rgba(212,163,115,0.15)] to-[rgba(212,163,115,0.25)] border border-[#d4a373] text-center shadow-lg my-2">
          <p className="text-base sm:text-lg font-bold font-serif text-[#f7e7ce] tracking-wide text-gold">
            Sabtu &amp; Minggu, 26 – 27 September 2026
          </p>
        </div>
      </div>

      {/* Countdown Timer Card */}
      <div className="glass-card mb-8 w-full flex flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold text-[#d4a373] tracking-widest uppercase mb-4 flex items-center justify-center gap-1.5">
          <Bell className="w-3.5 h-3.5" />
          <span>Menghitung Hari Bahagia</span>
        </p>

        <div className="grid grid-cols-4 gap-2 my-2 w-full max-w-sm">
          <div className="p-3 rounded-xl bg-[rgba(28,21,18,0.7)] border border-[rgba(212,163,115,0.3)] shadow-inner text-center">
            <span className="block text-2xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.days}
            </span>
            <span className="text-[10px] text-[#d4c3b5] uppercase tracking-wider">Hari</span>
          </div>
          <div className="p-3 rounded-xl bg-[rgba(28,21,18,0.7)] border border-[rgba(212,163,115,0.3)] shadow-inner text-center">
            <span className="block text-2xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] text-[#d4c3b5] uppercase tracking-wider">Jam</span>
          </div>
          <div className="p-3 rounded-xl bg-[rgba(28,21,18,0.7)] border border-[rgba(212,163,115,0.3)] shadow-inner text-center">
            <span className="block text-2xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] text-[#d4c3b5] uppercase tracking-wider">Menit</span>
          </div>
          <div className="p-3 rounded-xl bg-[rgba(28,21,18,0.7)] border border-[rgba(212,163,115,0.3)] shadow-inner text-center">
            <span className="block text-2xl font-bold font-serif text-[#f7e7ce]">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] text-[#d4c3b5] uppercase tracking-wider">Detik</span>
          </div>
        </div>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold mt-5 text-xs w-full max-w-sm flex items-center justify-center gap-2"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Simpan ke Google Calendar</span>
        </a>
      </div>

      {/* Akad Nikah Card */}
      <div className="glass-card mb-6 w-full text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 text-[#d4a373] font-serif font-bold text-xl mb-3 border-b border-[rgba(212,163,115,0.2)] pb-2 w-full">
          <Calendar className="w-5 h-5 text-[#d4a373]" />
          <span>Akad Nikah</span>
        </div>

        <div className="space-y-3 text-xs text-[#fdfbf7] w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Clock className="w-4 h-4 text-[#d4a373] mb-1" />
            <p className="font-semibold text-sm text-[#f7e7ce]">Minggu, 27 September 2026</p>
            <p className="text-[#d4c3b5]">08.00 WIB — Selesai</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-2">
            <MapPin className="w-4 h-4 text-[#d4a373] mb-1" />
            <p className="font-semibold text-sm text-[#f7e7ce]">Kediaman Mempelai Wanita</p>
            <p className="text-[#d4c3b5] leading-relaxed max-w-xs">
              Jl. Grumbul Bakung Kulon, No.51 RT.5/RW.1, Larangan, Kembaran, Banyumas, Jawa Tengah, 53182
            </p>
          </div>
        </div>
      </div>

      {/* Resepsi Card */}
      <div className="glass-card mb-6 w-full text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 text-[#d4a373] font-serif font-bold text-xl mb-3 border-b border-[rgba(212,163,115,0.2)] pb-2 w-full">
          <Calendar className="w-5 h-5 text-[#d4a373]" />
          <span>Resepsi Pernikahan</span>
        </div>

        <div className="space-y-3 text-xs text-[#fdfbf7] w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Clock className="w-4 h-4 text-[#d4a373] mb-1" />
            <p className="font-semibold text-sm text-[#f7e7ce]">Minggu, 27 September 2026</p>
            <p className="text-[#d4c3b5]">11.00 WIB — Selesai</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-2">
            <MapPin className="w-4 h-4 text-[#d4a373] mb-1" />
            <p className="font-semibold text-sm text-[#f7e7ce]">Kediaman Mempelai Wanita</p>
            <p className="text-[#d4c3b5] leading-relaxed max-w-xs">
              Jl. Grumbul Bakung Kulon, No.51 RT.5/RW.1, Larangan, Kembaran, Banyumas, Jawa Tengah, 53182
            </p>
          </div>
        </div>
      </div>

      {/* Location Map Button */}
      <div className="mt-2 w-full flex items-center justify-center">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold max-w-sm flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          <span>Petunjuk Penunjuk Arah (Google Maps)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
