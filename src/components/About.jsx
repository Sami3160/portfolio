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
    <div className="about flex flex-col mt-4 gap-3">
        <p className="text-gray-400">About</p>
          <p className="text-gray-300" style={{ fontFamily: "Geist Thin" }}>
            Hi, I'm Sami, I am
            <motion.span
              className="text-white cursor-help relative"
              style={{ fontFamily: "Geist Light" }}
              whileHover={{ color: "#6CB4EE", textShadow: "0 0 10px white" }}
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
                    className="absolute bg-white bg-opacity-50 text-black px-3 py-1 -left-5 rounded-md  w-[25rem]"
                  >
                    Actually {moreAccurateDate}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </motion.span>
            years-old, focused on creative stuff and exploring new things and
            technologies. I'm also a
            <span
              className="text-white cursor-help"
              style={{ fontFamily: "Geist Light" }}
            >
              {" "}
              full-stack developer{" "}
            </span>
            currently a student in DYP Collage Of Engineering and Technology,
            Bawda, Kolhapur of batch 2026.
          </p>
          <p className="text-gray-300" style={{ fontFamily: "Geist Thin" }}>
            I enjoy building websites especially frontend part of website, and I
            have good interest in
            <span
              className="text-white cursor-help"
              style={{ fontFamily: "Geist Light" }}
            >
              {" "}
              DevOps{" "}
            </span>
            and
            <span
              className="text-white cursor-help"
              style={{ fontFamily: "Geist Light" }}
            >
              {" "}
              Cyber Security{" "}
            </span>
            (which doesnt mean im got at it btw...) also I'm interested in
            <span
              className="text-white cursor-help"
              style={{ fontFamily: "Geist Light" }}
            >
              {" "}
              Linux System{" "}
            </span>
            (and my personal fav distro is Parrot OS).
          </p>

          <p className="text-gray-300" style={{ fontFamily: "Geist Thin" }}>
            When im not coding or studying you can find me playing games,
            watching movies or series or anime or listening music or most
            probably sleeping.
          </p>
          <p className="text-gray-400 mt-5">Current Positions</p>

          <p
            className="text-gray-300 flex flex-col"
            style={{ fontFamily: "Geist Thin" }}
          >
            <span>
              {">>"}
              <span style={{ fontFamily: "Geist Light", color: "white" }}>
                {" "}
                Student At DYPCET, KOP
              </span>
            </span>
            <span>
              {">>"}
              <span style={{ fontFamily: "Geist Light", color: "white" }}>
                {" "}
                Tech Team Lead At Prarambh Club, DYP
              </span>
            </span>
            <span>
              {" "}
              {">>"}
              <span style={{ fontFamily: "Geist Light", color: "white" }}>
                {" "}
                Tech Team Member at Microsoft Learn Student Ambassador Club, DYP
              </span>{" "}
            </span>
            <span>
              {">>"}
              <span style={{ fontFamily: "Geist Light", color: "white" }}>
                {" "}
                Core Team Member at Open Code Crafter
              </span>
            </span>
          </p>

          <p className="text-gray-400 mt-5">
            Currently learning more
            <span style={{ fontFamily: "Geist Light", color: "white" }}>
              {" "}
              Web Development{" "}
            </span>
            and
            <span style={{ fontFamily: "Geist Light", color: "white" }}>
              {" "}
              Web Pentesting{" "}
            </span>
          </p>
      
    </div>
  )
}
