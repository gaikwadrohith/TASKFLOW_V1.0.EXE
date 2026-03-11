import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";

// Apply saved theme on startup before any component renders
const STARTUP_THEMES = {
  MINIMAL: { "--pink": "#f2a8a8", "--pink-light": "#fde8e8", "--pink-dark": "#e07878", "--black": "#0a0a0a", "--white": "#fafafa", dotColor: "#d4a0a0", dotBg: "#fde8e8" },
  DARK:    { "--pink": "#c084fc", "--pink-light": "#1e1e2e", "--pink-dark": "#a855f7", "--black": "#e2e8f0", "--white": "#0f0f1a", dotColor: "#4a4a6a", dotBg: "#0f0f1a" },
  WARM:    { "--pink": "#d4a57a", "--pink-light": "#fdf6ec", "--pink-dark": "#b8845a", "--black": "#2d1f0e", "--white": "#fffaf4", dotColor: "#c9b49a", dotBg: "#fdf6ec" },
  MINT:    { "--pink": "#7ac5a5", "--pink-light": "#edfaf4", "--pink-dark": "#4fa882", "--black": "#0e2d1f", "--white": "#f4fffa", dotColor: "#9ad4bc", dotBg: "#edfaf4" },
  MONO:    { "--pink": "#cccccc", "--pink-light": "#f5f5f5", "--pink-dark": "#999999", "--black": "#000000", "--white": "#ffffff", dotColor: "#cccccc", dotBg: "#f5f5f5" },
};

const themeKey = localStorage.getItem("theme") || "MINT";
const theme = STARTUP_THEMES[themeKey];
if (theme) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, val]) => {
    if (key.startsWith("--")) root.style.setProperty(key, val);
  });
  document.body.style.backgroundImage = `radial-gradient(circle, ${theme.dotColor} 1px, transparent 1px)`;
  document.body.style.backgroundSize = "20px 20px";
  document.body.style.backgroundColor = theme.dotBg;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);