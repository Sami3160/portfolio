import React, { useState } from 'react'
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import projectsData from '../data/projects.json';
import PixelBlast from '../bits components/PixelBlast';

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div 
      className="terminal-section relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background particle effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <PixelBlast 
          variant="circle"
          pixelSize={3}
          color="rgba(200, 200, 200, 0.4)"
          patternScale={2}
          patternDensity={0.5}
          pixelSizeJitter={0.2}
          enableRipples
          rippleSpeed={0.2}
          rippleThickness={0.08}
          rippleIntensityScale={1}
          speed={0.3}
          edgeFade={0.2}
          transparent
        />
      </div>
      <div className="terminal-header">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">git log --oneline --all  (projects are not uploaded in json file, these are dummy ones)</span>
      </div>
      <div className="terminal-content relative z-10">
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              className="project-card relative group"
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                borderColor: "#a0a0a0", 
                boxShadow: "0 10px 30px rgba(200, 200, 200, 0.15)",
                y: -8,
                scale: 1.02
              }}
            >
              {/* Hover overlay effect */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-transparent rounded pointer-events-none"
                  />
                )}
              </AnimatePresence>
              {/* Project Image */}
              {project.image && (
                <motion.div 
                  className="project-image-container mb-4 overflow-hidden rounded border border-gray-700 border-opacity-30 relative"
                  whileHover={{ borderColor: "rgba(200, 200, 200, 0.5)" }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Image overlay on hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
              
              <div className="project-header">
                <div className="project-name">{project.name}</div>
                <div className={`project-status ${project.status}`}>
                  <span className="status-dot"></span>
                  {project.status}
                </div>
              </div>
              <div className="project-description text-gray-400">
                {project.description}
              </div>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span className="terminal-text-green">→</span> GitHub
                  </a>
                )}
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span className="terminal-text-green">→</span> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {projectsData.length === 0 && (
          <div className="terminal-text-gray text-center py-8">
            No projects found. Run: <span className="terminal-text-green">git clone projects</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
