import React, { useState } from 'react'
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import certificationsData from '../data/certifications.json';
import DarkVeil from '../bits components/DarkVeil';

export default function Certifications() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const formatDate = (dateStr) => {
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <motion.div 
      className="terminal-section relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <DarkVeil 
          hueShift={120}
          noiseIntensity={0.01}
          scanlineIntensity={0.05}
          speed={0.2}
          scanlineFrequency={0.3}
          warpAmount={0.05}
          resolutionScale={0.3}
        />
      </div>
      <div className="terminal-header">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">ls -la certificates/</span>
      </div>
      <div className="terminal-content relative z-10">
        <div className="cert-grid">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-card relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05, y: -5, borderColor: "#a0a0a0" }}
            >
              {/* Hover glow effect */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent rounded pointer-events-none"
                  />
                )}
              </AnimatePresence>
              <div className="cert-badge">
                <span className="cert-icon">✓</span>
              </div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer text-gray-400">{cert.issuer}</div>
              <div className="cert-date terminal-text-green">{formatDate(cert.date)}</div>
              {cert.visit && (
                <a
                  href={cert.visit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-visit-link mt-4 inline-flex items-center gap-2 text-sm text-[#00ff88] hover:text-[#00ff88] hover:underline transition-all"
                  style={{ fontFamily: "Geist Light" }}
                >
                  <span>→</span> View Certificate
                </a>
              )}
            </motion.div>
          ))}
        </div>
        {certificationsData.length === 0 && (
          <div className="terminal-text-gray text-center py-8">
            No certificates found. Run: <span className="terminal-text-green">fetch_certificates()</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
