import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Feedback() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setLoading(true);

    try {
      await API.post("/feedback", { message });
      setMessage("");
      toast.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Feedback error", error);
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">Feedback</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Help us improve Suhana Safar by sharing your experience.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 max-w-2xl shadow-sm"
      >
        <textarea
          rows="5"
          placeholder="Write your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-purple-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-indigo-500 dark:bg-purple-600 hover:bg-indigo-600 dark:hover:bg-purple-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default Feedback;