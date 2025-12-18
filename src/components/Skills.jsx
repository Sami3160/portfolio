import React, { useState } from 'react'
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { FaCode } from 'react-icons/fa';
import skillsData from '../data/skills.json';
import { techIcons, getOnePieceQuote } from '../utils/techIcons';

export default function Skills() {
  const [showMore, setShowMore] = useState(false);
  const [onePieceQuote, setOnePieceQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  
  const skillEntries = Object.entries(skillsData);
  const visibleSkills = showMore ? skillsData : Object.fromEntries(skillEntries.slice(0, 2));
  
  const handleSkillHover = () => {
    if (!showQuote) {
      setOnePieceQuote(getOnePieceQuote());
      setShowQuote(true);
      setTimeout(() => setShowQuote(false), 3000);
    }
  };
  
  const getTechIcon = (tech) => {
    // Try exact match first
    if (techIcons[tech]) {
      const IconComponent = techIcons[tech];
      return <IconComponent className="w-4 h-4" />;
    }
    // Try partial match
    const key = Object.keys(techIcons).find(k => tech.includes(k.split(' ')[0]) || k.includes(tech.split(' ')[0]));
    if (key) {
      const IconComponent = techIcons[key];
      return <IconComponent className="w-4 h-4" />;
    }
    return <FaCode className="w-4 h-4" />;
  };

  return (
    <motion.div 
      className="terminal-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="terminal-header">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat skills.txt | grep -E "Frontend|Backend|DevOps|Database|Security|ML|Languages|Tools"</span>
      </div>
      {showQuote && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 text-center"
        >
          <span className="text-gray-400 text-sm" style={{ fontFamily: "Geist Light" }}>
            {onePieceQuote}
          </span>
        </motion.div>
      )}
      <div className="terminal-content">
        <div className="skills-grid">
          {Object.entries(visibleSkills).map(([domain, techs], index) => (
            <motion.div
              key={domain}
              className="skill-domain"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="skill-domain-name">
                <span className="terminal-text-green">▶</span> {domain}
              </div>
              <div className="skill-items" onMouseEnter={handleSkillHover}>
                {techs.map((tech, techIndex) => (
                  <motion.span 
                    key={techIndex} 
                    className="skill-item flex items-center gap-1.5"
                    whileHover={{ scale: 1.05, x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-gray-400">{getTechIcon(tech)}</span>
                    <span>{tech}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Additional skills are already shown above */}
            </motion.div>
          )}
        </AnimatePresence>
        {skillEntries.length > 2 && (
          <motion.button
            className="terminal-button-secondary"
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="terminal-prompt">$</span> {showMore ? "show_less" : "show_more"}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
