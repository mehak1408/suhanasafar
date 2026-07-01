import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "leaflet/dist/leaflet.css";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #334155",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);