import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaSearch, FaSync } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data.contacts || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load messages. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      setMessages(messages.filter((msg) => msg._id !== id));
      setSelectedMessage(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete message");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchMessages();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setMessages(data.contacts || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-2">Manage and view all contact submissions</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 flex gap-3"
        >
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all font-semibold flex items-center gap-2"
            >
              <FaSearch size={14} /> Search
            </button>
          </div>
          <button
            onClick={fetchMessages}
            className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <FaSync size={14} />
          </button>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <p className="text-gray-400">Loading messages...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-white/5 rounded-lg border border-white/10 p-8 text-center">
                <p className="text-gray-400">No messages found</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedMessage?._id === msg._id
                        ? "bg-blue-500/10 border-blue-500/30"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{msg.name}</h3>
                        <p className="text-sm text-gray-400">{msg.email}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(msg.timestamp)}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                        {msg.service}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">{msg.idea}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Message Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-1"
          >
            {selectedMessage ? (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-white">Message Details</h2>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-white font-semibold">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                    <a
                      href={`tel:${selectedMessage.countryCode}${selectedMessage.phone}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {selectedMessage.countryCode} {selectedMessage.phone}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Service</p>
                    <p className="text-white">{selectedMessage.service}</p>
                  </div>

                  {selectedMessage.budget && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Budget</p>
                      <p className="text-white">₹ {selectedMessage.budget}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="text-white">{formatDate(selectedMessage.timestamp)}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Idea</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedMessage.idea}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center h-96 flex items-center justify-center">
                <p className="text-gray-400">Select a message to view details</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Summary Stats */}
        {messages.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">Total Messages</p>
              <p className="text-2xl font-bold text-blue-400">{messages.length}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">Web Development</p>
              <p className="text-2xl font-bold text-purple-400">
                {messages.filter((m) => m.service === "Web Development").length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">App Development</p>
              <p className="text-2xl font-bold text-pink-400">
                {messages.filter((m) => m.service === "App Development").length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">Other</p>
              <p className="text-2xl font-bold text-green-400">
                {messages.filter((m) => m.service === "Other").length}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
