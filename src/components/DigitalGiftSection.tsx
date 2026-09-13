import { useState } from 'react';
import { Copy, Check, CreditCard } from 'lucide-react';

export const DigitalGiftSection = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bankAccounts = [
    {
      bank: 'Bank BCA',
      accountNumber: '8410293841',
      accountHolder: 'HERO SAKSONO'
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '1420019283741',
      accountHolder: 'SINDY AYUNDA PUTRI'
    }
  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedAccount(num);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  return (
    <section id="gift" className="px-5 py-8 text-center scroll-mt-6">
      {/* Title */}
      <div className="mb-6">
        <p className="text-xs font-serif text-[#b8c4bc] tracking-widest uppercase mb-1">
          Tanda Kasih
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold">
          Amplop Digital &amp; Hadiah
        </h2>
        <div className="gold-divider"></div>
        <p className="text-xs text-[#b8c4bc] max-w-xs mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah digital, dapat melalui:
        </p>
      </div>

      {/* Bank Account Cards */}
      <div className="space-y-4">
        {bankAccounts.map((account, idx) => {
          const isCopied = copiedAccount === account.accountNumber;
          return (
            <div key={idx} className="glass-card text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[rgba(223,179,85,0.2)] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#dfb355]" />
                  <span className="font-serif font-bold text-lg text-[#f9eaaf]">
                    {account.bank}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#dfb355] px-2 py-0.5 rounded bg-[rgba(223,179,85,0.1)] border border-[rgba(223,179,85,0.3)]">
                  Transfer Bank
                </span>
              </div>

              <div className="space-y-1 text-xs mb-4">
                <p className="text-[#b8c4bc]">Nomor Rekening:</p>
                <p className="font-mono text-xl font-bold text-[#f4efe6] tracking-wider">
                  {account.accountNumber}
                </p>
                <p className="text-[#b8c4bc] pt-1">
                  Atas Nama: <span className="text-[#f9eaaf] font-semibold">{account.accountHolder}</span>
                </p>
              </div>

              <button
                onClick={() => handleCopy(account.accountNumber)}
                className={`btn-outline-gold text-xs w-full py-2.5 transition-all ${
                  isCopied ? 'bg-[#dfb355] text-[#07120d] border-[#dfb355]' : ''
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#07120d]" />
                    <span className="font-bold text-[#07120d]">Nomor Rekening Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Nomor Rekening</span>
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
