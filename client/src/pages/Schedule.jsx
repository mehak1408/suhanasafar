import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";


function SkeletonRow() {
  return (
    <tr className="border-t border-slate-200 dark:border-slate-800">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="p-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-24"></div>
        </td>
      ))}
    </tr>
  );
}

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await API.get("/schedules");
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
      toast.error("Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">Bus Schedule</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          View route timings and schedule details for available buses.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
        <table className="min-w-[720px] w-full text-left">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-4">Bus</th>
              <th className="p-4">Route</th>
              <th className="p-4">Date</th>
              <th className="p-4">Departure</th>
              <th className="p-4">Arrival</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            ) : schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr
                  key={schedule._id}
                  className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
                >
                  <td className="p-4 font-medium whitespace-nowrap">
                    {schedule.busId?.busNumber || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {schedule.busId?.route || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {schedule.date ? new Date(schedule.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {schedule.departureTime || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {schedule.arrivalTime || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-500 dark:text-slate-400">
                  No schedules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;