import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Category Badge */}
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-purple-500/80 text-white backdrop-blur-sm capitalize">
          {project.category}
        </span>

        {/* Hover Links Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-purple-500/60 backdrop-blur-md flex items-center justify-center text-white border border-purple-400/30 hover:bg-purple-500/80 transition-colors"
          >
            <FaExternalLinkAlt size={16} />
          </motion.a>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25 hover:bg-purple-500/25 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaGithub size={14} />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaExternalLinkAlt size={12} />
            Live Demo
          </a>
        </div>
      </div>

      {/* Bottom Glow on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "MeetMovies",
      description: "A online Movie Ticket Booking Platform",
      tech: ["React", "MongoDB", "NodeJs", "ExpressJs", "Tailwind"],
      category: "fullstack",
      image: "/project_img/meet-movies-img.png",
      github: "https://github.com/akash-0963/MeetMovies",
      live: "https://meet-movies.vercel.app/",
    },
    {
      id: 2,
      title: "Foodie Hub",
      description:
        "A beautiful and responsive food delivery UI built with React and Tailwind, featuring restaurant browsing, menu exploration, and cart functionality with a modern design.",
      tech: ["React", "Tailwind", "LocalStorage"],
      category: "basic",
      image: "/project_img/FoodieHub.png",
      github: "https://github.com/akash-0963/Foodie-Hub",
      live: "https://foodie-hub-opal.vercel.app/",
    },
    {
      id: 3,
      title: "CountUp",
      description:
        "Built a simple and responsive calculator using HTML, CSS, and JavaScript with support for basic arithmetic operations and an intuitive UI.",
      tech: ["HTML5", "CSS", "JavaScript"],
      category: "basic",
      image: "/project_img/countup.png",
      github: "https://github.com/akash-0963/CountUp_The-Calculator",
      live: "https://count-up-the-calculator.vercel.app/",
    },
  ];

  const categories = ["all", "fullstack", "basic", "creative"];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const INITIAL_DISPLAY_COUNT = 3;
  const hasMoreProjects = filteredProjects.length > INITIAL_DISPLAY_COUNT;
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);

  // Reset showAll when filter changes
  const handleFilterChange = (cat) => {
    setFilter(cat);
    setShowAll(false);
  };

  return (
    <section
      id="projects"
      className="relative bg-black min-h-screen py-20 px-4 md:px-8"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are some of my recent works. Each project is crafted with
            passion and attention to detail.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-2.5 rounded-full capitalize text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/10"
              }`}
            >
              {/* Active background */}
              {filter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${showAll}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              No projects in this category yet.
            </p>
          </motion.div>
        )}

        {/* View More / Show Less Button — only shown when more than 3 projects */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3.5 rounded-full text-white font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? "Show Less" : "View All Projects"}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {showAll ? "←" : "→"}
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
