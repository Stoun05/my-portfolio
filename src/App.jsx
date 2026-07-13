import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";

const ease = [0.16, 1, 0.3, 1];
const menuItems = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

const projects = [
  {
    number: "01",
    title: "NeuralKinetics",
    type: "React · Motion · Creative development",
    description: "An immersive full-screen experience combining adaptive motion, cinematic video and precise responsive typography.",
  },
  {
    number: "02",
    title: "Aýbölek Furniture",
    type: "UI/UX · Product catalogue · Web",
    description: "A refined digital furniture catalogue designed around clear discovery, premium presentation and mobile-first browsing.",
  },
  {
    number: "03",
    title: "Horse Portal",
    type: "Web platform · Catalogue · Data",
    description: "A structured portal for presenting horses, detailed profiles and pedigree information through an accessible interface.",
  },
];

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="4" width="9" height="24" rx="4.5" />
      <rect x="17" y="4" width="9" height="24" rx="4.5" />
    </svg>
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
      video.play().catch(() => {});
    };

    const beginReverse = () => {
      video.pause();
      holdRef.current = window.setTimeout(() => {
        const stepMs = 80;
        reverseTimerRef.current = window.setInterval(() => {
          if (video.currentTime <= 0.08) {
            finishReverse();
            return;
          }
          video.currentTime = Math.max(0, video.currentTime - 0.058);
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
    <video ref={videoRef} autoPlay muted playsInline preload="auto" aria-label="Robotic hand moving forwards and backwards">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4" type="video/mp4" />
    </video>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.2,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 650, damping: 42 });
  const y = useSpring(pointerY, { stiffness: 650, damping: 42 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
    };
    const hover = (event) => {
      setActive(Boolean(event.target.closest("a, button, .project-card")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", hover);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", hover);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y }}
      animate={{
        opacity: visible ? 1 : 0,
        width: active ? 42 : 10,
        height: active ? 42 : 10,
        backgroundColor: active ? "rgba(255,255,255,0)" : "#080808",
      }}
      transition={{ duration: 0.2 }}
    />
  );
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <header className="navbar-wrap">
        <motion.nav
          className="navbar"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          aria-label="Primary navigation"
        >
          <div className="nav-left">
            <a className="brand" href="#top" aria-label="NeuralKinetics home">
              <BrandMark />
              <span className="brand-name">NeuralKinetics</span>
            </a>

            <motion.button
              className="menu-pill"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="circle white-circle">
                {menuOpen ? <X size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
              </span>
              <span>{menuOpen ? "Close" : "Menu"}</span>
            </motion.button>

            <div className="focus-pill desktop-only">
              <span>Creative Developer</span><i /><span>UI/UX</span>
            </div>
          </div>

          <a className="system-pill" href="#projects" aria-label="View selected projects">
            <span className="circle black-circle"><GridIcon /></span>
            <span className="system-label">Selected Work</span>
          </a>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0, clipPath: "circle(0% at 18% 4%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 18% 4%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 18% 4%)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="menu-inner">
              <p className="menu-kicker">Navigation</p>
              <div className="menu-links">
                {menuItems.map(([label, href], index) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={closeMenu}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + index * 0.07, duration: 0.65, ease }}
                  >
                    <span>0{index + 1}</span>
                    {label}
                    <ArrowDownRight />
                  </motion.a>
                ))}
              </div>
              <div className="menu-meta">
                <span>Available for selected projects</span>
                <span>2026 portfolio</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="top">
          <div className="video-stage">
            <motion.div className="video-motion" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease }}>
              <motion.div className="video-float" animate={{ y: [0, -10, 0], scale: [1, 1.012, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <PingPongVideo />
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="hero-footer" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
            <div className="copy">
              <motion.div className="eyebrow" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
                <span className="dot" /><span>Independent designer & developer</span>
              </motion.div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease }}>
                I Design. I Build.<br />Ideas Into Reality.
              </motion.h1>
              <motion.div className="actions" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1, ease }}>
                <a className="button primary" href="#projects">See Projects</a>
                <a className="button secondary" href="#about">About Me</a>
              </motion.div>
            </div>
            <div className="technology-tags">
              {["React", "UI/UX", "Creative Code"].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </motion.div>
        </section>

        <section className="about section" id="about">
          <SectionLabel>About</SectionLabel>
          <motion.div className="about-grid" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease }}>
            <h2>Digital experiences with clarity, character and purpose.</h2>
            <div className="about-copy">
              <p>I combine design thinking and front-end development to turn early ideas into polished, responsive digital products.</p>
              <p>My work moves from visual systems and prototypes to complete websites that feel intuitive on every screen.</p>
            </div>
          </motion.div>
        </section>

        <section className="projects section" id="projects">
          <SectionLabel>Selected projects</SectionLabel>
          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease }}
                whileHover={{ y: -10 }}
              >
                <div className="project-top">
                  <span>{project.number}</span>
                  <ArrowUpRight />
                </div>
                <div className="project-visual">
                  <span>{project.title.charAt(0)}</span>
                  <div className="project-orbit" />
                </div>
                <div className="project-info">
                  <p>{project.type}</p>
                  <h3>{project.title}</h3>
                  <span>{project.description}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <SectionLabel>Capabilities</SectionLabel>
          <div className="skills-grid">
            {[
              ["01", "UI/UX Design", "Interfaces, responsive systems, wireframes and high-fidelity prototypes."],
              ["02", "Front-end", "HTML, CSS, JavaScript and React experiences with considered motion."],
              ["03", "Visual Direction", "Typography, color, composition and a consistent digital identity."],
              ["04", "Product Thinking", "Clear structure and practical decisions from idea to launch."],
            ].map(([number, title, text], index) => (
              <motion.div className="skill-row" key={title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: index * 0.08, ease }}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <SectionLabel>Contact</SectionLabel>
          <motion.div className="contact-inner" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <p>Have an idea?</p>
            <h2>Let’s build something<br />worth remembering.</h2>
            <a className="contact-button" href="https://github.com/Stoun05" target="_blank" rel="noreferrer">
              View my GitHub <ArrowUpRight />
            </a>
          </motion.div>
          <footer className="site-footer">
            <span>© 2026 NeuralKinetics</span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}