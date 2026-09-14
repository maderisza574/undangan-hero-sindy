import { useState } from 'react';
import { Copy, Check, Wallet, Building2 } from 'lucide-react';
import bniLogo from '../assets/bni_logo.png';
import bcaLogo from '../assets/bca_logo.png';
import ewalletLogo from '../assets/ewallet_logo.png';

export const DigitalGiftSection = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const gifts = [
    {
      id: 'bni',
      type: 'Bank BNI',
      logo: bniLogo,
      accountNumber: '2106320347',
      accountHolder: 'Hero Saksono',
      badge: 'Transfer BNI'
    },
    {
      id: 'bca',
      type: 'Bank BCA',
      logo: bcaLogo,
      accountNumber: '0462210840',
      accountHolder: 'Sindy Ayunda Putri',
      badge: 'Transfer BCA'
    },
    {
      id: 'ewallet',
      type: 'E-Wallet (DANA, OVO, ShopeePay, GoPay)',
      logo: ewalletLogo,
      accountNumber: '082136882616',
      accountHolder: 'Sindy Ayunda Putri',
      badge: 'E-Wallet',
      tags: ['DANA', 'OVO', 'ShopeePay', 'GoPay']
    }
  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedAccount(num);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  return (
    <section id="gift" className="px-5 py-10 text-center scroll-mt-6 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="mb-8 w-full flex flex-col items-center justify-center">
        <p className="text-xs font-serif text-[#d4c3b5] tracking-widest uppercase mb-1 text-center">
          Tanda Kasih
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold text-center">
          Amplop Digital &amp; Hadiah
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto my-3"></div>
        <p className="text-xs text-[#d4c3b5] max-w-xs mx-auto text-center leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah digital, dapat melalui rekening berikut:
        </p>
      </div>

      {/* Gift Cards */}
      <div className="space-y-6 w-full flex flex-col items-center justify-center">
        {gifts.map((item) => {
          const isCopied = copiedAccount === item.accountNumber;
          return (
            <div key={item.id} className="glass-card w-full text-center relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-xl">
              {/* Header with Logo */}
              <div className="flex items-center justify-between border-b border-[rgba(212,163,115,0.25)] pb-4 mb-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="h-10 px-3 py-1 rounded-xl bg-white/90 flex items-center justify-center border border-[#d4a373]/30 shadow-sm">
                    <img src={item.logo} alt={item.type} className="h-6 object-contain" />
                  </div>
                  <div className="text-left">
                    <span className="font-serif font-bold text-base text-[#f7e7ce] block">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-semibold text-[#d4a373] tracking-wide uppercase">
                      {item.badge}
                    </span>
                  </div>
                </div>
                {item.tags ? (
                  <Wallet className="w-5 h-5 text-[#d4a373]" />
                ) : (
                  <Building2 className="w-5 h-5 text-[#d4a373]" />
                )}
              </div>

              {/* Account Details */}
              <div className="space-y-2 text-xs mb-5 text-center w-full">
                <p className="text-[#d4c3b5] font-medium text-[11px]">
                  {item.tags ? 'Nomor E-Wallet (DANA / OVO / ShopeePay / GoPay):' : 'Nomor Rekening:'}
                </p>
                <p className="font-mono text-2xl font-bold text-[#fdfbf7] tracking-wider py-1 bg-[rgba(20,15,12,0.6)] rounded-xl border border-[rgba(212,163,115,0.2)]">
                  {item.accountNumber}
                </p>
                <p className="text-[#d4c3b5] pt-1">
                  Atas Nama: <span className="text-[#f7e7ce] font-bold text-sm">{item.accountHolder}</span>
                </p>

                {/* E-wallet Tag Badges */}
                {item.tags && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#d4a373]/15 text-[#f7e7ce] border border-[#d4a373]/30 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(item.accountNumber)}
                className={`btn-gold text-xs w-full py-3 transition-all flex items-center justify-center gap-2 ${
                  isCopied ? 'bg-[#d4a373] text-[#1c1512]' : ''
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1c1512]" />
                    <span className="font-bold text-[#1c1512]">Nomor Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Nomor {item.tags ? 'E-Wallet' : 'Rekening'}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

