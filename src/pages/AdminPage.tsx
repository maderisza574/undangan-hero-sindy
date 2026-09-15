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
  Database,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import type { Guest, RsvpMessage } from '../types';
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
  const getInitialTab = (): 'create' | 'list' | 'rsvp' | 'template' => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'rsvp' || tabParam === 'list' || tabParam === 'template' || tabParam === 'create') {
      return tabParam;
    }
    return 'create';
  };

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'rsvp' | 'template'>(getInitialTab);

  const handleTabChange = (tab: 'create' | 'list' | 'rsvp' | 'template') => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState({}, '', url.toString());
  };

  // Custom WA Template State
  const [waTemplate, setWaTemplate] = useState<string>(DEFAULT_TEMPLATE);

  // RSVP & Ucapan State
  const [rsvpMessages, setRsvpMessages] = useState<RsvpMessage[]>([]);
  const [rsvpSearchQuery, setRsvpSearchQuery] = useState('');
  const [rsvpFilter, setRsvpFilter] = useState<'all' | 'hadir' | 'ragu' | 'tidak_hadir'>('all');
  const [isLoadingRsvp, setIsLoadingRsvp] = useState(false);
  const [rsvpFeedback, setRsvpFeedback] = useState<string | null>(null);
  const [confirmDeleteRsvp, setConfirmDeleteRsvp] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingRsvp, setIsDeletingRsvp] = useState(false);

  const fetchRsvpMessages = async () => {
    setIsLoadingRsvp(true);
    try {
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
          setRsvpMessages(mapped);
          setIsLoadingRsvp(false);
          return;
        }
      }

      // LocalStorage fallback
      const saved = localStorage.getItem('wedding_rsvp_messages');
      if (saved) {
        try {
          setRsvpMessages(JSON.parse(saved));
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
        setRsvpMessages(initial);
        localStorage.setItem('wedding_rsvp_messages', JSON.stringify(initial));
      }
    } catch (err) {
      console.error('Error fetching RSVP messages:', err);
    } finally {
      setIsLoadingRsvp(false);
    }
  };

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
    fetchRsvpMessages();
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
    handleTabChange('list');
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

  const handleDeleteRsvp = (id: string, senderName: string) => {
    setConfirmDeleteRsvp({ id, name: senderName });
  };

  const executeDeleteRsvp = async (id: string, senderName: string) => {
    setIsDeletingRsvp(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('rsvp_messages')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Gagal menghapus ucapan:', error);
          alert(`Gagal menghapus dari database: ${error.message}\n(Pastikan kebijakan DELETE Supabase sudah diaktifkan)`);
          setIsDeletingRsvp(false);
          return;
        }
      }

      const updated = rsvpMessages.filter(item => item.id !== id);
      setRsvpMessages(updated);
      localStorage.setItem('wedding_rsvp_messages', JSON.stringify(updated));
      setRsvpFeedback(`Ucapan dari "${senderName}" berhasil dihapus.`);
      setConfirmDeleteRsvp(null);
      setTimeout(() => setRsvpFeedback(null), 3500);
    } catch (err) {
      console.error('Error executing delete RSVP:', err);
    } finally {
      setIsDeletingRsvp(false);
    }
  };

  const rsvpStats = {
    total: rsvpMessages.length,
    hadir: rsvpMessages.filter(m => m.attendance === 'hadir').length,
    totalPax: rsvpMessages
      .filter(m => m.attendance === 'hadir')
      .reduce((acc, curr) => acc + (curr.guestCount || 1), 0),
    ragu: rsvpMessages.filter(m => m.attendance === 'ragu').length,
    tidakHadir: rsvpMessages.filter(m => m.attendance === 'tidak_hadir').length,
  };

  const filteredRsvp = rsvpMessages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(rsvpSearchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(rsvpSearchQuery.toLowerCase());
    const matchesFilter = rsvpFilter === 'all' || m.attendance === rsvpFilter;
    return matchesSearch && matchesFilter;
  });

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
            <Sparkles className="w-4 h-4" /> Generator Link Undangan WA &amp; RSVP
          </div>
          <h1 className="text-2xl font-serif font-bold text-gold">
            Manajemen Undangan &amp; RSVP
          </h1>
          <p className="text-xs text-[#b8c4bc] mt-1">
            Kelola daftar tamu, link WhatsApp, dan moderasi ucapan doa restu tamu.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-xl bg-[rgba(10,19,15,0.8)] border border-[rgba(223,179,85,0.25)] p-1.5 mb-6">
          <button
            id="tab-btn-create"
            onClick={() => handleTabChange('create')}
            className={`py-2 px-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Tambah Tamu</span>
          </button>
          <button
            id="tab-btn-list"
            onClick={() => handleTabChange('list')}
            className={`py-2 px-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Tamu ({guests.length})</span>
          </button>
          <button
            id="tab-btn-rsvp"
            onClick={() => handleTabChange('rsvp')}
            className={`py-2 px-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'rsvp'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">RSVP ({rsvpMessages.length})</span>
          </button>
          <button
            id="tab-btn-template"
            onClick={() => handleTabChange('template')}
            className={`py-2 px-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'template'
                ? 'bg-[#dfb355] text-[#07120d] shadow-md'
                : 'text-[#b8c4bc] hover:text-[#f4efe6]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Template WA</span>
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

        {/* TAB 3: DAFTAR RSVP & UCAPAN BESERTA FITUR HAPUS */}
        {activeTab === 'rsvp' && (
          <div className="space-y-4">
            {/* Feedback Message */}
            {rsvpFeedback && (
              <div className="p-3.5 rounded-xl bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center justify-between shadow-lg">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  {rsvpFeedback}
                </span>
                <button
                  onClick={() => setRsvpFeedback(null)}
                  className="text-green-400 hover:text-green-200 text-xs font-bold px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Quick RSVP Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="glass-card p-3 text-center">
                <p className="text-[10px] text-[#b8c4bc] uppercase tracking-wider">Total Ucapan</p>
                <p className="text-xl font-serif font-bold text-[#dfb355]">{rsvpStats.total}</p>
              </div>
              <div className="glass-card p-3 text-center border-green-800/40">
                <p className="text-[10px] text-green-400 uppercase tracking-wider">Hadir</p>
                <p className="text-xl font-serif font-bold text-green-400">
                  {rsvpStats.hadir} <span className="text-xs font-sans text-green-300/80 font-normal">({rsvpStats.totalPax} Pax)</span>
                </p>
              </div>
              <div className="glass-card p-3 text-center border-amber-800/40">
                <p className="text-[10px] text-amber-400 uppercase tracking-wider">Ragu</p>
                <p className="text-xl font-serif font-bold text-amber-400">{rsvpStats.ragu}</p>
              </div>
              <div className="glass-card p-3 text-center border-red-800/40">
                <p className="text-[10px] text-red-400 uppercase tracking-wider">Halangan</p>
                <p className="text-xl font-serif font-bold text-red-400">{rsvpStats.tidakHadir}</p>
              </div>
            </div>

            {/* Search, Filter & Refresh Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#dfb355] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={rsvpSearchQuery}
                  onChange={(e) => setRsvpSearchQuery(e.target.value)}
                  placeholder="Cari pengirim / kata ucapan..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-xs text-[#f4efe6] focus:outline-none focus:border-[#dfb355]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={fetchRsvpMessages}
                  disabled={isLoadingRsvp}
                  className="p-2.5 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-[#dfb355] hover:bg-[#dfb355] hover:text-[#07120d] transition-all disabled:opacity-50 shrink-0"
                  title="Refresh Ucapan"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingRsvp ? 'animate-spin' : ''}`} />
                </button>

                {(['all', 'hadir', 'ragu', 'tidak_hadir'] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setRsvpFilter(filterKey)}
                    className={`px-3 py-2 text-[11px] rounded-xl font-medium transition-all capitalize shrink-0 border ${
                      rsvpFilter === filterKey
                        ? 'bg-[#dfb355] text-[#07120d] border-[#dfb355] font-bold'
                        : 'bg-[rgba(10,19,15,0.9)] text-[#b8c4bc] border-[rgba(223,179,85,0.2)] hover:text-[#f4efe6]'
                    }`}
                  >
                    {filterKey === 'all' ? 'Semua' : filterKey === 'tidak_hadir' ? 'Halangan' : filterKey}
                  </button>
                ))}
              </div>
            </div>

            {/* List of RSVP & Wishes Cards */}
            {filteredRsvp.length === 0 ? (
              <div className="glass-card text-center py-10">
                <MessageSquare className="w-8 h-8 text-[#dfb355]/40 mx-auto mb-2" />
                <p className="text-xs text-[#b8c4bc]">
                  {rsvpSearchQuery || rsvpFilter !== 'all'
                    ? 'Tidak ada ucapan yang sesuai pencarian atau filter.'
                    : 'Belum ada ucapan doa restu yang masuk.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRsvp.map((item) => (
                  <div key={item.id} className="glass-card text-left space-y-3 relative group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[rgba(223,179,85,0.15)] text-[#dfb355] flex items-center justify-center font-bold text-sm border border-[rgba(223,179,85,0.3)] shrink-0">
                          {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-sm text-[#f9eaaf]">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-[#b8c4bc]">{item.createdAt}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.attendance === 'hadir' && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-green-950/80 text-green-300 border border-green-800 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Hadir ({item.guestCount} pax)
                          </span>
                        )}
                        {item.attendance === 'ragu' && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 font-semibold">
                            <HelpCircle className="w-3 h-3" /> Ragu
                          </span>
                        )}
                        {item.attendance === 'tidak_hadir' && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-800 font-semibold">
                            <XCircle className="w-3 h-3" /> Halangan
                          </span>
                        )}

                        {/* DELETE BUTTON */}
                        <button
                          id={`delete-rsvp-${item.id}`}
                          data-testid="btn-delete-rsvp"
                          onClick={() => handleDeleteRsvp(item.id, item.name)}
                          className="text-[#b8c4bc] hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/40 border border-transparent hover:border-red-800/60 transition-all ml-1"
                          title={`Hapus ucapan dari ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Message Bubble */}
                    <div className="p-3 rounded-xl bg-[rgba(10,19,15,0.7)] border border-[rgba(223,179,85,0.15)] text-xs text-[#f4efe6] leading-relaxed italic">
                      "{item.message}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOM WA TEMPLATE */}
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

        {/* Custom Confirmation Modal for Deleting RSVP */}
        {confirmDeleteRsvp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-card max-w-sm w-full p-5 text-center space-y-4 border border-[rgba(223,179,85,0.35)] shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-red-950/80 text-red-400 border border-red-800 flex items-center justify-center mx-auto shadow-inner">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#f9eaaf]">Hapus Ucapan Doa Restu?</h4>
                <p className="text-xs text-[#b8c4bc] mt-1.5 leading-relaxed">
                  Apakah Anda yakin ingin menghapus ucapan dari <span className="text-[#dfb355] font-semibold">"{confirmDeleteRsvp.name}"</span>? Ucapan ini akan dihapus permanen.
                </p>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  id="btn-cancel-delete"
                  disabled={isDeletingRsvp}
                  onClick={() => setConfirmDeleteRsvp(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[rgba(10,19,15,0.9)] border border-[rgba(223,179,85,0.3)] text-xs text-[#b8c4bc] hover:text-[#f4efe6] transition-all disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  id="btn-confirm-delete"
                  disabled={isDeletingRsvp}
                  onClick={() => executeDeleteRsvp(confirmDeleteRsvp.id, confirmDeleteRsvp.name)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-red-800 hover:bg-red-700 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isDeletingRsvp ? (
                    <span>Menghapus...</span>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Ya, Hapus</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
