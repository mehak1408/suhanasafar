import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatBot from "../chat/ChatBot";

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onLinkClick={() => setMobileMenuOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>

        <ChatBot />
      </div>
    </div>
  );
}

export default Layout;