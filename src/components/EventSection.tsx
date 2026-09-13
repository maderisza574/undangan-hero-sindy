import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Bell } from 'lucide-react';

export const EventSection: React.FC = () => {
  // Target date: Sunday, 27 September 2026 08:00:00 WIB
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

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Hero+%26+Sindy&dates=20260927T010000Z/20260927T090000Z&details=Pernikahan+Hero+Saksono+%26+Sindy+Ayunda+Putri.+Akad+dan+Resepsi.&location=Gedung+Pernikahan+Bahagia`;

  return (
    <section id="acara" className="px-5 py-8 text-center scroll-mt-6">
      {/* Section Title */}
      <div className="mb-8">
        <p className="text-xs font-serif text-[#b8c4bc] tracking-widest uppercase mb-1">
          Rangkaian Acara
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold">
          Waktu &amp; Tempat
        </h2>
        <div className="gold-divider"></div>
        <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(223,179,85,0.12)] border border-[rgba(223,179,85,0.3)] text-xs text-[#f9eaaf] font-semibold">
          Sabtu &amp; Minggu, 26 - 27 September 2026
        </div>
      </div>

      {/* Countdown Timer Card */}
      <div className="glass-card mb-8">
        <p className="text-xs font-semibold text-[#dfb355] tracking-widest uppercase mb-4 flex items-center justify-center gap-1.5">
          <Bell className="w-3.5 h-3.5" />
          <span>Menghitung Hari Bahagia</span>
        </p>

        <div className="grid grid-cols-4 gap-2 my-2">
          <div className="p-3 rounded-xl bg-[rgba(10,19,15,0.7)] border border-[rgba(223,179,85,0.3)] shadow-inner">
            <span className="block text-2xl font-bold font-serif text-[#f9eaaf]">
              {timeLeft.days}
            </span>
            <span className="text-[10px] text-[#b8c4bc] uppercase tracking-wider">Hari</span>
          </div>
          <div className="p-3 rounded-xl bg-[rgba(10,19,15,0.7)] border border-[rgba(223,179,85,0.3)] shadow-inner">
            <span className="block text-2xl font-bold font-serif text-[#f9eaaf]">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] text-[#b8c4bc] uppercase tracking-wider">Jam</span>
          </div>
          <div className="p-3 rounded-xl bg-[rgba(10,19,15,0.7)] border border-[rgba(223,179,85,0.3)] shadow-inner">
            <span className="block text-2xl font-bold font-serif text-[#f9eaaf]">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] text-[#b8c4bc] uppercase tracking-wider">Menit</span>
          </div>
          <div className="p-3 rounded-xl bg-[rgba(10,19,15,0.7)] border border-[rgba(223,179,85,0.3)] shadow-inner">
            <span className="block text-2xl font-bold font-serif text-[#f9eaaf]">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] text-[#b8c4bc] uppercase tracking-wider">Detik</span>
          </div>
        </div>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold mt-5 text-xs w-full"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Simpan ke Google Calendar</span>
        </a>
      </div>

      {/* Akad Nikah Card */}
      <div className="glass-card text-left mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(223,179,85,0.05)] rounded-bl-full pointer-events-none"></div>

        <div className="flex items-center gap-2 text-[#dfb355] font-serif font-bold text-xl mb-3 border-b border-[rgba(223,179,85,0.2)] pb-2">
          <Calendar className="w-5 h-5 text-[#dfb355]" />
          <span>Akad Nikah</span>
        </div>

        <div className="space-y-3 text-xs text-[#f4efe6]">
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#dfb355] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-[#f9eaaf]">Minggu, 27 September 2026</p>
              <p className="text-[#b8c4bc]">08.00 WIB — Selesai</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#dfb355] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-[#f9eaaf]">Kediaman Mempelai Wanita</p>
              <p className="text-[#b8c4bc] leading-relaxed">
                Jl. Mawar Indah No. 27, Sidoarjo, Jawa Timur (Lokasi Acara Akad)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resepsi Card */}
      <div className="glass-card text-left mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(223,179,85,0.05)] rounded-bl-full pointer-events-none"></div>

        <div className="flex items-center gap-2 text-[#dfb355] font-serif font-bold text-xl mb-3 border-b border-[rgba(223,179,85,0.2)] pb-2">
          <Calendar className="w-5 h-5 text-[#dfb355]" />
          <span>Resepsi Pernikahan</span>
        </div>

        <div className="space-y-3 text-xs text-[#f4efe6]">
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#dfb355] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-[#f9eaaf]">Minggu, 27 September 2026</p>
              <p className="text-[#b8c4bc]">11.00 WIB — Selesai</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#dfb355] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-[#f9eaaf]">Gedung Pertemuan Utama</p>
              <p className="text-[#b8c4bc] leading-relaxed">
                Grand Ballroom Hall, Sidoarjo, Jawa Timur
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map Button */}
      <div className="mt-4">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          <MapPin className="w-5 h-5" />
          <span>Petunjuk Penunjuk Arah (Google Maps)</span>
          <ExternalLink className="w-4 h-4 ml-auto" />
        </a>
      </div>
    </section>
  );
};
