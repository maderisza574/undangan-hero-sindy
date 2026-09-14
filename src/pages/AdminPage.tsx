import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Search, 
  ArrowLeft, 
  Sparkles, 
  Share2,
  Edit3,
  CheckCircle,
  Clock,
  Database
} from 'lucide-react';
import type { Guest } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEFAULT_TEMPLATE = `Assalamu'alaikum Wr. Wb.

Kepada Yth. {NAMA_TAMU}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

Hero Saksono & Sindy Ayunda Putri

Sabtu & Minggu, 26-27 September 2026

Berikut link undangan digital kami:
{LINK_UNDANGAN}

Merupakan suatu kehormatan & kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Wassalamu'alaikum Wr. Wb.`;

export const AdminPage: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'template'>('create');

  // Custom WA Template State
  const [waTemplate, setWaTemplate] = useState<string>(DEFAULT_TEMPLATE);

  useEffect(() => {
    const fetchGuests = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped: Guest[] = data.map(g => ({
            id: g.id,
            name: g.name,
            phone: g.phone || '',
            status: g.status as 'sent' | 'pending',
            generatedUrl: g.generated_url,
            createdAt: new Date(g.created_at).toISOString().slice(0, 10)
          }));
          setGuests(mapped);
          return;
        }
      }

      // LocalStorage fallback
      const savedGuests = localStorage.getItem('wedding_guest_list');
      if (savedGuests) {
        try {
          setGuests(JSON.parse(savedGuests));
        } catch (e) {
          console.error(e);
        }
      } else {
        const sampleGuests: Guest[] = [
          {
            id: '1',
            name: 'mba despi',
            phone: '',
            status: 'pending',
            generatedUrl: `https://undangan-hero-sindy.vercel.app/?to=${encodeURIComponent('mba despi')}`,
            createdAt: new Date().toISOString().slice(0, 10)
          },
          {
            id: '2',
            name: 'Bapak Ahmad & Keluarga',
            phone: '',
            status: 'sent',
            generatedUrl: `https://undangan-hero-sindy.vercel.app/?to=${encodeURIComponent('Bapak Ahmad & Keluarga')}`,
            createdAt: new Date().toISOString().slice(0, 10)
          }
        ];
        setGuests(sampleGuests);
        localStorage.setItem('wedding_guest_list', JSON.stringify(sampleGuests));
      }

      const savedTemplate = localStorage.getItem('wedding_wa_template');
      if (savedTemplate) {
        setWaTemplate(savedTemplate);
      }
    };

    fetchGuests();
  }, []);

  const saveGuestsToStorage = (updated: Guest[]) => {
    setGuests(updated);
    localStorage.setItem('wedding_guest_list', JSON.stringify(updated));
  };

  const handleSaveTemplate = (text: string) => {
    setWaTemplate(text);
    localStorage.setItem('wedding_wa_template', text);
  };

  const buildInvitationUrl = (name: string) => {
    const origin = window.location.origin;
    return `${origin}/?to=${encodeURIComponent(name.trim())}`;
  };

  const buildWaMessage = (name: string, link: string) => {
    return waTemplate
      .replace(/{NAMA_TAMU}/g, name)
      .replace(/{LINK_UNDANGAN}/g, link);
  };

  const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const url = buildInvitationUrl(guestName);
    let newId = Date.now().toString();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('guests')
        .insert({
          name: guestName.trim(),
          phone: guestPhone.trim(),
          status: 'pending',
          generated_url: url
        })
        .select()
        .single();

      if (!error && data) {
        newId = data.id;
      }
    }

    const newGuest: Guest = {
      id: newId,
      name: guestName.trim(),
      phone: guestPhone.trim(),
      status: 'pending',
      generatedUrl: url,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const updated = [newGuest, ...guests];
    saveGuestsToStorage(updated);
    setGuestName('');
    setGuestPhone('');
    setActiveTab('list');
  };

  const handleToggleStatus = async (id: string) => {
    const target = guests.find(g => g.id === id);
    if (!target) return;

    const nextStatus: 'sent' | 'pending' = target.status === 'sent' ? 'pending' : 'sent';

    if (isSupabaseConfigured && supabase) {
      await supabase.from('guests').update({ status: nextStatus }).eq('id', id);
    }

    const updated: Guest[] = guests.map(g => {
      if (g.id === id) {
        return { ...g, status: nextStatus };
      }
      return g;
    });
    saveGuestsToStorage(updated);
  };

  const handleDeleteGuest = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus tamu ini?')) {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('guests').delete().eq('id', id);
      }
      const updated = guests.filter(g => g.id !== id);
      saveGuestsToStorage(updated);
    }
  };

  const handleCopy = (text: string, idKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSendWa = (guest: Guest) => {
    const message = buildWaMessage(guest.name, guest.generatedUrl);
    const encoded = encodeURIComponent(message);
    const phone = guest.phone ? formatPhoneNumber(guest.phone) : '';
    
    const waUrl = phone 
      ? `https://wa.me/${phone}?text=${encoded}` 
      : `https://api.whatsapp.com/send?text=${encoded}`;
    
    handleToggleStatus(guest.id);
    window.open(waUrl, '_blank');
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.phone && g.phone.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-[#07120d] text-[#f4efe6] font-sans pb-12">
      <div className="max-w-xl mx-auto px-4 py-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(223,179,85,0.2)]">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#dfb355] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Tampilan Undangan</span>
          </a>
          
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 border ${
              isSupabaseConfigured
                ? 'bg-green-950 text-green-400 border-green-800'
                : 'bg-amber-950 text-amber-400 border-amber-800'
            }`}>
              <Database className="w-3 h-3" />
              {isSupabaseConfigured ? 'Supabase Connected' : 'Local Storage Mode'}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#dfb355] font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Generator Link Undangan WA
          </div>
          <h1 className="text-2xl font-serif font-bold text-gold">
            Manajemen Yth. &amp; Kirim WA
          </h1>
          <p className="text-xs text-[#b8c4bc] mt-1">
            Tambah nama tamu, buat link kustom "Kepada Yth.", dan siap kirim 1-klik ke WhatsApp!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-[rgba(10,19,15,0.8)] border border-[rgba(223,179,85,0.25)] p-1 mb-6">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Tambah Tamu</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Daftar Tamu ({guests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'template'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Template WA</span>
          </button>
        </div>

        {/* TAB 1: TAMBAH TAMU FORM */}
        {activeTab === 'create' && (
          <div className="glass-card text-left">
            <h2 className="text-lg font-serif font-bold text-[#f9eaaf] mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#dfb355]" />
              <span>Input Tamu Baru</span>
            </h2>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#f9eaaf] mb-1">
                  Nama Kepada Yth. *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Contoh: Desphi / Bapak Ahmad &amp; Keluarga"
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-xs text-[#f4efe6] focus:outline-none focus:border-[#dfb355]"
                />
                <p className="text-[10px] text-[#b8c4bc] mt-1">
                  Nama ini akan langsung tampil di sampul depan ucapan undangan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f9eaaf] mb-1">
                  Nomor WhatsApp Tamu (Opsional)
                </label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="Contoh: 08123456789 atau 628123456789"
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-xs text-[#f4efe6] focus:outline-none focus:border-[#dfb355]"
                />
              </div>

              {/* Realtime Live Preview Box */}
              {guestName && (
                <div className="p-3.5 rounded-xl bg-[rgba(10,19,15,0.7)] border border-[rgba(223,179,85,0.2)] space-y-2">
                  <p className="text-[11px] font-semibold text-[#dfb355]">
                    Hasil Pratinjau Link Undangan:
                  </p>
                  <p className="text-xs font-mono text-[#f9eaaf] break-all bg-[#0a130f] p-2 rounded border border-[rgba(223,179,85,0.15)]">
                    {buildInvitationUrl(guestName)}
                  </p>
                </div>
              )}

              <button type="submit" className="btn-gold text-xs w-full py-3">
                <Sparkles className="w-4 h-4" />
                <span>Generate Link &amp; Simpan ke Daftar</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: DAFTAR TAMU & SHARE WA */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#dfb355] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama tamu / nomor WA..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-xs text-[#f4efe6] focus:outline-none focus:border-[#dfb355]"
              />
            </div>

            {filteredGuests.length === 0 ? (
              <div className="glass-card text-center py-8">
                <p className="text-xs text-[#b8c4bc]">Belum ada data tamu. Silakan tambah tamu baru.</p>
              </div>
            ) : (
              filteredGuests.map((guest) => {
                const isCopiedUrl = copiedId === `url-${guest.id}`;
                const isCopiedMsg = copiedId === `msg-${guest.id}`;
                const fullMsgText = buildWaMessage(guest.name, guest.generatedUrl);

                return (
                  <div key={guest.id} className="glass-card text-left space-y-3 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#f9eaaf]">
                          {guest.name}
                        </h3>
                        {guest.phone && (
                          <p className="text-xs text-[#b8c4bc]">WA: {guest.phone}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(guest.id)}
                          className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border flex items-center gap-1 ${
                            guest.status === 'sent'
                              ? 'bg-green-950 text-green-400 border-green-800'
                              : 'bg-amber-950 text-amber-400 border-amber-800'
                          }`}
                        >
                          {guest.status === 'sent' ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              Terkirim
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              Belum Kirim
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-[#b8c4bc] hover:text-red-400 p-1"
                          title="Hapus Tamu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Generated Link Field */}
                    <div className="p-2.5 rounded-lg bg-[rgba(10,19,15,0.8)] border border-[rgba(223,179,85,0.15)] flex items-center justify-between text-xs font-mono">
                      <span className="truncate pr-2 text-[#f4efe6]">{guest.generatedUrl}</span>
                      <button
                        onClick={() => handleCopy(guest.generatedUrl, `url-${guest.id}`)}
                        className="text-[#dfb355] hover:text-[#f9eaaf] shrink-0 p-1"
                        title="Salin Link"
                      >
                        {isCopiedUrl ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        onClick={() => handleSendWa(guest)}
                        className="btn-gold text-[11px] py-2 px-2 gap-1 rounded-xl"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim WA</span>
                      </button>

                      <button
                        onClick={() => handleCopy(fullMsgText, `msg-${guest.id}`)}
                        className="btn-outline-gold text-[11px] py-2 px-2 gap-1 rounded-xl"
                      >
                        {isCopiedMsg ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Salin Teks</span>
                      </button>

                      <a
                        href={guest.generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold text-[11px] py-2 px-2 gap-1 rounded-xl text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Pratinjau</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: CUSTOM WA TEMPLATE */}
        {activeTab === 'template' && (
          <div className="glass-card text-left">
            <h2 className="text-lg font-serif font-bold text-[#f9eaaf] mb-2 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#dfb355]" />
              <span>Pengaturan Template Pesan WA</span>
            </h2>
            <p className="text-xs text-[#b8c4bc] mb-4">
              Gunakan tag <code className="text-[#dfb355] font-bold">{"{NAMA_TAMU}"}</code> dan <code className="text-[#dfb355] font-bold">{"{LINK_UNDANGAN}"}</code> untuk menyisipkan variabel otomatis.
            </p>

            <textarea
              rows={12}
              value={waTemplate}
              onChange={(e) => handleSaveTemplate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-xs text-[#f4efe6] font-sans leading-relaxed focus:outline-none focus:border-[#dfb355]"
            ></textarea>

            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => handleSaveTemplate(DEFAULT_TEMPLATE)}
                className="text-[11px] text-[#dfb355] hover:underline"
              >
                Reset ke Template Default Klien
              </button>
              <span className="text-[10px] text-[#b8c4bc]">Tersimpan Otomatis</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
