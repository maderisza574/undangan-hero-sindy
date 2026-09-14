import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import type { RsvpMessage } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface RsvpSectionProps {
  defaultGuestName?: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ defaultGuestName = '' }) => {
  const [messages, setMessages] = useState<RsvpMessage[]>([]);
  const [name, setName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [guestCount, setGuestCount] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch messages from Supabase or fallback to localStorage
  useEffect(() => {
    const fetchMessages = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('rsvp_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped: RsvpMessage[] = data.map(item => ({
            id: item.id,
            name: item.name,
            attendance: item.attendance,
            guestCount: item.guest_count,
            message: item.message,
            createdAt: new Date(item.created_at).toISOString().slice(0, 16).replace('T', ' ')
          }));
          setMessages(mapped);
          return;
        }
      }

      // LocalStorage fallback
      const saved = localStorage.getItem('wedding_rsvp_messages');
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        const initial: RsvpMessage[] = [
          {
            id: '1',
            name: 'Bapak Ahmad & Keluarga',
            attendance: 'hadir',
            guestCount: 2,
            message: 'Selamat untuk Hero dan Sindy! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤲',
            createdAt: '2026-09-12 14:20'
          },
          {
            id: '2',
            name: 'Sahabat SMA',
            attendance: 'hadir',
            guestCount: 4,
            message: 'Happy wedding Bro Hero & Sindy! Lancar-lancar sampai hari H yaa 🎉',
            createdAt: '2026-09-13 09:15'
          }
        ];
        setMessages(initial);
        localStorage.setItem('wedding_rsvp_messages', JSON.stringify(initial));
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !messageText.trim()) return;

    setIsSubmitting(true);
    const nowIso = new Date().toISOString();
    const newMsg: RsvpMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guestCount,
      message: messageText.trim(),
      createdAt: nowIso.slice(0, 16).replace('T', ' ')
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('rsvp_messages').insert({
        name: name.trim(),
        attendance,
        guest_count: guestCount,
        message: messageText.trim()
      });
      if (error) {
        console.error('Error inserting to Supabase:', error);
      }
    }

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('wedding_rsvp_messages', JSON.stringify(updated));

    setMessageText('');
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <section id="rsvp" className="px-5 py-8 text-center scroll-mt-6 mb-20">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-serif text-[#b8c4bc] tracking-widest uppercase mb-1">
          Konfirmasi Kehadiran
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold">
          RSVP &amp; Ucapan Doa
        </h2>
        <div className="gold-divider"></div>
        <p className="text-xs text-[#b8c4bc] max-w-xs mx-auto">
          Mohon konfirmasikan kehadiran Anda dan berikan ucapan serta doa terbaik untuk mempelai.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card text-left mb-10 p-6 sm:p-7 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#f7e7ce] mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Bapak Supriadi &amp; Ibu"
              className="w-full px-4 py-3.5 rounded-2xl bg-[rgba(15,10,8,0.85)] border border-[rgba(212,163,115,0.4)] text-sm text-[#fdfbf7] placeholder-[#d4c3b5]/50 focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#f7e7ce] mb-2">
                Status Kehadiran
              </label>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value as any)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[rgba(15,10,8,0.85)] border border-[rgba(212,163,115,0.4)] text-sm text-[#fdfbf7] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] transition-all"
              >
                <option value="hadir">Ya, Saya Hadir</option>
                <option value="ragu">Masih Ragu</option>
                <option value="tidak_hadir">Maaf, Tidak Hadir</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#f7e7ce] mb-2">
                Jumlah Tamu
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-4 py-3.5 rounded-2xl bg-[rgba(15,10,8,0.85)] border border-[rgba(212,163,115,0.4)] text-sm text-[#fdfbf7] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] transition-all"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4+ Orang</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#f7e7ce] mb-2">
              Pesan / Ucapan &amp; Doa Restu
            </label>
            <textarea
              required
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Tuliskan ucapan dan doa terbaik Anda untuk kedua mempelai di sini..."
              className="w-full px-4 py-3.5 rounded-2xl bg-[rgba(15,10,8,0.85)] border border-[rgba(212,163,115,0.4)] text-sm text-[#fdfbf7] placeholder-[#d4c3b5]/50 focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] resize-none transition-all"
            ></textarea>
          </div>

          {submitSuccess && (
            <div className="p-4 rounded-2xl bg-[rgba(34,197,94,0.15)] border border-green-500 text-sm text-green-300 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Terima kasih! Konfirmasi kehadiran dan doa Anda telah terkirim.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold text-sm w-full py-4 shadow-xl"
          >
            {isSubmitting ? (
              <span>Mengirimkan Pesan...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirim Konfirmasi &amp; Ucapan</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Live Wishes Feed */}
      <div className="text-left space-y-4">
        <p className="text-sm font-bold text-[#d4a373] tracking-wider uppercase mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>Ucapan Doa Restu ({messages.length})</span>
        </p>

        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {messages.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-[rgba(28,21,18,0.7)] border border-[rgba(212,163,115,0.25)] shadow-md">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[rgba(212,163,115,0.25)] text-[#f7e7ce] flex items-center justify-center font-bold text-sm border border-[rgba(212,163,115,0.4)]">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#f7e7ce]">{item.name}</p>
                    <p className="text-[11px] text-[#d4c3b5]">{item.createdAt}</p>
                  </div>
                </div>

                {item.attendance === 'hadir' && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-green-950/80 text-green-300 border border-green-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hadir ({item.guestCount})
                  </span>
                )}
                {item.attendance === 'ragu' && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 font-semibold">
                    <HelpCircle className="w-3.5 h-3.5" /> Ragu
                  </span>
                )}
                {item.attendance === 'tidak_hadir' && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-800 font-semibold">
                    <XCircle className="w-3.5 h-3.5" /> Halangan
                  </span>
                )}
              </div>

              <p className="text-sm text-[#fdfbf7] leading-relaxed pl-12 italic">
                "{item.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

