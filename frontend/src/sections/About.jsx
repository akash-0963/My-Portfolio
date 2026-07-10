import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaFlutter,
} from "react-icons/fa6";
import {
  SiReact,
  SiExpress,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";

const techStack = [
  { icon: SiReact, name: "React", color: "#61dafb" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#38bdf8" },
  { icon: SiNodedotjs, name: "Node.js", color: "#68a063" },
  { icon: SiExpress, name: "Express.js", color: "#ffffff" },
  { icon: SiMongodb, name: "MongoDB", color: "#4db33d" },
  { icon: FaFlutter, name: "Flutter", color: "#61dafb" },
];

const quickFacts = [
  { label: "Location", value: "Pune, India", icon: "📍" },
  { label: "Education", value: "B.Tech IT (CGPA: 8.5)", icon: "🎓" },
  { label: "Experience", value: "Full Stack Developer", icon: "💻" },
  { label: "Focus", value: "Full Stack & Cloud", icon: "🎯" },
];

const TechBadge = ({ tech, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.4,
        delay: 0.4 + index * 0.08,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="group flex flex-col items-center gap-2"
    >
      <div
        className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = tech.color;
          e.currentTarget.style.boxShadow = `0 0 20px ${tech.color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <tech.icon
          className="text-2xl transition-colors duration-300"
          style={{ color: tech.color }}
        />
      </div>
      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
        {tech.name}
      </span>
    </motion.div>
  );
};

const ProfileImage = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00bf8f] to-[#1cd8d2] rounded-2xl opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00bf8f] to-[#1cd8d2] rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 animate-pulse" />

      <div className="relative lg:w-[360px] lg:h-[360px] md:w-[288px] md:h-[288px] w-[230px] h-[230px] rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-[#302b63] to-[#1cd8d2]">
        <img
          src="/AkashProfile.png"
          alt="Akash Jare"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full bg-black/80 border border-green-500/40 backdrop-blur-sm flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-green-400 font-medium">
          Available for work
        </span>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "-15%",
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen w-full flex flex-col justify-center items-center relative bg-black text-white overflow-hidden px-4  py-20"
    >
      {/* Animated Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-0 -right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-10 blur-[140px] animate-pulse delay-300" />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg">
          About Me
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00bf8f] to-[#1cd8d2] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Image */}
          <div className="flex flex-col items-center justify-center">
            <ProfileImage isInView={isInView} />
          </div>

          {/* RIGHT — Bio + Tech */}
          <div className="space-y-6">
            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00bf8f] to-[#1cd8d2] bg-clip-text text-transparent">
                Akash Jare
              </h2>
              <p className="text-gray-400 text-lg mt-1">Full Stack Developer</p>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-3"
            >
              <p className="text-gray-300 leading-relaxed">
                Performance-driven Developer with extensive experience building scalable mobile and web applications using the MERN stack, React Native, and Flutter.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I specialize in designing robust cloud infrastructures on AWS, leading end-to-end product architecture from conception to launch, and scaling systems seamlessly.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Currently at Techwave Ventures building Connektx, a professional networking platform. I'm passionate about system architecture, cloud infrastructure, and mentoring aspiring developers.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
