import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Header from "../components/layout/Header";
import {
  FaGithub, FaLinkedin, FaInstagram, FaEnvelope,
  FaPhone, FaCode, FaReact, FaNodeJs, FaFigma,
  FaArrowRight, FaDownload, FaTimes
} from "react-icons/fa";
import {
  SiTailwindcss, SiRedux, SiJavascript
} from "react-icons/si";

// ── Photos — move these 4 files into your /public folder ──────────────────────
// photo1.png, photo2.png, photo3.png, photo4.png
const PHOTOS = [
  { src: "/photo1.png", caption: "VIBES_001.JPG" },
  { src: "/photo2.png", caption: "RIDE_OR_DIE.JPG" },
  { src: "/photo3.png", caption: "GARDEN_MODE.JPG" },
  { src: "/photo4.png", caption: "BUSY_SZN.JPG" },
];

const SKILLS = [
  { icon: <SiJavascript />,  label: "JAVASCRIPT",  level: 88, color: "#ca8a04" },
  { icon: <FaReact />,       label: "REACT.JS",     level: 85, color: "#0ea5e9" },
  { icon: <SiRedux />,       label: "REDUX",        level: 78, color: "#7c3aed" },
  { icon: <SiTailwindcss />, label: "TAILWIND CSS", level: 90, color: "#0d9488" },
  { icon: <FaNodeJs />,      label: "NODE.JS",      level: 72, color: "#16a34a" },
  { icon: <FaFigma />,       label: "FIGMA",        level: 70, color: "#e11d48" },
];

const SOCIALS = [
  { icon: <FaGithub />,    label: "GITHUB",    value: "github.com/gaikwadrohith",       href: "https://github.com/gaikwadrohith",              color: "#0a0a0a" },
  { icon: <FaLinkedin />,  label: "LINKEDIN",  value: "in/gaikwad-rohith",              href: "https://www.linkedin.com/in/gaikwad-rohith/",   color: "#0a66c2" },
  { icon: <FaInstagram />, label: "INSTAGRAM", value: "@rohittt._gaikwad",              href: "https://instagram.com/rohittt._gaikwad",        color: "#e1306c" },
  { icon: <FaEnvelope />,  label: "EMAIL",     value: "gaikwadrohith53@gmail.com",      href: "mailto:gaikwadrohith53@gmail.com",              color: "#dc2626" },
  { icon: <FaPhone />,     label: "PHONE",     value: "+91 98819 14654",                href: "tel:+919881914654",                              color: "#16a34a" },
];

const TIMELINE = [
  { year: "2022", title: "STARTED_CODING.EXE",    desc: "Wrote first line of HTML. Never looked back." },
  { year: "2023", title: "LEVELED_UP_JS.EXE",     desc: "Mastered JavaScript, fell in love with React." },
  { year: "2024", title: "FULLSTACK_UNLOCKED.EXE",desc: "Built full stack apps with Node, Redux & APIs." },
  { year: "2025", title: "SHIPPED_TASKFLOW.EXE",  desc: "Launched this very app. The grind continues." },
];

export default function About({ setAuth }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font)" }}>
      <Header setAuth={setAuth} />

      <div className="flex-1 w-full max-w-3xl mx-auto px-5 mt-8 pb-20">

        {/* ── Breadcrumb ── */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-widest mb-2"
          style={{ color: "var(--gray)" }}
        >
          // TASKFLOW / ABOUT_DEV
        </Motion.p>

        {/* ── Hero Card ── */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-black mb-4 overflow-hidden"
          style={{ background: "var(--white)" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-5 py-2 border-b-2 border-black"
            style={{ background: "var(--pink)" }}
          >
            <div className="flex items-center gap-2">
              <FaCode className="text-xs" />
              <span className="text-xs font-bold tracking-widest">DEVELOPER_PROFILE.EXE</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
              <span className="w-3 h-3 rounded-full bg-green-400 border border-black" />
              <span className="w-3 h-3 rounded-full bg-red-400 border border-black" />
            </div>
          </div>

          {/* Hero content */}
          <div className="flex flex-col md:flex-row gap-0">

            {/* Photo */}
            <div className="md:w-52 flex-shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden">
              <img
                src={PHOTOS[0].src}
                alt="Rohit Gaikwad"
                className="w-full h-64 md:h-full object-cover object-top"
                style={{ filter: "contrast(1.05) saturate(1.1)" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h1
                    className="text-4xl font-bold"
                    style={{ fontStyle: "italic", letterSpacing: "-0.03em" }}
                  >
                    ROHIT
                  </h1>
                  <h1
                    className="text-4xl font-bold"
                    style={{ fontStyle: "italic", letterSpacing: "-0.03em" }}
                  >
                    GAIKWAD
                  </h1>
                </div>
                <div
                  className="border-2 border-black px-2 py-1 text-xs font-bold tracking-widest"
                  style={{ background: "var(--pink)" }}
                >
                  FULLSTACK_DEV
                </div>
              </div>

              {/* Gen Z bio */}
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--gray)" }}>
                not ur average dev 🧑‍💻 — i turn caffeine + chaos into clean UIs and
                working APIs. obsessed with building things that actually slap.
                react is my personality. currently shipping, always learning, never
                stopping. if it ain't got good UI it ain't it fr fr 🚀
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "PROJECTS", value: "12+" },
                  { label: "COMMITS",  value: "400+" },
                  { label: "CUPS_☕",  value: "∞" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="border-2 border-black p-2 text-center"
                    style={{ background: "#fafafa" }}
                  >
                    <p className="text-xl font-bold" style={{ letterSpacing: "-0.03em" }}>{s.value}</p>
                    <p className="text-xs tracking-widest" style={{ color: "var(--gray)", fontSize: "0.55rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="mailto:gaikwadrohith53@gmail.com"
                className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition group"
                style={{ background: "var(--pink)" }}
              >
                HIRE_ME.EXE
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </Motion.div>

        {/* ── Skills ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="border-2 border-black mb-4"
          style={{ background: "var(--white)" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-2 border-b-2 border-black"
            style={{ background: "var(--pink)" }}
          >
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs"
              style={{ background: "var(--white)" }}>
              <FaCode />
            </span>
            <span className="text-xs font-bold tracking-widest">SKILLS.JSON</span>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILLS.map((skill, i) => (
                <Motion.div
                  key={skill.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  onMouseEnter={() => setHoveredSkill(skill.label)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span style={{ color: skill.color, fontSize: "0.85rem" }}>{skill.icon}</span>
                      <span className="text-xs font-bold tracking-widest">{skill.label}</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest" style={{ color: skill.color }}>
                      {hoveredSkill === skill.label ? `${skill.level}%` : "▓".repeat(Math.floor(skill.level / 10))}
                    </span>
                  </div>
                  <div className="w-full h-2 border border-black" style={{ background: "#f0f0f0" }}>
                    <Motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }}
                      className="h-full transition-all"
                      style={{ background: skill.color }}
                    />
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* ── Photo Gallery ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="border-2 border-black mb-4"
          style={{ background: "var(--white)" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-2 border-b-2 border-black"
            style={{ background: "var(--pink)" }}
          >
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs"
              style={{ background: "var(--white)" }}>📸</span>
            <span className="text-xs font-bold tracking-widest">GALLERY.EXE</span>
            <span className="ml-auto text-xs tracking-widest" style={{ color: "var(--gray)" }}>
              CLICK TO EXPAND
            </span>
          </div>

          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {PHOTOS.map((photo, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                onClick={() => setActivePhoto(photo)}
                className="border-2 border-black overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-2 py-1 border-t border-black"
                  style={{ background: "var(--white)" }}
                >
                  <p className="text-xs tracking-widest truncate" style={{ fontSize: "0.55rem" }}>
                    {photo.caption}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* ── Timeline ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border-2 border-black mb-4"
          style={{ background: "var(--white)" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-2 border-b-2 border-black"
            style={{ background: "var(--pink)" }}
          >
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs"
              style={{ background: "var(--white)" }}>📅</span>
            <span className="text-xs font-bold tracking-widest">JOURNEY.LOG</span>
          </div>

          <div className="p-5">
            {TIMELINE.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex gap-4 mb-4 last:mb-0"
              >
                {/* Year */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="border-2 border-black px-2 py-1 text-xs font-bold tracking-widest"
                    style={{ background: "var(--pink)", minWidth: "52px", textAlign: "center" }}
                  >
                    {item.year}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-0.5 flex-1 mt-1" style={{ background: "var(--black)", minHeight: "24px" }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-4">
                  <p className="text-xs font-bold tracking-widest mb-1">{item.title}</p>
                  <p className="text-xs" style={{ color: "var(--gray)" }}>{item.desc}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* ── Socials ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-2 border-black mb-4"
          style={{ background: "var(--white)" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-2 border-b-2 border-black"
            style={{ background: "var(--pink)" }}
          >
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs"
              style={{ background: "var(--white)" }}>🔗</span>
            <span className="text-xs font-bold tracking-widest">CONNECT.EXE</span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {SOCIALS.map((s, i) => (
              <Motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                className="flex items-center gap-3 border-2 border-black px-4 py-3 hover:bg-black hover:text-white transition group"
                style={{ background: "#fafafa", textDecoration: "none", color: "inherit" }}
              >
                <span
                  className="w-7 h-7 border-2 border-black flex items-center justify-center flex-shrink-0 text-xs group-hover:border-white transition"
                  style={{ color: s.color, background: "var(--white)" }}
                >
                  {s.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold tracking-widest">{s.label}</p>
                  <p className="text-xs truncate" style={{ color: "var(--gray)" }}>{s.value}</p>
                </div>
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition" />
              </Motion.a>
            ))}
          </div>
        </Motion.div>

        {/* ── Fun Facts ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="border-2 border-black"
          style={{ background: "var(--white)" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-2 border-b-2 border-black"
            style={{ background: "var(--pink)" }}
          >
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs"
              style={{ background: "var(--white)" }}>⚡</span>
            <span className="text-xs font-bold tracking-widest">FUN_FACTS.TXT</span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { emoji: "🎧", fact: "CODES BETTER WITH LOFI ON" },
              { emoji: "🌙", fact: "PEAK PRODUCTIVITY: 2AM" },
              { emoji: "🏍️", fact: "RIDES WHEN DEBUGGING FAILS" },
              { emoji: "☕", fact: "RUNS ON CHAI NOT COFFEE" },
              { emoji: "📱", fact: "UI CRITIC OF EVERY APP HE USES" },
              { emoji: "🎯", fact: "PIXEL PERFECT OR NOTHING" },
            ].map((f, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3 border border-black px-3 py-2"
                style={{ background: "#fafafa" }}
              >
                <span className="text-base">{f.emoji}</span>
                <span className="text-xs font-bold tracking-widest">{f.fact}</span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activePhoto && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setActivePhoto(null)}
          >
            <Motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              className="relative border-2 border-white max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox title bar */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-white"
                style={{ background: "var(--pink)" }}>
                <span className="text-xs font-bold tracking-widest">{activePhoto.caption}</span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                className="w-full object-cover"
                style={{ maxHeight: "70vh", objectPosition: "top" }}
              />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className="w-full border-t-2 border-black px-5 py-2 flex justify-between"
        style={{ background: "var(--black)", fontFamily: "var(--font)" }}
      >
        <span className="text-xs tracking-widest" style={{ color: "var(--pink)" }}>
          ROHIT_GAIKWAD.DEV
        </span>
        <span className="text-xs tracking-widest" style={{ color: "#555" }}>
          © {new Date().getFullYear()} TASKFLOW_SYSTEMS
        </span>
      </footer>
    </div>
  );
}
