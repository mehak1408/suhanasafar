import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-6"></div>
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard fetch failed", error);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="space-y-10 text-slate-900 dark:text-white">
        <div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-40 animate-pulse mb-2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-72 animate-pulse"></div>
        </div>
        <div>
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-48 animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
        <div>
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-36 animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  const platformCards = [
    { title: "Total Buses", value: stats.totalBuses },
    { title: "Active Buses", value: stats.activeBuses },
    { title: "Confirmed Bookings", value: stats.confirmedBookings },
    { title: "Cancelled Bookings", value: stats.cancelledBookings },
    { title: "Total Requests", value: stats.totalRequests },
  ];

  const myCards = [
    { title: "My Confirmed Bookings", value: stats.myConfirmedBookings },
    { title: "My Cancelled Bookings", value: stats.myCancelledBookings },
    { title: "My Total Requests", value: stats.myTotalRequests },
  ];

  return (
    <div className="space-y-10 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Overview of Suhana Safar transport operations.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {platformCards.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
            >
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {card.title}
              </p>
              <p className="text-4xl font-bold mt-4 text-indigo-600 dark:text-purple-400">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">My Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCards.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
            >
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {card.title}
              </p>
              <p className="text-4xl font-bold mt-4 text-indigo-600 dark:text-purple-400">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;