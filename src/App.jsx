import React from "react";
import "./App.css";
import './assets/style.css'
import * as motion from "motion/react-client";
import profile from "./assets/images/logo.png";
import Socials from "./components/Socials";
import About from "./components/About";
import Skills from "./components/Skills";
import EducationRoadmap from "./components/EducationRoadmap";
import ExperienceGantt from "./components/ExperienceGantt";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import FeedbackForm from "./components/FeedbackForm";
import DarkVeil from "./bits components/DarkVeil";
import PixelBlast from "./bits components/PixelBlast";

function App() {
  return (
    <div className="terminal-bg min-h-screen w-full text-white relative z-10" >
        {/* Top particle effect */}
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
          <PixelBlast 
            variant="circle"
            pixelSize={4}
            color="rgba(200, 200, 200, 0.3)"
            patternScale={2.5}
            patternDensity={0.8}
            pixelSizeJitter={0.3}
            enableRipples
            rippleSpeed={0.3}
            rippleThickness={0.1}
            rippleIntensityScale={1.2}
            speed={0.4}
            edgeFade={0.3}
            transparent
          />
        </div>
        
        {/* Middle section subtle effect */}
        <div style={{ width: '100%', height: '60vh', position: 'fixed', top: '40vh', left: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
          <DarkVeil 
            hueShift={180}
            noiseIntensity={0.02}
            scanlineIntensity={0.1}
            speed={0.3}
            scanlineFrequency={0.5}
            warpAmount={0.1}
            resolutionScale={0.5}
          />
        </div>        
      <div className="golden-container py-12 md:py-24 relative z-10">
        <div className="golden-section relative z-10">
          {/* Header Section */}
          <motion.div
            className="terminal-section mb-8 mt-10 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="terminal-header">
              <span className="terminal-prompt">$</span>
              <span className="terminal-command ">whoami</span>
            </div>
            <div className="terminal-content">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                <motion.img
                  src={profile}
                  alt="Sami Bhadgaonkar"
                  className="h-32 w-32 rounded-full border-2 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,136,0.5)" }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <motion.div
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ fontFamily: "Geist Medium" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sami Bhadgaonkar
                  </motion.div>
                  <motion.div
                    className="text-gray-400 text-xl md:text-2xl flex items-center gap-2"
                    style={{ fontFamily: "Geist Thin" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Student | Dev | Ready to work!
                    <div className="loader"></div>
                  </motion.div>
                </div>
              </div>
              <Socials />
            </div>
          </motion.div>

          {/* About Section */}
          <About />

          {/* Skills Section */}
          <Skills />

          {/* Education Roadmap Section */}
          <EducationRoadmap />

          {/* Experience Section */}
          <ExperienceGantt />

          {/* Certifications Section */}
          <Certifications />

          {/* Projects Section */}
          <Projects />

          {/* Feedback Form Section */}
          <FeedbackForm />

          {/* Footer */}
          <motion.div
            className="terminal-section mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="terminal-header">
              <span className="terminal-prompt">$</span>
              <span className="terminal-command">exit</span>
            </div>
            <div className="terminal-content text-gray-500 text-sm py-4">
              <p>Thanks for visiting! <span className="terminal-text-green">~</span></p>
              <p className="mt-2">© {new Date().getFullYear()} Sami Bhadgaonkar</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
