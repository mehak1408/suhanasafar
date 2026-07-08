function About() {
  return (
    <div className="space-y-10 text-slate-900 dark:text-white max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">About Suhana Safar</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Suhana Safar is a smart public transportation management system
          designed to improve passenger convenience and safety through
          real-time tracking, booking services, and emergency support.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Key Features</h2>

        <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li>Real-time bus location tracking using map integration</li>
          <li>Live bus movement simulation for demonstration purposes</li>
          <li>Seat booking system for passengers</li>
          <li>Dashboard analytics for transport overview</li>
          <li>Emergency contact management for passenger safety</li>
          <li>Personal contact storage for quick access</li>
          <li>User authentication with secure login and signup</li>
          <li>Passenger feedback system to improve services</li>
        </ul>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Technology Stack</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
            React
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
            Node.js
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
            Express
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
            MongoDB
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
            JWT Auth
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
            Leaflet Maps
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Project Purpose</h2>

        <p className="text-slate-600 dark:text-slate-300">
          This project demonstrates a full-stack web application built with the
          MERN stack. It focuses on solving real-world transportation challenges
          such as bus tracking, ticket booking, passenger safety, and user
          communication. The system showcases backend API design, secure
          authentication, responsive UI development, and interactive map-based
          features.
        </p>
      </div>
    </div>
  );
}

export default About;