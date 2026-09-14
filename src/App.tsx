import { useState, useEffect, useRef } from 'react';
import { InvitationCover } from './components/InvitationCover';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { DigitalGiftSection } from './components/DigitalGiftSection';
import { RsvpSection } from './components/RsvpSection';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [guestName, setGuestName] = useState<string>('');
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeSection, setActiveSection] = useState('mempelai');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Parse ?to=... query parameter from URL
    const searchParams = new URLSearchParams(window.location.search);
    const toParam = searchParams.get('to');
    if (toParam) {
      setGuestName(toParam);
    }

    // Audio element setup with local music.mpeg audio
    const audio = new Audio('/music.mpeg');
    audio.loop = true;
    audioRef.current = audio;

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      audio.pause();
    };
  }, []);

  // Handle Opening Invitation Cover
  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(err => {
        console.log('Audio playback status:', err);
      });
    }
  };

  // Toggle Music Play/Pause
  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(err => {
        console.log('Audio playback error:', err);
      });
    }
  };

  // Smooth Scroll to Section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Router: If URL path is /admin, display AdminPage
  if (currentPath === '/admin') {
    return <AdminPage />;
  }

  return (
    <div className="app-container">
      <div className="mobile-wrapper">
        
        {/* Cover Envelope Overlay */}
        <InvitationCover
          guestName={guestName}
          isOpen={isCoverOpen}
          onOpen={handleOpenInvitation}
        />

        {/* Opened Digital Invitation Content */}
        {isCoverOpen && (
          <>
            <Navbar
              activeSection={activeSection}
              onNavigate={handleNavigate}
              isPlayingMusic={isPlayingMusic}
              onToggleMusic={handleToggleMusic}
            />

            <main className="pb-12">
              <HeroSection />
              <CoupleSection />
              <EventSection />
              <DigitalGiftSection />
              <RsvpSection defaultGuestName={guestName} />
            </main>

            {/* Footer */}
            <footer className="text-center py-6 px-4 border-t border-[rgba(212,163,115,0.2)] bg-[#1c1512] text-[#d4c3b5] text-xs space-y-2 mb-16">
              <p className="font-serif font-bold text-gold text-sm">
                Hero Saksono &amp; Sindy Ayunda Putri
              </p>
              <p className="italic">
                Terima kasih atas keikutsertaan Anda dalam kebahagiaan kami.
              </p>
              <p className="text-[10px] opacity-60">
                © 2026 Undangan Pernikahan Digital. All Rights Reserved.
              </p>
            </footer>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
