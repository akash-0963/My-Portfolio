import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 
        ${visible ? "translate-y-0" : "-translate-y-full"}
        bg-transparent`}
      >
        {/* Removed max-w-7xl and mx-auto to let content hit the edges */}
        {/* Changed px-6 to pl-2 (or pl-0) to remove the left gap */}
        <div className="flex items-center justify-between w-full px-6 py-4">
          {/* Logo - Leftmost Section */}
          <div className="flex items-center">
            <img src="/Logo.png" alt="Logo" className="w-10 h-10" />
            <span className="text-white text-xl font-bold hidden sm:block ml-2">
              Akash Jare
            </span>
          </div>

          {/* Center Menu (Desktop) */}
          <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
            <a href="#home" className="nav-link group relative text-white">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="nav-link group relative text-white">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#projects" className="nav-link group relative text-white">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            {/* <a
              href="#achievements"
              className="nav-link group relative text-white"
            >
              Achievements
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a> */}
            {/* <a
              href="#certificate"
              className="nav-link group relative text-white"
            >
              Certificates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a> */}
            <a href="#contact" className="nav-link group relative text-white">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Right Button (Desktop) */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#19aca7] via-[#00bf8f] to-[#4d4696] shadow-lg hover:scale-105 transition-all"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <FiMenu className="text-white text-3xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu (Unchanged) */}
      <div
        className={`fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center space-y-8 text-white text-2xl transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-6 right-6 text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>
        {/* ... Mobile Links ... */}
        <a href="#home" onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>
          Projects
        </a>
        {/* <a href="#achievements" onClick={() => setMenuOpen(false)}>
          Achievements
        </a> */}
        {/* <a href="#certificate" onClick={() => setMenuOpen(false)}>
          Certificates
        </a> */}
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </div>
    </>
  );
};

export default Navbar;
