import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence, useInView } from "framer-motion";
import Header from "../components/layout/Header";
import { GitHubCalendar } from "react-github-calendar";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaCode,
  FaReact,
  FaNodeJs,
  FaFigma,
  FaArrowRight,
  FaTimes,
  FaDownload,
  FaTrophy,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCamera,
  FaCalendarAlt,
  FaLink,
  FaBolt,
  FaSeedling,
  FaRocket,
  FaHeadphones,
  FaMoon,
  FaMotorcycle,
  FaMugHot,
  FaMobile,
  FaCrosshairs,
  FaGitAlt,
  FaLayerGroup,
  FaFire,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiTailwindcss, SiRedux, SiJavascript, SiLeetcode } from "react-icons/si";

const GITHUB_USER = "gaikwadrohith";
const LEETCODE_USER = "rohittt_gaikwad";

const PHOTOS = [
  { src: "/photo1.png", caption: "VIBES_001.JPG" },
  { src: "/photo2.png", caption: "RIDE_OR_DIE.JPG" },
  { src: "/photo3.png", caption: "GARDEN_MODE.JPG" },
  { src: "/photo4.png", caption: "BUSY_SZN.JPG" },
];

const SKILLS = [
  { icon: <SiJavascript />, label: "JAVASCRIPT", level: 88, color: "#ca8a04" },
  { icon: <FaReact />, label: "REACT.JS", level: 85, color: "#0ea5e9" },
  { icon: <SiRedux />, label: "REDUX", level: 78, color: "#7c3aed" },
  { icon: <SiTailwindcss />, label: "TAILWIND CSS", level: 90, color: "#0d9488" },
  { icon: <FaNodeJs />, label: "NODE.JS", level: 72, color: "#16a34a" },
  { icon: <FaFigma />, label: "FIGMA", level: 70, color: "#e11d48" },
];

const SOCIALS = [
  { icon: <FaGithub />, label: "GITHUB", value: "github.com/gaikwadrohith", href: "https://github.com/gaikwadrohith", color: "#0a0a0a" },
  { icon: <FaLinkedin />, label: "LINKEDIN", value: "in/gaikwad-rohith", href: "https://www.linkedin.com/in/gaikwad-rohith/", color: "#0a66c2" },
  { icon: <FaInstagram />, label: "INSTAGRAM", value: "@rohittt._gaikwad", href: "https://instagram.com/rohittt._gaikwad", color: "#e1306c" },
  { icon: <FaEnvelope />, label: "EMAIL", value: "gaikwadrohith53@gmail.com", href: "mailto:gaikwadrohith53@gmail.com", color: "#dc2626" },
  { icon: <FaPhone />, label: "PHONE", value: "+91 98819 14654", href: "tel:+919881914654", color: "#16a34a" },
];

const TIMELINE = [
  { year: "2022", title: "STARTED_CODING.EXE", desc: "Wrote first line of HTML. Never looked back.", icon: <FaSeedling />, color: "#16a34a" },
  { year: "2023", title: "LEVELED_UP_JS.EXE", desc: "Mastered JavaScript, fell in love with React.", icon: <FaBolt />, color: "#ca8a04" },
  { year: "2024", title: "FULLSTACK_UNLOCKED.EXE", desc: "Built full stack apps with Node, Redux & APIs.", icon: <FaLayerGroup />, color: "#0ea5e9" },
  { year: "2025", title: "SHIPPED_TASKFLOW.EXE", desc: "Launched this very app. The grind continues.", icon: <FaRocket />, color: "#7c3aed" },
];

const ACHIEVEMENTS = [
  { icon: <FaTrophy />, color: "#ca8a04", label: "12+", desc: "PROJECTS" },
  { icon: <FaGitAlt />, color: "#e11d48", label: "400+", desc: "COMMITS" },
  { icon: <FaMugHot />, color: "#92400e", label: "inf", desc: "CHAI CUPS" },
  { icon: <FaCrosshairs />, color: "#0ea5e9", label: "100%", desc: "PIXEL PERF" },
];

const FUN_FACTS = [
  { icon: <FaHeadphones />, color: "#7c3aed", fact: "CODES BETTER WITH LOFI ON" },
  { icon: <FaMoon />, color: "#1e40af", fact: "PEAK PRODUCTIVITY: 2AM" },
  { icon: <FaMotorcycle />, color: "#dc2626", fact: "RIDES WHEN DEBUGGING FAILS" },
  { icon: <FaMugHot />, color: "#92400e", fact: "RUNS ON CHAI NOT COFFEE" },
  { icon: <FaMobile />, color: "#0d9488", fact: "UI CRITIC OF EVERY APP" },
  { icon: <FaCrosshairs />, color: "#16a34a", fact: "PIXEL PERFECT OR NOTHING" },
];

// ── Skill Bar ──────────────────────────────────────────────────────────────
function SkillBar({ skill, i }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Motion.div initial={{ opacity: 0, x: -12 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.09 }}>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2.5">
            <span style={{ color: skill.color, fontSize: "1rem" }}>{skill.icon}</span>
            <span className="text-xs font-bold tracking-widest" style={{ color: "var(--black)" }}>
              {skill.label}
            </span>
          </div>
          <Motion.span
            className="text-xs font-bold tracking-widest px-2 py-0.5 border border-black"
            style={{ color: skill.color, background: "#fafafa", fontSize: "0.55rem" }}
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
          >
            {hovered
              ? `${skill.level}%`
              : Array(Math.floor(skill.level / 10))
                  .fill("\u2593")
                  .join("")}
          </Motion.span>
        </div>
        <div className="w-full border-2 border-black overflow-hidden" style={{ height: "10px", background: "#f0f0f0" }}>
          <Motion.div
            className="h-full relative"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            style={{ background: skill.color }}
          >
            <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg, transparent 70%, rgba(255,255,255,0.6) 100%)" }} />
          </Motion.div>
        </div>
      </Motion.div>
    </div>
  );
}

// ── Real GitHub Calendar (react-github-calendar) ───────────────────────────
function RealGitHubCalendar() {
  return (
    <div className="border-2 border-black" style={{ background: "var(--white)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b-2 border-black" style={{ background: "var(--black)" }}>
        <div className="flex items-center gap-2">
          <FaGithub style={{ color: "var(--pink)", fontSize: "0.9rem" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "var(--pink)" }}>
            {GITHUB_USER} — CONTRIBUTIONS
          </span>
        </div>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt style={{ color: "#555", fontSize: "0.6rem" }} />
        </a>
      </div>
      <div className="p-5">
        <GitHubCalendar
          username={GITHUB_USER}
          colorScheme="light"
          theme={{
            light: ["#f0f0f0", "#fde8e8", "#f2a8a8", "#e07878", "#c04040"],
          }}
          fontSize={11}
          blockSize={13}
          blockMargin={4}
        />
      </div>
    </div>
  );
}

// ── LeetCode — real stats via proxy + LeetCard heatmap image ──────────────
function RealLeetCodeCalendar() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`)
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const solved = stats?.totalSolved ?? "—";
  const easy = stats?.easySolved ?? 0;
  const medium = stats?.mediumSolved ?? 0;
  const hard = stats?.hardSolved ?? 0;
  const total = stats?.totalSolved ?? 1;
  const streak = stats?.streak ?? "—";

  const DIFFICULTY = [
    { label: "EASY", count: easy, color: "#4ade80" },
    { label: "MEDIUM", count: medium, color: "#ffa116" },
    { label: "HARD", count: hard, color: "#ef4444" },
  ];

  return (
    <div className="border-2 border-black overflow-hidden" style={{ background: "#0d1117" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <SiLeetcode style={{ color: "#ffa116", fontSize: "0.9rem" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "#ffa116" }}>
            {LEETCODE_USER} — ACTIVITY
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!loading && (
            <span className="text-xs tracking-widest" style={{ color: "#444", fontSize: "0.52rem" }}>
              {solved} PROBLEMS SOLVED
            </span>
          )}
          <a href={`https://leetcode.com/${LEETCODE_USER}`} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt style={{ color: "#444", fontSize: "0.6rem" }} />
          </a>
        </div>
      </div>

      <div className="p-5 flex gap-8">
        {/* Left — heatmap image from LeetCard */}
        <div className="flex-1 min-w-0">
          <p className="text-xs tracking-widest mb-3" style={{ color: "#444", fontSize: "0.5rem" }}>
            SUBMISSION HEATMAP
          </p>
          <img
            src={`https://leetcard.jacoblin.cool/${LEETCODE_USER}?theme=dark&font=IBM%20Plex%20Mono&ext=heatmap&hide=ranking`}
            alt="LeetCode Stats"
            style={{ width: "100%", border: "1px solid #222", background: "#0d1117" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Right — real stats */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-36">
          {/* Solved */}
          <div className="border border-gray-800 p-3 text-center" style={{ background: "#161b22" }}>
            {loading ? (
              <Motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-xs tracking-widest" style={{ color: "#444" }}>
                LOADING...
              </Motion.div>
            ) : (
              <>
                <p className="text-3xl font-black" style={{ color: "#ffa116", letterSpacing: "-0.04em" }}>
                  {solved}
                </p>
                <p className="text-xs tracking-widest mt-0.5" style={{ color: "#555", fontSize: "0.48rem" }}>
                  SOLVED
                </p>
              </>
            )}
          </div>

          {/* Difficulty bars */}
          {DIFFICULTY.map((d) => (
            <div key={d.label}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-bold" style={{ color: d.color, fontSize: "0.5rem" }}>
                  {d.label}
                </span>
                <span className="text-xs font-bold" style={{ color: d.color, fontSize: "0.5rem" }}>
                  {loading ? "—" : d.count}
                </span>
              </div>
              <div className="w-full h-1.5" style={{ background: "#161b22" }}>
                {!loading && (
                  <Motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.count / total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-full"
                    style={{ background: d.color }}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Streak */}
          <div className="border border-gray-800 p-3 text-center" style={{ background: "#161b22" }}>
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <FaFire style={{ color: "#ffa116", fontSize: "0.75rem" }} />
              <p className="text-2xl font-black" style={{ color: "#ffa116", letterSpacing: "-0.04em" }}>
                {loading ? "—" : streak}
              </p>
            </div>
            <p className="text-xs tracking-widest" style={{ color: "#444", fontSize: "0.45rem" }}>
              DAY STREAK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Side Panels ────────────────────────────────────────────────────────────
function AboutSidePanels() {
  return (
    <>
      {/* LEFT */}
      <div className="hidden xl:flex flex-col gap-4 w-48 flex-shrink-0 pt-10" style={{ fontFamily: "var(--font)" }}>
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--black)" }}>
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-700">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs ml-1" style={{ color: "#555", fontSize: "0.48rem" }}>
              TERMINAL — bash
            </span>
          </div>
          <div className="p-3">
            {["$ whoami", "> rohit_gaikwad", "$ cat skills.txt", "> react | node | css", "$ git log --oneline", "> 400 commits", "$ echo $STATUS", "> AVAILABLE"].map((line, i) => (
              <Motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.18 }}
                className="text-xs leading-relaxed"
                style={{ color: line.startsWith("$") ? "var(--pink)" : "#86efac", fontFamily: "var(--font)", fontSize: "0.52rem" }}
              >
                {line}
              </Motion.p>
            ))}
            <Motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ color: "var(--pink)", fontSize: "0.52rem" }} className="text-xs">
              |
            </Motion.span>
          </div>
        </div>

        <div className="border-2 border-black" style={{ background: "var(--white)" }}>
          <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            WHO_AM_I
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt style={{ color: "#dc2626", fontSize: "0.7rem", flexShrink: 0 }} />
              <span className="text-xs font-bold tracking-widest" style={{ fontSize: "0.55rem", color: "var(--black)" }}>
                INDIA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase style={{ color: "#2563eb", fontSize: "0.7rem", flexShrink: 0 }} />
              <span className="text-xs font-bold tracking-widest" style={{ fontSize: "0.55rem", color: "var(--black)" }}>
                FULLSTACK_DEV
              </span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="text-xs font-bold" style={{ color: "#16a34a", fontSize: "0.55rem" }}>
                OPEN TO WORK
              </span>
            </div>
          </div>
        </div>

        <div className="border-2 border-black" style={{ background: "var(--white)" }}>
          <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            TECH_STACK
          </div>
          <div className="p-3 flex flex-wrap gap-1">
            {["JS", "TS", "REACT", "REDUX", "NODE", "CSS", "GIT", "FIGMA", "REST", "API"].map((t) => (
              <span key={t} className="border border-black px-1.5 py-0.5 text-xs font-bold" style={{ background: "var(--pink-light)", fontSize: "0.48rem", color: "var(--black)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="border-2 border-black" style={{ background: "var(--white)" }}>
          <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            VIBE_CHECK
          </div>
          <div className="p-3">
            {[
              { label: "UI TASTE", val: 95, color: "#0ea5e9" },
              { label: "WORK ETHIC", val: 90, color: "#16a34a" },
              { label: "COFFEE DEP", val: 100, color: "#ca8a04" },
              { label: "CREATIVITY", val: 87, color: "#7c3aed" },
            ].map(({ label, val, color }) => (
              <div key={label} className="mb-2.5">
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>
                    {label}
                  </span>
                  <span className="text-xs font-bold" style={{ fontSize: "0.5rem", color }}>
                    {val}%
                  </span>
                </div>
                <div className="w-full h-1.5 border border-black" style={{ background: "#f0f0f0" }}>
                  <div className="h-full" style={{ width: `${val}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden xl:flex flex-col gap-4 w-48 flex-shrink-0 pt-10" style={{ fontFamily: "var(--font)" }}>
        <div className="border-2 border-black overflow-hidden" style={{ background: "#1e1e2e" }}>
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
            <span className="text-xs tracking-widest" style={{ color: "#aaa", fontSize: "0.48rem" }}>
              rohit.config.js
            </span>
            <span className="text-xs" style={{ color: "#4ade80", fontSize: "0.48rem" }}>
              JS
            </span>
          </div>
          <div className="p-3">
            <pre className="text-xs leading-relaxed" style={{ fontSize: "0.5rem" }}>
              <span style={{ color: "#89b4fa" }}>{"const "}</span>
              <span style={{ color: "#cdd6f4" }}>{"rohit = {"}</span>
              {"\n"}
              <span style={{ color: "#a6e3a1" }}>{"  role"}</span>
              <span style={{ color: "#cdd6f4" }}>{": "}</span>
              <span style={{ color: "#f38ba8" }}>{'"dev",'}</span>
              {"\n"}
              <span style={{ color: "#a6e3a1" }}>{"  passion"}</span>
              <span style={{ color: "#cdd6f4" }}>{": "}</span>
              <span style={{ color: "#f38ba8" }}>{'"UI/UX",'}</span>
              {"\n"}
              <span style={{ color: "#a6e3a1" }}>{"  coffee"}</span>
              <span style={{ color: "#cdd6f4" }}>{": "}</span>
              <span style={{ color: "#fab387" }}>{"true,"}</span>
              {"\n"}
              <span style={{ color: "#a6e3a1" }}>{"  grind"}</span>
              <span style={{ color: "#cdd6f4" }}>{": "}</span>
              <span style={{ color: "#fab387" }}>{"Infinity"}</span>
              {"\n"}
              <span style={{ color: "#cdd6f4" }}>{"}"}</span>
            </pre>
          </div>
        </div>

        <div className="border-2 border-black" style={{ background: "var(--white)" }}>
          <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            ACHIEVEMENTS
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            {ACHIEVEMENTS.map((a, i) => (
              <Motion.div
                key={a.desc}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="border-2 border-black p-2 text-center"
                style={{ background: "#fafafa" }}
              >
                <span style={{ color: a.color, fontSize: "1rem", display: "block", marginBottom: "4px" }}>{a.icon}</span>
                <p className="text-lg font-bold leading-none" style={{ color: "var(--black)", letterSpacing: "-0.04em" }}>
                  {a.label}
                </p>
                <p className="text-xs tracking-widest mt-0.5" style={{ color: "var(--gray)", fontSize: "0.45rem" }}>
                  {a.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>

        <Motion.a
          href="mailto:gaikwadrohith53@gmail.com"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border-2 border-black p-4 flex flex-col items-center gap-2 hover:bg-black hover:text-white transition group"
          style={{ background: "var(--pink)", textDecoration: "none", color: "inherit" }}
        >
          <FaTrophy style={{ fontSize: "1.2rem" }} />
          <span className="text-xs font-bold tracking-widest text-center" style={{ fontSize: "0.6rem" }}>
            AVAILABLE FOR INTERNSHIP
          </span>
          <div className="flex items-center gap-1 text-xs font-bold tracking-widest" style={{ fontSize: "0.55rem" }}>
            HIRE_ME.EXE <FaArrowRight style={{ fontSize: "0.5rem" }} />
          </div>
        </Motion.a>

        <div className="border-2 border-black" style={{ background: "var(--white)" }}>
          <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            FUN_FACTS
          </div>
          <div className="p-3 flex flex-col gap-2">
            {FUN_FACTS.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 border border-black flex items-center justify-center flex-shrink-0" style={{ color: f.color, fontSize: "0.6rem", background: "var(--white)" }}>
                  {f.icon}
                </span>
                <span className="text-xs tracking-widest" style={{ color: "var(--black)", fontSize: "0.48rem" }}>
                  {f.fact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function About({ setAuth }) {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font)" }}>
      <Header setAuth={setAuth} />

      <div className="flex-1 flex gap-6 w-full max-w-7xl mx-auto px-6 pb-20">
        <AboutSidePanels />

        <div className="flex-1 mt-8 min-w-0">
          <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest mb-3" style={{ color: "var(--gray)" }}>
            // TASKFLOW / ABOUT_DEV
          </Motion.p>

          {/* ROW 1 — Hero + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            <Motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 border-2 border-black overflow-hidden flex flex-col"
              style={{ background: "var(--white)" }}
            >
              <div className="flex items-center justify-between px-5 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
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
              <div className="flex flex-1">
                <div className="w-44 flex-shrink-0 border-r-2 border-black relative" style={{ minHeight: "260px" }}>
                  <img src={PHOTOS[0].src} alt="Rohit" className="w-full h-full object-cover object-top" style={{ minHeight: "260px", display: "block", filter: "contrast(1.05) saturate(1.1)" }} />
                  <div className="absolute bottom-2 left-2 border-2 border-black px-1.5 py-0.5" style={{ background: "var(--pink)" }}>
                    <span className="text-xs font-bold tracking-widest" style={{ fontSize: "0.48rem" }}>
                      ROHIT_GAIKWAD.JPG
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h1 className="text-5xl font-black leading-none" style={{ fontStyle: "italic", letterSpacing: "-0.05em", color: "var(--black)" }}>
                      ROHIT
                    </h1>
                    <h1 className="text-5xl font-black leading-none mb-3" style={{ fontStyle: "italic", letterSpacing: "-0.05em", color: "var(--black)" }}>
                      GAIKWAD
                    </h1>
                    <div className="flex gap-1.5 mb-3">
                      <span className="border-2 border-black px-2 py-0.5 text-xs font-bold tracking-widest" style={{ background: "var(--pink)", fontSize: "0.55rem" }}>
                        FULLSTACK_DEV
                      </span>
                      <span className="border-2 border-black px-2 py-0.5 text-xs font-bold tracking-widest" style={{ background: "var(--white)", fontSize: "0.55rem" }}>
                        REACT_SPECIALIST
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--gray)", lineHeight: 1.8, fontSize: "0.62rem" }}>
                      not ur average dev — caffeine + chaos = clean UIs and working APIs. react is my personality. if it ain't got good UI it ain't it fr fr
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap pt-3">
                    <a
                      href="mailto:gaikwadrohith53@gmail.com"
                      className="inline-flex items-center gap-1.5 border-2 border-black px-3 py-1.5 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
                      style={{ background: "var(--pink)", fontSize: "0.58rem" }}
                    >
                      HIRE_ME.EXE <FaArrowRight style={{ fontSize: "0.5rem" }} />
                    </a>
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center gap-1.5 border-2 border-black px-3 py-1.5 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
                      style={{ background: "var(--white)", fontSize: "0.58rem" }}
                    >
                      <FaDownload style={{ fontSize: "0.5rem" }} /> RESUME.PDF
                    </a>
                  </div>
                </div>
              </div>
            </Motion.div>

            <Motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <Motion.div
                  key={a.desc}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex-1 border-2 border-black flex items-center gap-3 px-4 py-3"
                  style={{ background: "var(--white)" }}
                >
                  <span style={{ color: a.color, fontSize: "1.3rem" }}>{a.icon}</span>
                  <div>
                    <p className="text-2xl font-black leading-none" style={{ color: "var(--black)", letterSpacing: "-0.04em" }}>
                      {a.label}
                    </p>
                    <p className="text-xs tracking-widest" style={{ color: "var(--gray)", fontSize: "0.48rem" }}>
                      {a.desc}
                    </p>
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </div>

          {/* ROW 2 — Skills + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
              <div className="flex items-center justify-between px-5 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-black flex items-center justify-center" style={{ background: "var(--white)", fontSize: "0.6rem" }}>
                    <FaCode />
                  </span>
                  <span className="text-xs font-bold tracking-widest">SKILLS.JSON</span>
                </div>
                <span className="text-xs tracking-widest" style={{ fontSize: "0.52rem", color: "var(--black)" }}>
                  HOVER FOR %
                </span>
              </div>
              <div className="p-5 flex flex-col gap-4">
                {SKILLS.map((skill, i) => (
                  <SkillBar key={skill.label} skill={skill} i={i} />
                ))}
              </div>
            </Motion.div>

            <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
              <div className="flex items-center gap-2 px-5 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <span className="w-5 h-5 border-2 border-black flex items-center justify-center" style={{ background: "var(--white)", fontSize: "0.6rem" }}>
                  <FaCalendarAlt />
                </span>
                <span className="text-xs font-bold tracking-widest">JOURNEY.LOG</span>
              </div>
              <div className="p-5">
                {TIMELINE.map((item, i) => (
                  <Motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.09 }} className="flex gap-4 mb-5 last:mb-0">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="border-2 border-black px-2 py-1.5 flex items-center gap-1.5" style={{ background: "var(--pink)", minWidth: "66px" }}>
                        <span style={{ color: item.color, fontSize: "0.6rem" }}>{item.icon}</span>
                        <span className="text-xs font-bold" style={{ fontSize: "0.58rem", color: "var(--black)" }}>
                          {item.year}
                        </span>
                      </div>
                      {i < TIMELINE.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ background: "var(--black)", minHeight: "24px" }} />}
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                      <p className="text-xs font-bold tracking-widest mb-1" style={{ color: "var(--black)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--gray)", fontSize: "0.6rem" }}>
                        {item.desc}
                      </p>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          </div>

          {/* ROW 3 — Real GitHub Calendar */}
          <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-3">
            <RealGitHubCalendar />
          </Motion.div>

          {/* ROW 4 — Real LeetCode */}
          <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-3">
            <RealLeetCodeCalendar />
          </Motion.div>

          {/* ROW 5 — Gallery */}
          <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="border-2 border-black mb-3" style={{ background: "var(--white)" }}>
            <div className="flex items-center gap-2 px-5 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
              <span className="w-5 h-5 border-2 border-black flex items-center justify-center" style={{ background: "var(--white)", fontSize: "0.6rem" }}>
                <FaCamera />
              </span>
              <span className="text-xs font-bold tracking-widest">GALLERY.EXE</span>
              <span className="ml-auto text-xs tracking-widest" style={{ fontSize: "0.52rem", color: "var(--black)" }}>
                CLICK TO EXPAND
              </span>
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {PHOTOS.map((photo, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.38 + i * 0.07 }}
                  onClick={() => setActivePhoto(photo)}
                  className="border-2 border-black overflow-hidden cursor-pointer group flex flex-col"
                >
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="px-3 py-1.5 border-t-2 border-black flex items-center gap-1.5" style={{ background: "var(--pink-light)" }}>
                    <FaCamera style={{ fontSize: "0.55rem", flexShrink: 0 }} />
                    <p className="text-xs font-bold tracking-widest truncate" style={{ fontSize: "0.55rem" }}>
                      {photo.caption}
                    </p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>

          {/* ROW 6 — Socials + Fun Facts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
              <div className="flex items-center gap-2 px-5 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <span className="w-5 h-5 border-2 border-black flex items-center justify-center" style={{ background: "var(--white)", fontSize: "0.6rem" }}>
                  <FaLink />
                </span>
                <span className="text-xs font-bold tracking-widest">CONNECT.EXE</span>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {SOCIALS.map((s, i) => (
                  <Motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42 + i * 0.06 }}
                    className="flex items-center gap-3 border-2 border-black px-4 py-2.5 hover:bg-black hover:text-white transition group"
                    style={{ background: "var(--white)", textDecoration: "none", color: "inherit" }}
                  >
                    <span
                      className="w-7 h-7 border-2 border-black flex items-center justify-center flex-shrink-0 group-hover:border-white transition"
                      style={{ color: s.color, background: "var(--white)", fontSize: "0.8rem" }}
                    >
                      {s.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold tracking-widest" style={{ fontSize: "0.58rem" }}>
                        {s.label}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--gray)", fontSize: "0.52rem" }}>
                        {s.value}
                      </p>
                    </div>
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all" style={{ fontSize: "0.5rem" }} />
                  </Motion.a>
                ))}
              </div>
            </Motion.div>

            <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
              <div className="flex items-center gap-2 px-5 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <span className="w-5 h-5 border-2 border-black flex items-center justify-center" style={{ background: "var(--white)", fontSize: "0.6rem" }}>
                  <FaBolt />
                </span>
                <span className="text-xs font-bold tracking-widest">FUN_FACTS.TXT</span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {FUN_FACTS.map((f, i) => (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.47 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 border-2 border-black px-4 py-2.5 cursor-default"
                    style={{ background: "#fafafa" }}
                  >
                    <span className="w-7 h-7 border-2 border-black flex items-center justify-center flex-shrink-0" style={{ color: f.color, fontSize: "0.7rem", background: "var(--white)" }}>
                      {f.icon}
                    </span>
                    <span className="text-xs font-bold tracking-widest" style={{ color: "var(--black)", fontSize: "0.6rem" }}>
                      {f.fact}
                    </span>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.9)" }}
            onClick={() => setActivePhoto(null)}
          >
            <Motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative border-2 border-white max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <div className="flex items-center gap-2">
                  <FaCamera style={{ fontSize: "0.7rem" }} />
                  <span className="text-xs font-bold tracking-widest">{activePhoto.caption}</span>
                </div>
                <button onClick={() => setActivePhoto(null)} className="w-6 h-6 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition">
                  <FaTimes style={{ fontSize: "0.6rem" }} />
                </button>
              </div>
              <img src={activePhoto.src} alt={activePhoto.caption} className="w-full object-cover object-top" style={{ maxHeight: "78vh" }} />
              <div className="px-4 py-2" style={{ background: "var(--black)" }}>
                <span className="text-xs tracking-widest" style={{ color: "var(--pink)", fontSize: "0.55rem" }}>
                  CLICK OUTSIDE TO CLOSE
                </span>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
