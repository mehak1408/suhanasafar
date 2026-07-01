import { useEffect, useState } from "react";
import API from "../services/api";
import { Shield, Flame, PhoneCall } from "lucide-react";
import toast from "react-hot-toast";

const defaultEmergencyContacts = [
  { id: 1, name: "Women Helpline", phone: "1091", type: "Women Safety", icon: Shield },
  { id: 2, name: "Police", phone: "100", type: "Police", icon: Shield },
  { id: 3, name: "Fire Brigade", phone: "101", type: "Fire", icon: Flame },
  { id: 4, name: "Ambulance", phone: "108", type: "Ambulance", icon: PhoneCall },
  { id: 5, name: "National Emergency", phone: "112", type: "Emergency", icon: PhoneCall },
];

const typeColors = {
  Police: "bg-blue-600",
  Fire: "bg-red-600",
  Ambulance: "bg-green-600",
  Other: "bg-purple-600",
  "Women Safety": "bg-pink-600",
  Emergency: "bg-orange-600",
};

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
      </div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
      <div className="flex gap-3">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
      </div>
    </div>
  );
}

function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", type: "Other" });
  const [loading, setLoading] = useState(false);
  
  const [loadingContacts, setLoadingContacts] = useState(true);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await API.get("/emergency");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching emergency contacts", error);
      toast.error("Failed to fetch emergency contacts");
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/emergency", formData);
      toast.success("Emergency contact added");
      setFormData({ name: "", phone: "", type: "Other" });
      fetchContacts();
    } catch (error) {
      console.error("Error adding emergency contact", error);
      toast.error("Error adding emergency contact");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/emergency/${id}`);
      toast.success("Emergency contact deleted");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact", error);
      toast.error("Error deleting contact");
    }
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">Emergency Contacts</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage emergency contacts for quick access during travel.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Default Emergency Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {defaultEmergencyContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <div
                key={contact.id}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-purple-700/30 shadow-sm hover:shadow-md hover:scale-[1.02] dark:hover:border-purple-500 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Icon size={26} className="text-indigo-600 dark:text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full text-white ${typeColors[contact.type] || "bg-purple-600"}`}>
                    {contact.type}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  <span className="text-slate-500 dark:text-slate-400">Phone:</span> {contact.phone}
                </p>
                {contact.phone === "112" && (
                  <p className="text-orange-500 dark:text-orange-400 text-sm mb-2">
                    National Emergency Helpline
                  </p>
                )}
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm text-white w-fit transition"
                >
                  <PhoneCall size={16} />
                  Call
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-xl font-semibold">My Emergency Contacts</h2>

      <form
        onSubmit={handleAddContact}
        className="bg-white dark:bg-slate-900 rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <input
          type="text"
          name="name"
          placeholder="Contact Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-purple-500"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-purple-500"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-purple-500"
        >
          <option value="Police">Police</option>
          <option value="Fire">Fire</option>
          <option value="Ambulance">Ambulance</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 dark:bg-purple-600 hover:bg-indigo-600 dark:hover:bg-purple-700 text-white rounded-lg px-4 py-3 disabled:opacity-50 transition"
        >
          {loading ? "Adding..." : "Add Contact"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loadingContacts ? (
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                <span className={`text-xs px-3 py-1 rounded-full text-white ${typeColors[contact.type] || "bg-purple-600"}`}>
                  {contact.type}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                <span className="text-slate-500 dark:text-slate-400">Phone:</span> {contact.phone}
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm text-white transition"
                >
                  <PhoneCall size={16} />
                  Call
                </a>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-500 dark:text-slate-400">
            No emergency contacts added yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default Emergency;