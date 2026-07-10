import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const EducationCard = ({ edu, idx, isMobile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    // ✅ Removed once:true so animation replays on scroll up/down
  });

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative ml-12"
      >
        {/* Timeline Dot with Pulse */}
        <div className="absolute -left-[45px] top-5">
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)]" />
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full bg-white/40"
            animate={
              isInView
                ? { scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }
                : { scale: 1, opacity: 0 }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="group bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎓</span>
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
          </div>
          <p className="text-gray-400 text-sm mt-1">{edu.institution}</p>
          <p className="text-gray-500 text-xs">{edu.location}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {edu.duration}
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              {edu.grade}
            </span>
          </div>
          <p className="text-gray-300 text-sm mt-3 leading-relaxed">
            {edu.description}
          </p>
        </div>
      </motion.div>
    );
  }

  // Desktop
  const isLeft = idx % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 30 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: isLeft ? -60 : 60, y: 30 }
      }
      transition={{
        duration: 0.6,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
    >
      <div className="w-[45%]">
        <div className="group relative bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-6 shadow-lg hover:border-blue-500/50 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300">
          {/* Subtle gradient on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎓</span>
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
            </div>
            <p className="text-gray-400 mt-1">{edu.institution}</p>
            <p className="text-gray-500 text-sm">{edu.location}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {edu.duration}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                {edu.grade}
              </span>
            </div>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              {edu.description}
            </p>
          </div>

          {/* Connector line from card to center dot */}
          <div
            className={`absolute top-6 ${
              isLeft ? "-right-[calc(5vw+12px)]" : "-left-[calc(5vw+12px)]"
            } w-[calc(5vw+12px)] h-[2px]`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-white/40 to-white/10"
              style={{
                direction: isLeft ? "ltr" : "rtl",
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
          className="relative"
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)]" />
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full bg-white/40"
            animate={
              isInView
                ? { scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }
                : { scale: 1, opacity: 0 }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated timeline line that grows with scroll
const TimelineLine = ({ containerRef, isMobile }) => {
  const { scrollYProgress } = useInView(containerRef, {
    margin: "-10%",
  });

  if (isMobile) {
    return (
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 via-green-400 to-blue-500 rounded-full"
          style={{ height: "100%" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          // origin top
          className="w-full bg-gradient-to-b from-blue-500 via-green-400 to-blue-500 rounded-full origin-top"
        />
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 overflow-hidden rounded-full">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full h-full bg-gradient-to-b from-blue-500 via-green-400 to-blue-500 rounded-full origin-top"
      />
    </div>
  );
};

const Education = () => {
  const educations = [
    {
      degree: "B.Tech Information Technology",
      institution: "JSPM's Rajarshi Shahu College of Engineering",
      location: "Pune",
      duration: "2021 - 2025",
      grade: "CGPA: 8.5",
      description:
        "Pursuing Bachelor's degree with focus on full-stack development, cloud architecture, and system design.",
    },
    {
      degree: "12th Grade (PCMB)",
      institution: "Parner Public School",
      location: "Parner",
      duration: "2019 - 2021",
      grade: "Grade: 95.50%",
      description:
        "Completed Higher Secondary Education with Physics, Chemistry, Mathematics, and Biology.",
    },
  ];

  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { margin: "-100px" });

  return (
    <section id="education" className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        {/* Animated Heading */}
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold text-center mb-16"
        >
          Education
        </motion.h2>

        <div className="relative" ref={containerRef}>
          {/* Animated Timeline Line */}
          {!isMobile ? (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-b from-blue-500 via-green-400 to-blue-500 rounded-full origin-top"
              />
            </div>
          ) : (
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-b from-blue-500 via-green-400 to-blue-500 rounded-full origin-top"
              />
            </div>
          )}

          <div className={isMobile ? "space-y-8" : "space-y-16"}>
            {educations.map((edu, idx) => (
              <EducationCard
                key={idx}
                edu={edu}
                idx={idx}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
