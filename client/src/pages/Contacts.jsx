import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
      </div>
    </div>
  );
}

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  
  const [loadingContacts, setLoadingContacts] = useState(true);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await API.get("/contacts");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
      toast.error("Failed to fetch contacts");
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
      await API.post("/contacts", formData);
      toast.success("Contact added");
      setFormData({ name: "", phone: "", email: "" });
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact", error);
      toast.error("Error adding contact");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      toast.success("Contact deleted");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact", error);
      toast.error("Error deleting contact");
    }
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">My Contacts</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Save personal contacts for quick access during travel.
        </p>
      </div>

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
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-purple-500"
        />
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
              <h2 className="text-xl font-semibold mb-4">{contact.name}</h2>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                <p>
                  <span className="text-slate-500 dark:text-slate-400">Phone:</span>{" "}
                  {contact.phone || "N/A"}
                </p>
                <p>
                  <span className="text-slate-500 dark:text-slate-400">Email:</span>{" "}
                  {contact.email || "N/A"}
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm text-white transition"
                  >
                    Call
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition"
                  >
                    Email
                  </a>
                )}
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
            No contacts added yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;