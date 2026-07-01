import { NavLink } from "react-router";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Bus Location", path: "/bus-location" },
  { name: "Schedule", path: "/schedule" },
  { name: "Bookings", path: "/booking" },
  { name: "Emergency", path: "/emergency" },
  { name: "My Contacts", path: "/contacts" },
  { name: "Feedback", path: "/feedback" },
  { name: "About", path: "/about" },
];

function Sidebar({ onLinkClick }) {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] sticky top-16 p-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-6 text-slate-700 dark:text-slate-300">
        Menu
      </h2>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-indigo-500 dark:bg-purple-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;