import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="4" width="9" height="24" rx="4.5" />
      <rect x="17" y="4" width="9" height="24" rx="4.5" />
    </svg>
  );
}

function PingPongVideo() {
  const videoRef = useRef(null);
  const reverseTimerRef = useRef(0);
  const holdRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const finishReverse = () => {
      window.clearInterval(reverseTimerRef.current);
      video.currentTime = 0;
      video.playbackRate = 1;
      video.play().catch(() => {});
    };

    const beginReverse = () => {
      video.pause();

      holdRef.current = window.setTimeout(() => {
        const stepMs = 80;
        const reverseSpeed = 0.72;

        reverseTimerRef.current = window.setInterval(() => {
          if (video.currentTime <= 0.08) {
            finishReverse();
            return;
          }

          video.currentTime = Math.max(
            0,
            video.currentTime - (stepMs / 1000) * reverseSpeed
          );
        }, stepMs);
      }, 450);
    };

    video.addEventListener("ended", beginReverse);
    return () => {
      video.removeEventListener("ended", beginReverse);
      window.clearTimeout(holdRef.current);
      window.clearInterval(reverseTimerRef.current);
    };
  }, []);

  return (
    <video ref={videoRef} autoPlay muted playsInline preload="auto" aria-label="NeuralKinetics adaptive system visualization">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4" type="video/mp4" />
    </video>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="5" cy="5" r="1.25" />
      <circle cx="11" cy="5" r="1.25" />
      <circle cx="5" cy="11" r="1.25" />
      <circle cx="11" cy="11" r="1.25" />
    </svg>
  );
}

export default function App() {
  return (
    <main className="hero" id="top">
      <div className="video-stage">
        <motion.div className="video-motion" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease }}>
          <motion.div
            className="video-float"
            animate={{ y: [0, -10, 0], scale: [1, 1.012, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <PingPongVideo />
          </motion.div>
        </motion.div>
      </div>

      <motion.nav className="navbar" initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease }} aria-label="Primary navigation">
        <div className="nav-left">
          <a className="brand" href="#top" aria-label="NeuralKinetics home">
            <BrandMark />
            <span className="brand-name">NeuralKinetics</span>
          </a>
          <motion.button className="menu-pill" type="button" whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }} aria-label="Open menu">
            <span className="circle white-circle"><Plus size={12} strokeWidth={3} /></span>
            <span>Menu</span>
          </motion.button>
          <div className="focus-pill desktop-only">
            <span>Advanced Bionics</span><i /><span>Cognitive AI</span>
          </div>
        </div>
        <div className="system-pill">
          <button className="circle black-circle" type="button" aria-label="Systems overview"><GridIcon /></button>
          <span className="system-label">Adaptive Systems</span>
        </div>
      </motion.nav>

      <motion.footer className="hero-footer" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
        <div className="copy">
          <motion.div className="eyebrow" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
            <span className="dot" /><span>Best digital banking card 2026</span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease }}>
            One Card, Zero<br />Limits. Worldwide.
          </motion.h1>
          <motion.div className="actions" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1, ease }}>
            <a className="button primary" href="#features">See Features</a>
            <a className="button secondary" href="#how-it-works">How It Works</a>
          </motion.div>
        </div>
        <div className="technology-tags">
          {["Neuromorphic", "AGI", "Cybernetics"].map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </motion.footer>
    </main>
  );
}