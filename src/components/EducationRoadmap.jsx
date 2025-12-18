import React from 'react'
import * as motion from "motion/react-client";
import educationData from '../data/education.json';

export default function EducationRoadmap() {
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
        <span className="terminal-command">cat education.txt</span>
      </div>
      <div className="terminal-content">
        <div className="roadmap-container">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className={`roadmap-item ${edu.status}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="roadmap-line"></div>
              <div className="roadmap-dot"></div>
              <div className="roadmap-content">
                <div className="roadmap-year">{edu.year}</div>
                <div className="roadmap-institution">{edu.institution}</div>
                <div className="roadmap-details">
                  <span className="terminal-text-green">{edu.degree}</span>
                  {edu.field && <span className="text-gray-400"> • {edu.field}</span>}
                  {edu.batch && <span className="text-gray-400"> • Batch {edu.batch}</span>}
                </div>
                <div className="roadmap-location text-gray-500">📍 {edu.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {educationData.length === 0 && (
          <div className="terminal-text-gray text-center py-8">
            No education data found. Run: <span className="terminal-text-green">cat education.txt</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
