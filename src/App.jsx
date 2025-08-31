import React, { useState } from "react";
import "./App.css";
import './assets/style.css'
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import profile from "./assets/images/logo.png";
import Socials from "./components/Socials";
const About = React.lazy(() => import("./components/About"));
function App() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="gradient-background min-h-[100vh] w-fill flex flex-col items-center justify-center text-white">
      <div className="content w-[90vw] md:w-[65vw] lg:w-[55vw] xl:w-[45vw] my-24">
        <div className="flex gap-3 items-center">
          <img
            src={profile}
            alt=""
            srcset=""
            className="h-32 w-32 shadow-slate-700 shadow-lg rounded-full"
          />
          <div className="">
            <div className="name flex text-6xl">Sami Bhadgaonkar</div>
            <div
              className="name text-gray-500 text-2xl flex items-center gap-2"
              style={{ fontFamily: "Geist Thin" }}
            >
              Student | Dev | Ready to work!
            <div className="loader"></div>
            </div>
          </div>
        </div>
        <Socials />

        <About />
        <div className="about flex flex-col mt-4 gap-3">
          <div className="tech grid grid-cols-1 md:grid-cols-2 gap-y-3">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, type: "spring", delay: 0.2 },
              }}
              className="text-gray-400 "
            >
              <div className="techDomain">Frontend</div>
              <div className="flex gap-1 flex-wrap">
                <div className="tech-item">React</div>
                <div className="tech-item">Tailwind</div>
                <div className="tech-item">
                  material/ui{" "}
                  <span style={{ fontSize: "0.7rem" }}>(Basic)</span>
                </div>
                <div className="tech-item">Framer-Motion</div>
                <div className="tech-item">
                  ThreeJs <span style={{ fontSize: "0.7rem" }}>(Learning)</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, type: "spring", delay: 0.5 },
              }}
              className="text-gray-400 "
            >
              <div className="techDomain">Backend</div>
              <div className="flex gap-1 flex-wrap">
                <div className="tech-item">Node.js</div>
                <div className="tech-item">
                  Django <span style={{ fontSize: "0.7rem" }}>(Basic)</span>
                </div>
                <div className="tech-item">
                  Spring Boot <span style={{ fontSize: "0.7rem" }}>(New)</span>
                </div>
                <div className="tech-item">socket.io</div>
                <div className="tech-item">Express.js</div>
                <div className="tech-item">jsonwebtoken</div>
              </div>
            </motion.div>
            <AnimatePresence initial={false}>
              {showMore ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
                  className="text-gray-400 "
                >
                  <div className="techDomain">DevOps & Cloud</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="tech-item">
                      Docker{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Basics)</span>
                    </div>
                    <div className="tech-item">
                      Kubernetes{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Learning)</span>
                    </div>
                    <div className="tech-item">
                      docker-compose{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Learning)</span>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {showMore ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, type: "spring", delay: 1.2 }}
                  className="text-gray-400 "
                >
                  <div className="techDomain">Database</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="tech-item">MongoDB </div>
                    <div className="tech-item">
                      Firebase{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Basic)</span>
                    </div>
                    <div className="tech-item">SQL</div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showMore ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, type: "spring", delay: 1.8 }}
                  className="text-gray-400 "
                >
                  <div className="techDomain">Security & Ethical Hacking</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="tech-item">Linux, Parrot OS</div>
                    <div className="tech-item">
                      Nmap{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Learning)</span>
                    </div>
                    <div className="tech-item">
                      PortSwigger{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Learning)</span>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showMore ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, type: "spring", delay: 2.4 }}
                  className="text-gray-400 "
                >
                  <div className="techDomain">Machine Learning</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="tech-item">
                      MediaPipe{" "}
                      <span style={{ fontSize: "0.7rem" }}>
                        (Using for pose estimation)
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showMore ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, type: "spring", delay: 3 }}
                  className="text-gray-400 "
                >
                  <div className="techDomain">Languages</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="tech-item">
                      Javascript{" "}
                      <span style={{ fontSize: "0.7rem" }}>(Typescript)</span>
                    </div>
                    <div className="tech-item">Java</div>
                    <div className="tech-item">Python</div>
                    <div className="tech-item">SQL</div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showMore ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, type: "spring", delay: 3.4 }}
                  className="text-gray-400 "
                >
                  <div className="techDomain">Other Tools & Technologies</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="tech-item">GitHub </div>
                    <div className="tech-item">GIMP</div>
                    <div className="tech-item">Linux</div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div
            className="loadMore px-4 py-1 bg-[#1b1f25] w-fit rounded-xl cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
