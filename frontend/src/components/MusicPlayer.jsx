import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef(null);

  const playlist = ["/music/weeknd-starboy.m4a"];

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setShowTooltip(false);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (isLoading) return;
    setIsLoading(true);
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleTrackEnd = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.load();
  }, [currentTrack]);

  return (
    <div className="fixed bottom-6 right-4 z-[1000] flex flex-col items-center gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 mb-1"
          >
            <p className="text-[10px] text-white/80 font-medium whitespace-nowrap">
              🎵 Play music while scrolling?
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualizer Bars — only when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-end gap-[3px] h-4 mb-1"
          >
            {[1, 2, 3, 4, 5].map((bar) => (
              <motion.div
                key={bar}
                className="w-[3px] rounded-full bg-gradient-to-t from-cyan-400 to-green-400"
                animate={{
                  height: ["4px", `${8 + Math.random() * 10}px`, "4px"],
                }}
                transition={{
                  duration: 0.4 + Math.random() * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar * 0.08,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause Button */}
      <motion.button
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative p-3.5 rounded-full transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          background: isPlaying
            ? "linear-gradient(135deg, #00f0ff, #00ff80)"
            : "linear-gradient(135deg, rgba(0,240,255,0.8), rgba(0,255,128,0.8))",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #00ff80)",
              }}
              animate={{
                scale: [1, 1.8],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #00ff80)",
              }}
              animate={{
                scale: [1, 1.5],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
          </>
        )}

        {/* Glow shadow */}
        <div
          className="absolute inset-0 rounded-full blur-md -z-10 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, #00f0ff, #00ff80)",
            opacity: isPlaying ? 0.6 : 0.3,
          }}
        />

        {/* Icon */}
        <div className="relative z-10 text-white w-5 h-5 flex items-center justify-center">
          {isLoading ? (
            <svg
              className="animate-spin w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </motion.button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack]}
        onEnded={handleTrackEnd}
        onError={() => {
          console.error("Error loading audio");
          setIsPlaying(false);
        }}
      />
    </div>
  );
};

export default MusicPlayer;
