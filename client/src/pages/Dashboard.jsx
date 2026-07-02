import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  Bus,
  MapPinned,
  Ticket,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-6"></div>
      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
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
      console.error(error);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="space-y-10">
        <div>
          <div className="h-8 w-44 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3"></div>
          <div className="h-4 w-80 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  const platformCards = [
    {
      title: "Total Buses",
      value: stats.totalBuses,
      icon: Bus,
      color: "text-blue-500",
    },
    {
      title: "Active Buses",
      value: stats.activeBuses,
      icon: MapPinned,
      color: "text-green-500",
    },
    {
      title: "Bookings",
      value: stats.confirmedBookings,
      icon: Ticket,
      color: "text-purple-500",
    },
    {
      title: "Cancelled",
      value: stats.cancelledBookings,
      icon: XCircle,
      color: "text-red-500",
    },
    {
      title: "Requests",
      value: stats.totalRequests,
      icon: ClipboardList,
      color: "text-orange-500",
    },
  ];

  const myCards = [
    {
      title: "Confirmed",
      value: stats.myConfirmedBookings,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Cancelled",
      value: stats.myCancelledBookings,
      icon: XCircle,
      color: "text-red-500",
    },
    {
      title: "My Requests",
      value: stats.myTotalRequests,
      icon: Activity,
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="space-y-10 text-slate-900 dark:text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Monitor buses, bookings and transport activity in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-full w-fit">

          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>

          <span className="font-medium">
            System Online
          </span>

        </div>

      </div>

      {/* Platform Stats */}

      <div>

        <h2 className="text-xl font-semibold mb-5">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

          {platformCards.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-4 text-indigo-600 dark:text-purple-400">
                      {card.value}
                    </h2>

                  </div>

                  <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">

                    <Icon
                      size={28}
                      className={card.color}
                    />

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

      {/* My Activity */}

      <div>

        <h2 className="text-xl font-semibold mb-5">
          My Activity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {myCards.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-4 text-indigo-600 dark:text-purple-400">
                      {card.value}
                    </h2>

                  </div>

                  <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">

                    <Icon
                      size={28}
                      className={card.color}
                    />

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;