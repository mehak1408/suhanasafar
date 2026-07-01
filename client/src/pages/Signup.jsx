import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router";
import API from "../services/api";
import toast from "react-hot-toast";
import { ThemeContext } from "../components/context/ThemeContext";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 1.5 + Math.random() * 2,
}));

function Signup() {
  const navigate = useNavigate();
  const { forceTheme, restoreTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    forceTheme("dark");
    return () => restoreTheme();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/register", formData);
      toast.success(res.data.message || "Signup successful");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Twinkling stars */}
      {STARS.map((star) => (
        <div
          key={star.id}
          style={{
            ...styles.star,
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Moon */}
      <div style={styles.moon}>
        <div style={styles.moonShadow} />
      </div>

      {/* Road */}
      <div style={styles.road}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ ...styles.roadLine, animationDelay: `${-i * 0.3}s` }} />
        ))}
      </div>

      {/* Animated Bus */}
      <div style={styles.busWrap}>
        <div style={styles.busTop}>
          <div style={{ ...styles.busWindow, left: 8 }} />
          <div style={{ ...styles.busWindow, left: 40 }} />
          <div style={{ ...styles.busWindow, left: 72 }} />
        </div>
        <div style={styles.busBody} />
        <div style={styles.busFront}>
          <div style={styles.busWindshield} />
          <div style={styles.busLight} />
        </div>
        <div style={styles.exhaust} />
        <div style={{ ...styles.wheel, left: 22 }} />
        <div style={{ ...styles.wheel, left: 130 }} />
      </div>

      {/* Signup Card */}
      <div style={styles.card}>

        <div style={styles.brand}>
          <div style={styles.brandName}>Suhana Safar</div>
          <div style={styles.brandTag}>Comfort to your journey</div>
        </div>

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Sign up to start your journey</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full name</label>
            <input
              type="text"
              name="name"
              placeholder="Nandini Goel"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.signupBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/" style={styles.loginLink}>Login</Link>
        </p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes busDrive {
          from { left: -220px; }
          to { left: 110%; }
        }
        @keyframes roadLines {
          from { transform: translateX(0); }
          to { transform: translateX(-25vw); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes puff {
          0% { opacity: 0.8; transform: scale(1) translateX(0); }
          100% { opacity: 0; transform: scale(3) translateX(-20px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
    fontFamily: "sans-serif",
  },
  star: {
    position: "absolute",
    background: "white",
    borderRadius: "50%",
    animation: "twinkle ease-in-out infinite",
  },
  moon: {
    position: "absolute",
    top: 40,
    right: 80,
    width: 40,
    height: 40,
    background: "#fef9c3",
    borderRadius: "50%",
    overflow: "hidden",
  },
  moonShadow: {
    position: "absolute",
    top: -4,
    right: -8,
    width: 36,
    height: 36,
    background: "#0a0a1a",
    borderRadius: "50%",
  },
  road: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    background: "#1a1a2e",
    borderTop: "2px solid #2a2a4a",
    overflow: "hidden",
  },
  roadLine: {
    position: "absolute",
    bottom: 30,
    height: 4,
    width: 60,
    background: "#f59e0b",
    borderRadius: 2,
    animation: "roadLines 1.2s linear infinite",
    left: "25%",
  },
  busWrap: {
    position: "absolute",
    bottom: 55,
    width: 200,
    height: 90,
    animation: "busDrive 8s linear infinite",
  },
  busTop: {
    position: "absolute",
    bottom: 50,
    left: 30,
    right: 10,
    height: 28,
    background: "#6d28d9",
    borderRadius: "6px 10px 0 0",
  },
  busWindow: {
    position: "absolute",
    top: 6,
    height: 16,
    width: 24,
    background: "#93c5fd",
    borderRadius: 3,
  },
  busBody: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 0,
    height: 72,
    background: "#7c3aed",
    borderRadius: "8px 16px 4px 4px",
  },
  busFront: {
    position: "absolute",
    bottom: 0,
    right: -14,
    width: 24,
    height: 52,
    background: "#5b21b6",
    borderRadius: "0 8px 4px 0",
  },
  busWindshield: {
    position: "absolute",
    top: 8,
    left: 2,
    width: 16,
    height: 22,
    background: "#bfdbfe",
    borderRadius: 2,
  },
  busLight: {
    position: "absolute",
    bottom: 12,
    right: -4,
    width: 8,
    height: 8,
    background: "#fbbf24",
    borderRadius: "50%",
  },
  wheel: {
    position: "absolute",
    bottom: -10,
    width: 22,
    height: 22,
    background: "#1f2937",
    border: "3px solid #4b5563",
    borderRadius: "50%",
    animation: "spin 0.4s linear infinite",
  },
  exhaust: {
    position: "absolute",
    bottom: 20,
    left: 0,
    width: 8,
    height: 8,
    background: "#6b7280",
    borderRadius: "50%",
    animation: "puff 0.6s ease-out infinite",
  },
  card: {
    background: "rgba(15, 15, 35, 0.92)",
    border: "1px solid rgba(124, 58, 237, 0.3)",
    borderRadius: 20,
    padding: "2rem",
    width: "100%",
    maxWidth: 400,
    position: "relative",
    zIndex: 10,
    backdropFilter: "blur(8px)",
  },
  brand: {
    textAlign: "center",
    marginBottom: "1.25rem",
  },
  brandName: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: 1,
  },
  brandTag: {
    fontSize: 11,
    color: "#a78bfa",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginTop: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: "1.25rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(124,58,237,0.25)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  signupBtn: {
    width: "100%",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "12px",
    fontSize: 15,
    fontWeight: 600,
    marginTop: 4,
    transition: "background 0.2s",
  },
  loginText: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: 13,
    color: "#475569",
  },
  loginLink: {
    color: "#a78bfa",
    textDecoration: "none",
  },
};

export default Signup;