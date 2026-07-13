import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";

const ease = [0.16, 1, 0.3, 1];
const menuItems = [
  ["Baş sahypa", "#top"],
  ["Men barada", "#about"],
  ["Taslamalar", "#projects"],
  ["Başarnyklar", "#skills"],
  ["Habarlaşmak", "#contact"],
];

const projects = [
  {
    number: "01",
    title: "NeuralKinetics",
    type: "React · Motion · Kreatiw programma",
    description: "Adaptasiýa hereketini, kinematografik wideony we takyk responsive tipografiýany birleşdirýän doly ekran tejribesi.",
    year: "2026",
    role: "UI/UX dizaýn we front-end",
    tools: ["React 19", "Vite", "Motion", "CSS"],
    details: [
      "Doly ekran wideo hero we öňe-yza hereket edýän robot eli",
      "Telefon hem-de kompýuter üçin responsive gurluş",
      "Animasiýaly menýu, scroll progress we interaktiw cursor",
    ],
  },
  {
    number: "02",
    title: "Aýbölek Furniture",
    type: "UI/UX · Haryt katalogy · Web",
    description: "Mebelleri düşnükli tapmaga, premium görkezmäge we telefonda amatly seretmäge niýetlenen sanly katalog.",
    year: "2026",
    role: "Önüm dizaýny we web gurluşy",
    tools: ["HTML", "CSS", "JavaScript", "Figma"],
    details: [
      "Kategoriýalar boýunça düşnükli mebel katalogy",
      "Önümleriň aýratyn maglumat sahypalary",
      "Mobil ulanyjylar üçin arassa we ýeňil nawigasiýa",
    ],
  },
  {
    number: "03",
    title: "Horse Portal",
    type: "Web platforma · Katalog · Maglumat",
    description: "Atlary, olaryň jikme-jik profilini we nesil daragtyny düşnükli görnüşde görkezýän gurluşly portal.",
    year: "2026",
    role: "Maglumat gurluşy we front-end",
    tools: ["HTML", "CSS", "JavaScript", "GitHub"],
    details: [
      "Atlaryň suratlary we aýratyn profilleri",
      "Nesil daragty we baglanyşykly maglumat gurluşy",
      "Katalog boýunça gözleg we yzygiderli nawigasiýa",
    ],
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inViewport = true;

    const syncPlayback = () => {
      if (inViewport && !document.hidden && !reduceMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.08 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0.01;
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop
      preload="metadata"
      poster={`${import.meta.env.BASE_URL}hand-poster.webp`}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate"
      aria-label="Öňe-yza hereket edýän robot eli"
    >
      <source
        src={`${import.meta.env.BASE_URL}hand-720.mp4`}
        media="(max-width: 767px)"
        type="video/mp4"
      />
      <source
        src={`${import.meta.env.BASE_URL}hand-1080.mp4`}
        type="video/mp4"
      />
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
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, selectedProject]);

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
              aria-label={menuOpen ? "Menýuny ýap" : "Menýuny aç"}
              aria-expanded={menuOpen}
            >
              <span className="circle white-circle">
                {menuOpen ? <X size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
              </span>
              <span>{menuOpen ? "Ýap" : "Menýu"}</span>
            </motion.button>

            <div className="focus-pill desktop-only">
              <span>Kreatiw Developer</span><i /><span>UI/UX</span>
            </div>
          </div>

          <a className="system-pill" href="#projects" aria-label="Saýlanan taslamalary gör">
            <span className="circle black-circle"><GridIcon /></span>
            <span className="system-label">Saýlanan işler</span>
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
              <p className="menu-kicker">Nawigasiýa</p>
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
                <span>Täze taslamalar üçin açyk</span>
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
                <span className="dot" /><span>Garaşsyz dizaýner we developer</span>
              </motion.div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease }}>
                Dizaýn edýärin. Gurýaryn.<br />Pikirleri hakykata öwürýärin.
              </motion.h1>
              <motion.div className="actions" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1, ease }}>
                <a className="button primary" href="#projects">Taslamalary gör</a>
                <a className="button secondary" href="#about">Men barada</a>
              </motion.div>
            </div>
            <div className="technology-tags">
              {["React", "UI/UX", "Kreatiw kod"].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </motion.div>
        </section>

        <section className="about section" id="about">
          <SectionLabel>Men barada</SectionLabel>
          <motion.div className="about-grid" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease }}>
            <h2>Düşnükli, häsiýetli we maksatly sanly tejribeler.</h2>
            <div className="about-copy">
              <p>Ilkinji pikirleri kämil we responsive sanly önümlere öwürmek üçin dizaýn pikirlenmesini front-end programmaçylygy bilen birleşdirýärin.</p>
              <p>Işim wizual ulgamlardan we prototiplerden başlap, ähli ekranlarda düşnükli işleýän doly web saýtlara çenli dowam edýär.</p>
            </div>
          </motion.div>
        </section>

        <section className="projects section" id="projects">
          <SectionLabel>Saýlanan taslamalar</SectionLabel>
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
                role="button"
                tabIndex={0}
                aria-label={`${project.title} taslamasy barada giňişleýin maglumat`}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedProject(project);
                  }
                }}
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
                  <strong>Giňişleýin gör <ArrowUpRight /></strong>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <SectionLabel>Başarnyklar</SectionLabel>
          <div className="skills-grid">
            {[
              ["01", "UI/UX dizaýn", "Interfeýsler, responsive ulgamlar, wireframe we ýokary hilli prototipler."],
              ["02", "Front-end programmaçylyk", "HTML, CSS, JavaScript we React arkaly oýlanyşykly animasiýaly tejribeler."],
              ["03", "Wizual ugur", "Tipografiýa, reňk, kompozisiýa we bitewi sanly identika."],
              ["04", "Önüm pikirlenmesi", "Pikirden işe goýberilişe çenli düşnükli gurluş we amaly çözgütler."],
            ].map(([number, title, text], index) => (
              <motion.div className="skill-row" key={title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: index * 0.08, ease }}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <SectionLabel>Habarlaşmak</SectionLabel>
          <motion.div className="contact-inner" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <p>Pikiriňiz barmy?</p>
            <h2>Ýatda galjak bir zady<br />bilelikde döredeliň.</h2>
            <a className="contact-button" href="https://github.com/Stoun05" target="_blank" rel="noreferrer">
              GitHub profilimi gör <ArrowUpRight />
            </a>
          </motion.div>
          <footer className="site-footer">
            <span>© 2026 NeuralKinetics</span>
            <a href="#top">Ýokary dolan ↑</a>
          </footer>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="case-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div
              className="case-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.75, ease }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-title"
            >
              <button className="case-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Taslama penjiresini ýap">
                <X size={18} />
              </button>
              <div className="case-number">{selectedProject.number} / 03</div>
              <p className="case-type">{selectedProject.type}</p>
              <h2 id="case-title">{selectedProject.title}</h2>
              <p className="case-description">{selectedProject.description}</p>
              <div className="case-meta">
                <div><span>Ýyl</span><strong>{selectedProject.year}</strong></div>
                <div><span>Meniň işim</span><strong>{selectedProject.role}</strong></div>
              </div>
              <div className="case-tools">
                {selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              <div className="case-details">
                <h3>Esasy ýerine ýetirilen işler</h3>
                {selectedProject.details.map((detail, index) => (
                  <div key={detail}><span>0{index + 1}</span><p>{detail}</p></div>
                ))}
              </div>
              {selectedProject.title === "NeuralKinetics" && (
                <a className="case-link" href="https://stoun05.github.io/my-portfolio/" target="_blank" rel="noreferrer">
                  Saýty aç <ArrowUpRight />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}