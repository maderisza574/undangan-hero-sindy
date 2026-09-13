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
    <section id="gift" className="px-5 py-8 text-center scroll-mt-6 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="mb-6 w-full flex flex-col items-center justify-center">
        <p className="text-xs font-serif text-[#d4c3b5] tracking-widest uppercase mb-1 text-center">
          Tanda Kasih
        </p>
        <h2 className="text-3xl font-serif font-bold text-gold text-center">
          Amplop Digital &amp; Hadiah
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto my-3"></div>
        <p className="text-xs text-[#d4c3b5] max-w-xs mx-auto text-center leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah digital, dapat melalui:
        </p>
      </div>

      {/* Bank Account Cards */}
      <div className="space-y-4 w-full flex flex-col items-center justify-center">
        {bankAccounts.map((account, idx) => {
          const isCopied = copiedAccount === account.accountNumber;
          return (
            <div key={idx} className="glass-card w-full text-center relative overflow-hidden flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 border-b border-[rgba(212,163,115,0.2)] pb-3 mb-3 w-full">
                <CreditCard className="w-5 h-5 text-[#d4a373]" />
                <span className="font-serif font-bold text-lg text-[#f7e7ce]">
                  {account.bank}
                </span>
                <span className="text-[10px] font-semibold text-[#d4a373] px-2 py-0.5 rounded bg-[rgba(212,163,115,0.15)] border border-[rgba(212,163,115,0.3)] ml-2">
                  Transfer Bank
                </span>
              </div>

              <div className="space-y-1 text-xs mb-4 text-center">
                <p className="text-[#d4c3b5]">Nomor Rekening:</p>
                <p className="font-mono text-xl font-bold text-[#fdfbf7] tracking-wider">
                  {account.accountNumber}
                </p>
                <p className="text-[#d4c3b5] pt-1">
                  Atas Nama: <span className="text-[#f7e7ce] font-semibold">{account.accountHolder}</span>
                </p>
              </div>

              <button
                onClick={() => handleCopy(account.accountNumber)}
                className={`btn-outline-gold text-xs w-full py-2.5 transition-all flex items-center justify-center gap-2 ${
                  isCopied ? 'bg-[#d4a373] text-[#1c1512] border-[#d4a373]' : ''
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1c1512]" />
                    <span className="font-bold text-[#1c1512]">Nomor Rekening Berhasil Disalin!</span>
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
