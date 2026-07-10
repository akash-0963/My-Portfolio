import React, { useRef } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiFlutter,
  SiCplusplus,
  SiC,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { motion, useInView } from "framer-motion";

const skills = [
  { icon: SiC, name: "C", color: "#A8B9CC" },
  { icon: SiCplusplus, name: "C++", color: "#00599C" },
  { icon: FaHtml5, name: "HTML", color: "#E34F26" },
  { icon: FaCss3Alt, name: "CSS", color: "#1572B6" },
  { icon: FaJs, name: "JavaScript", color: "#F7DF1E" },
  { icon: FaReact, name: "React", color: "#61DAFB" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: DiNodejsSmall, name: "Node.js", color: "#68A063" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiExpress, name: "Express.js", color: "#FFFFFF" },
  { icon: SiFlutter, name: "Flutter", color: "#02569B" },
];

const SkillCard = ({ skill }) => {
  const Icon = skill.icon;

  return (
    <div className="group flex flex-col items-center gap-2 min-w-[100px] shrink-0">
      <div
        className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = skill.color;
          e.currentTarget.style.boxShadow = `0 0 25px ${skill.color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <Icon
          className="text-3xl transition-colors duration-300"
          style={{ color: skill.color }}
        />
      </div>
      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-15%" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-16 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px] animate-pulse delay-500" />
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
      >
        My Skills
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-2 mb-10 text-white/70 text-base sm:text-lg z-10"
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Single Row Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {[...skills, ...skills].map((s, i) => (
            <SkillCard key={i} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
