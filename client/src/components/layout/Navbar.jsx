import { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { theme, toggleTheme, forceTheme } = useContext(ThemeContext);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    forceTheme("dark");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-indigo-600 dark:bg-slate-900 text-white px-3 md:px-6 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-xl px-2 py-1 rounded hover:bg-white/10"
        >
          ☰
        </button>

        {/* App Name */}
        <h1 className="text-lg md:text-2xl font-bold tracking-wide">
          Suhana Safar
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <span className="hidden sm:block text-sm bg-white/10 px-3 py-1 rounded-lg">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </span>

        <button
          onClick={toggleTheme}
          className="px-2 py-1 md:px-4 md:py-2 text-sm rounded-lg bg-purple-900 dark:bg-slate-700 hover:bg-purple-950 dark:hover:bg-slate-600 transition"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={handleLogout}
          className="px-2 py-1 md:px-4 md:py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;