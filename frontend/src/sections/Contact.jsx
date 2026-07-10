import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";

const Contact = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-15%" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d+$/.test(value)) return;
    if (name === "phone" && value && !/^\d+$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.service) newErrors.service = "Select a service";
    if (
      formData.service &&
      formData.service !== "Other" &&
      !formData.budget.trim()
    )
      newErrors.budget = "Budget is required";
    if (!formData.idea.trim()) newErrors.idea = "Describe your idea";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setStatus("success");
      setFormData({ name: "", email: "", countryCode: "+91", phone: "", service: "", budget: "", idea: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-4 md:px-8"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Astronaut + Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-1/2 flex flex-col items-center gap-8"
          >
            {/* Floating Astronaut */}
            <motion.img
              src="/space_astro.png"
              alt="Astronaut"
              className="w-56 md:w-72 lg:w-80 drop-shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              loading="lazy"
            />

            {/* Contact Info Cards */}
            <div className="w-full grid grid-cols-2 gap-2">
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: "akashjare09@gmail.com",
                  href: "mailto:akashjare09@gmail.com",
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Pune, India",
                },
              ].map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10 hover:border-blue-500/30 transition-colors"
                >
                  <span className="text-xl">{info.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-300">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 space-y-3"
            >
              <h3 className="text-xl font-bold">Let's Work Together</h3>

              {/* Name + Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  error={errors.name}
                  focused={focused}
                  onChange={handleChange}
                  onFocus={setFocused}
                />
                <InputField
                  label="Your Email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  error={errors.email}
                  focused={focused}
                  onChange={handleChange}
                  onFocus={setFocused}
                />
              </div>

              {/* Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InputField
                  label="Country Code"
                  name="countryCode"
                  placeholder="+91"
                  value={formData.countryCode}
                  focused={focused}
                  onChange={handleChange}
                  onFocus={setFocused}
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    placeholder="1234567890"
                    value={formData.phone}
                    error={errors.phone}
                    focused={focused}
                    onChange={handleChange}
                    onFocus={setFocused}
                  />
                </div>
              </div>

              {/* Service Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-400">
                  Service Needed <span className="text-red-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  onFocus={() => setFocused("service")}
                  onBlur={() => setFocused("")}
                  className={`p-3 rounded-xl bg-white/5 border text-white text-sm focus:outline-none transition-all duration-300 ${
                    errors.service
                      ? "border-red-500"
                      : focused === "service"
                        ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                        : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Web Development" className="text-black">
                    Web Development
                  </option>
                  <option value="App Development" className="text-black">
                    App Development
                  </option>
                  <option value="Other" className="text-black">
                    Other
                  </option>
                </select>
                {errors.service && (
                  <p className="text-red-400 text-xs">{errors.service}</p>
                )}
              </div>

              {/* Budget — conditional */}
              <AnimatePresence>
                {formData.service && formData.service !== "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <InputField
                      label="Budget (₹)"
                      name="budget"
                      placeholder="e.g. 15000"
                      value={formData.budget}
                      error={errors.budget}
                      focused={focused}
                      onChange={handleChange}
                      onFocus={setFocused}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Idea Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-400">
                  Your Idea <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="idea"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.idea}
                  onChange={handleChange}
                  onFocus={() => setFocused("idea")}
                  onBlur={() => setFocused("")}
                  className={`p-3 rounded-xl bg-white/5 border text-white text-sm focus:outline-none transition-all duration-300 resize-none ${
                    errors.idea
                      ? "border-red-500"
                      : focused === "idea"
                        ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                        : "border-white/10 hover:border-white/20"
                  }`}
                />
                {errors.idea && (
                  <p className="text-red-400 text-xs">{errors.idea}</p>
                )}
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {status && status !== "sending" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                      status === "success"
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : "bg-red-500/10 border border-red-500/30 text-red-400"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <FaCheck size={12} /> Message sent successfully!
                      </>
                    ) : (
                      <>
                        <FaTimes size={12} /> Something went wrong. Try again.
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Reusable Input Field ─────────────────────────────────────────────────────
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  focused,
  onChange,
  onFocus,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-gray-400">
      {label} <span className="text-red-400">*</span>
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => onFocus(name)}
      onBlur={() => onFocus("")}
      className={`p-3 rounded-xl bg-white/5 border text-white text-sm focus:outline-none transition-all duration-300 ${
        error
          ? "border-red-500"
          : focused === name
            ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            : "border-white/10 hover:border-white/20"
      }`}
    />
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
);

export default Contact;
