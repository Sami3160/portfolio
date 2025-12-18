import React from 'react'
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
export default function About() {
    const birthDay = new Date("2004-05-28");
      const age = Math.floor((new Date() - birthDay) / (1000 * 60 * 60 * 24 * 365));
      const [showMore, setShowMore] = useState(false);
      const [showTipObject, setTipObject] = useState({
        age: false,
        fullstack: false,
        devops: false,
        linux: false,
        cyber: false,
      });
      function calculateDetailedAge(birthDate) {
        const now = new Date();
        const birth = new Date(birthDate);
    
        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();
        let hours = now.getHours() - birth.getHours();
        let minutes = now.getMinutes() - birth.getMinutes();
    
        if (months < 0) {
          years--;
          months += 12;
        }
    
        if (days < 0) {
          months--;
          const prevMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
          ).getDate();
          days += prevMonth;
        }
    
        if (hours < 0) {
          days--;
          hours += 24;
        }
    
        if (minutes < 0) {
          hours--;
          minutes += 60;
        }
    
        return `its ${years} years ${months} months ${days} days\n${hours} hours and ${minutes} minutes.`;
      }

      const moreAccurateDate = calculateDetailedAge("2004-05-28T13:00:00");
      
      return (
        <motion.div 
          className="terminal-section "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="terminal-header">
            <span className="terminal-prompt">$</span>
            <span className="terminal-command">cat about.txt</span>
          </div>
          <div className="terminal-content">
            <p className="text-gray-300 mb-4" style={{ fontFamily: "Geist Thin", lineHeight: "1.8" }}>
              Hi, I'm Sami, I am
              <motion.span
                className="terminal-text-green cursor-help relative"
                style={{ fontFamily: "Geist Light" }}
                whileHover={{ color: "#00ff88", textShadow: "0 0 10px rgba(0,255,136,0.5)" }}
                onHoverStart={() => setTipObject({ ...showTipObject, age: true })}
                onHoverEnd={() => setTipObject({ ...showTipObject, age: false })}
              >
                {" "}
                {age}{" "}
                <AnimatePresence initial={false}>
                  {showTipObject.age ? (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: -55 }}
                      exit={{ opacity: 0, x: 0 }}
                      transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
                      className="absolute bg-black border border-[#00ff88] text-[#00ff88] px-3 py-1 -left-5 rounded-md w-[25rem] z-10"
                      style={{ fontFamily: "Geist Light" }}
                    >
                      Actually {moreAccurateDate}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.span>
              years-old, focused on creative stuff and exploring new things and
              technologies. I'm also a
              <span
                className="terminal-text-green cursor-help"
                style={{ fontFamily: "Geist Light" }}
              >
                {" "}
                full-stack developer{" "}
              </span>
              currently a student in DYP Collage Of Engineering and Technology,
              Bawda, Kolhapur of batch 2026.
            </p>
            <p className="text-gray-300 mb-4" style={{ fontFamily: "Geist Thin", lineHeight: "1.8" }}>
              I enjoy building websites especially frontend part of website, and I
              have good interest in
              <span
                className="terminal-text-green cursor-help"
                style={{ fontFamily: "Geist Light" }}
              >
                {" "}
                DevOps{" "}
              </span>
              and
              <span
                className="terminal-text-green cursor-help"
                style={{ fontFamily: "Geist Light" }}
              >
                {" "}
                Cyber Security{" "}
              </span>
              (which doesnt mean im got at it btw...) also I'm interested in
              <span
                className="terminal-text-green cursor-help"
                style={{ fontFamily: "Geist Light" }}
              >
                {" "}
                Linux System{" "}
              </span>
              (and my personal fav distro is Parrot OS).
            </p>

            <p className="text-gray-300 mb-6" style={{ fontFamily: "Geist Thin", lineHeight: "1.8" }}>
              When im not coding or studying you can find me playing games,
              watching movies or series or anime or listening music or most
              probably sleeping.
            </p>
            
            <div className="mb-6">
              <p className="text-gray-400 mb-3" style={{ fontFamily: "Geist Medium" }}>
                <span className="terminal-text-green">▶</span> Current Positions
              </p>
              <div
                className="text-gray-300 flex flex-col gap-2"
                style={{ fontFamily: "Geist Thin" }}
              >
                <span>
                  <span className="terminal-text-green">{">>"}</span>
                  <span style={{ fontFamily: "Geist Light", color: "#e0e0e0" }}>
                    {" "}
                    Student At DYPCET, KOP
                  </span>
                </span>
                <span>
                  <span className="terminal-text-green">{">>"}</span>
                  <span style={{ fontFamily: "Geist Light", color: "#e0e0e0" }}>
                    {" "}
                    Tech Team Lead At Prarambh Club, DYP
                  </span>
                </span>
                <span>
                  <span className="terminal-text-green">{">>"}</span>
                  <span style={{ fontFamily: "Geist Light", color: "#e0e0e0" }}>
                    {" "}
                    Tech Team Member at Microsoft Learn Student Ambassador Club, DYP
                  </span>
                </span>
                <span>
                  <span className="terminal-text-green">{">>"}</span>
                  <span style={{ fontFamily: "Geist Light", color: "#e0e0e0" }}>
                    {" "}
                    Core Team Member at Open Code Crafter
                  </span>
                </span>
              </div>
            </div>

            <p className="text-gray-300" style={{ fontFamily: "Geist Thin", lineHeight: "1.8" }}>
              Currently learning more
              <span className="terminal-text-green" style={{ fontFamily: "Geist Light" }}>
                {" "}
                Web Development{" "}
              </span>
              and
              <span className="terminal-text-green" style={{ fontFamily: "Geist Light" }}>
                {" "}
                Cloud Computing{" "}
              </span>
            </p>
          </div>
        </motion.div>
      )
}
