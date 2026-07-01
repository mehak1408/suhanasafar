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

function Bookings() {
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [busId, setBusId] = useState("");
  const [seats, setSeats] = useState("");
  const [selectedBusDetails, setSelectedBusDetails] = useState(null);
  const [bookedSeatsCount, setBookedSeatsCount] = useState(0);

  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingBuses, setLoadingBuses] = useState(true);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoadingBookings(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/cancel/${id}`);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (error) {
      console.error("Cancel booking failed", error);
      toast.error("Cancel booking failed");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (bookingSubmitting) return;

    if (selectedBusDetails && bookedSeatsCount >= selectedBusDetails.capacity) {
      toast.error("No seats available for this bus");
      return;
    }

    setBookingSubmitting(true);
    try {
      await API.post("/bookings", {
        busId,
        seatNumber: Number(seats),
      });
      toast.success("Booking created successfully");
      setBusId("");
      setSeats("");
      fetchBookings();
    } catch (error) {
      console.error("Booking failed", error);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingSubmitting(false);
    }
  };

  const fetchBuses = async () => {
    setLoadingBuses(true);
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch (error) {
      console.error("Error fetching buses", error);
      toast.error("Failed to fetch buses");
    } finally {
      setLoadingBuses(false);
    }
  };

  const fetchBookedSeatCount = async (selectedBusId) => {
    try {
      const res = await API.get(`/bookings/bus/${selectedBusId}/count`);
      setBookedSeatsCount(res.data.bookedSeatsCount);
    } catch (error) {
      console.error("Error fetching booked seat count", error);
      toast.error("Failed to fetch seat availability");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchBuses();
  }, []);

  useEffect(() => {
    const bus = buses.find((b) => b._id === busId) || null;
    setSelectedBusDetails(bus);
    if (busId) {
      fetchBookedSeatCount(busId);
    } else {
      setBookedSeatsCount(0);
    }
  }, [busId, buses]);

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Book seats, track availability, and manage your travel requests.
        </p>
      </div>

      <form
        onSubmit={handleBooking}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm"
      >
        <select
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 p-3 rounded-lg w-full outline-none focus:border-indigo-500 dark:focus:border-purple-500"
          required
          disabled={loadingBuses}
        >
          
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.busNumber} — {bus.route}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Seat Number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 p-3 rounded-lg w-full outline-none focus:border-indigo-500 dark:focus:border-purple-500"
          required
        />

        
        <button
          type="submit"
          disabled={bookingSubmitting || loadingBuses}
          className="bg-indigo-500 dark:bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 dark:hover:bg-purple-700 transition w-full disabled:opacity-50"
        >
          {bookingSubmitting ? "Booking..." : "Book"}
        </button>
      </form>

      {selectedBusDetails && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm">Bus Capacity</p>
            <p className="text-2xl font-bold mt-2">{selectedBusDetails.capacity}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm">Booked Seats</p>
            <p className="text-2xl font-bold mt-2">{bookedSeatsCount}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm">Available Seats</p>
            <p className="text-2xl font-bold mt-2 text-indigo-600 dark:text-purple-400">
              {selectedBusDetails.capacity - bookedSeatsCount}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-4">Bus</th>
              <th className="p-4">Route</th>
              <th className="p-4">Seat Number</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            
            {loadingBookings ? (
              [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className={`border-t border-slate-200 dark:border-slate-800 ${
                    booking.status === "cancelled"
                      ? "opacity-50"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/70"
                  }`}
                >
                  <td className="p-4 font-medium whitespace-nowrap">
                    {booking.busId?.busNumber}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {booking.busId?.route}
                  </td>
                  <td className="p-4 font-semibold text-indigo-600 dark:text-purple-400 whitespace-nowrap">
                    #{booking.seatNumber}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded text-sm text-white ${
                        booking.status === "booked" ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      {booking.status === "booked" ? "Confirmed" : "Cancelled"}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {booking.status === "booked" ? (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="bg-red-600 px-3 py-1 rounded text-sm text-white hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-500 dark:text-slate-400">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;