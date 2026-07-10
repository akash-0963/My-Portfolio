import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import Education from "./sections/Education";
import MusicPlayer from "./components/MusicPlayer";
import { API_HEALTH_ENDPOINT } from "./config/api";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch(API_HEALTH_ENDPOINT, {
          method: "GET",
          signal: AbortSignal.timeout(5000),
        });
      } catch (err) {
        console.log("Backend wake-up signal sent");
      }
    };

    wakeUpBackend();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
      <MusicPlayer />

      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
    </div>
  );
};

export default App;
