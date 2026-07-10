import React, { useEffect, useMemo, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const socials = [
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/akash-0963",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akash-jare-609ab3230/",
  },
  {
    Icon: FaEnvelope,
    label: "Email",
    href: "mailto:akashjare09@gmail.com",
  },
  // { 
  //   Icon: FaXTwitter,
  //   label: "x", 
  //   href: "https://x.com/akash_jare" 
  // },
  // {
  //   Icon: FaInstagram,
  //   label: "Instagram",
  //   href: "https://www.instagram.com/akash_jare/",
  // },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0)) " },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8)) ",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Home = () => {
  const roles = useMemo(
    () => ["Full Stack Developer", "Cloud Architecture Designer", "React Native Developer"],
    [],
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout;

    if (!deleting && subIndex < current.length) {
      timeout = setTimeout(() => setSubIndex((v) => v + 1), 60);
    } else if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && subIndex > 0) {
      timeout = setTimeout(() => setSubIndex((v) => v - 1), 40);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((p) => (p + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticlesBackground />
      <div className="absolute inset-0">
        {/* Glow Backgrounds */}
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse "></div>
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500 "></div>

        <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Content Side */}
          <div className="flex flex-col justify-center h-full text-center lg:text-left relative lg:-translate-x-12 xl:-translate-x-20">
            <div className="w-full lg:pr-12 max-w-[48rem]">
              <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em] ">
                <span>{roles[index].substring(0, subIndex)}</span>
                <span
                  className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                  style={{ height: "1em" }}
                ></span>
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg "
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Hello, I'm
                <br />
                <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                  Akash Jare
                </span>
              </motion.h1>
              <motion.p
                className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                I build world-class applications and mentor developers. Passionate about leading teams, designing scalable systems, and turning ambitious ideas into reality.
              </motion.p>
              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all  "
                >
                  View My Work
                </a>
                <a
                  href="/Akash_Jare.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
                >
                  My Resume
                </a>
              </motion.div>
              <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
                {socials.map(({ Icon, label, href }) => (
                  <motion.a
                    href={href}
                    key={label}
                    target="_blank"
                    aria-label={label}
                    rel="noopener noreferrer"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-gray-300"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Lottie Animation Side */}
          <div className="relative hidden lg:flex justify-end items-center pr-10 xl:pr-20">
            {/* Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[420px] h-[420px] rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
                }}
              />
            </div>

            {/* Lottie Container */}
            <motion.div
              className="relative z-10 w-[480px] xl:w-[560px] h-[480px] xl:h-[560px] flex items-center justify-center shrink-0"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <DotLottieReact
                src="/developer.lottie"
                loop
                autoplay
                renderConfig={{
                  devicePixelRatio:
                    typeof window !== "undefined" ? window.devicePixelRatio : 2,
                }}
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
