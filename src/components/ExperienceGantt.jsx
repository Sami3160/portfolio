import React, { useState, useRef, useEffect } from 'react'
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import experienceData from '../data/experience.json';

export default function ExperienceGantt() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollContainerRef = useRef(null);

  // Parse dates and calculate positions
  const parseDate = (dateStr) => {
    if (dateStr === 'present') return new Date();
    const [year, month] = dateStr.split('-').map(Number);
    return new Date(year, month - 1);
  };

  const calculateGantt = () => {
    const experiences = experienceData.map(exp => ({
      ...exp,
      startDate: parseDate(exp.start),
      endDate: parseDate(exp.end)
    }));

    // Find earliest and latest dates
    const allDates = experiences.flatMap(exp => [exp.startDate, exp.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    // Add padding
    minDate.setMonth(minDate.getMonth() - 1);
    maxDate.setMonth(maxDate.getMonth() + 1);

    const totalMonths = (maxDate.getFullYear() - minDate.getFullYear()) * 12 + 
                       (maxDate.getMonth() - minDate.getMonth());
    
    // Calculate positions
    const experiencesWithPos = experiences.map((exp, index) => {
      const startMonths = (exp.startDate.getFullYear() - minDate.getFullYear()) * 12 + 
                         (exp.startDate.getMonth() - minDate.getMonth());
      const endMonths = exp.end === 'present' 
        ? totalMonths 
        : (exp.endDate.getFullYear() - minDate.getFullYear()) * 12 + 
          (exp.endDate.getMonth() - minDate.getMonth());
      
      const startPercent = (startMonths / totalMonths) * 100;
      const endPercent = (endMonths / totalMonths) * 100;
      const widthPercent = endPercent - startPercent;

      return {
        ...exp,
        startPercent,
        endPercent,
        widthPercent,
        startMonths,
        endMonths,
        index
      };
    });

    // Generate year and month markers
    const startYear = minDate.getFullYear();
    const endYear = maxDate.getFullYear();
    const years = [];
    const months = [];
    
    for (let year = startYear; year <= endYear; year++) {
      const yearDate = new Date(year, 0, 1);
      const yearMonths = (yearDate.getFullYear() - minDate.getFullYear()) * 12 + 
                        (yearDate.getMonth() - minDate.getMonth());
      const yearPercent = (yearMonths / totalMonths) * 100;
      years.push({ year, percent: yearPercent });
      
      // Add months for each year
      for (let month = 0; month < 12; month++) {
        const monthDate = new Date(year, month, 1);
        if (monthDate >= minDate && monthDate <= maxDate) {
          const monthMonths = (monthDate.getFullYear() - minDate.getFullYear()) * 12 + 
                             (monthDate.getMonth() - minDate.getMonth());
          const monthPercent = (monthMonths / totalMonths) * 100;
          months.push({ 
            year, 
            month, 
            percent: monthPercent,
            name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]
          });
        }
      }
    }

    return { experiencesWithPos, minDate, maxDate, totalMonths, years, months };
  };

  const { experiencesWithPos, years, months, totalMonths } = calculateGantt();
  const BAR_HEIGHT = 50;
  const ROW_GAP = 20;
  const HEADER_HEIGHT = 80;
  const MONTH_WIDTH = 60; // pixels per month
  const totalWidth = totalMonths * MONTH_WIDTH;

  const formatDate = (dateStr) => {
    if (dateStr === 'present') return 'Present';
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const getXPosition = (percent) => {
    return (percent / 100) * totalWidth;
  };

  const handleBarClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  // Auto-scroll to first experience
  useEffect(() => {
    if (scrollContainerRef.current && experiencesWithPos.length > 0) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

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
        <span className="terminal-command">gantt --view experience</span>
      </div>
      <div className="terminal-content">
        <div className="mb-4 text-gray-400 text-sm" style={{ fontFamily: "Geist Light" }}>
          Click on any bar to view details
        </div>
        
        <div className="relative w-full bg-black border border-gray-700 border-opacity-50 rounded overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="timeline-scroll-container"
            style={{
              width: '100%',
              maxHeight: '500px',
              overflowX: 'auto',
              overflowY: 'auto'
            }}
          >
            <div style={{ width: totalWidth, minHeight: '400px', position: 'relative' }}>
              {/* Year and Month Headers */}
              <div style={{ height: HEADER_HEIGHT, position: 'sticky', top: 0, background: 'rgba(0,0,0,0.95)', zIndex: 10, borderBottom: '1px solid rgba(200,200,200,0.2)' }}>
                {/* Year markers */}
                {years.map((year, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${getXPosition(year.percent)}px`,
                      top: 0,
                      height: '40px',
                      borderLeft: '1px solid rgba(200,200,200,0.3)',
                      paddingLeft: '8px',
                      paddingTop: '8px'
                    }}
                  >
                    <span className="text-gray-400 text-sm" style={{ fontFamily: "Geist Mono" }}>
                      {year.year}
                    </span>
                  </div>
                ))}
                
                {/* Month markers */}
                {months.filter(m => m.month % 3 === 0).map((month, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${getXPosition(month.percent)}px`,
                      top: '40px',
                      height: '40px',
                      borderLeft: '1px solid rgba(150,150,150,0.15)',
                      paddingLeft: '4px',
                      paddingTop: '4px'
                    }}
                  >
                    <span className="text-gray-500 text-xs" style={{ fontFamily: "Geist Mono" }}>
                      {month.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gantt Bars */}
              <div style={{ paddingTop: '20px', position: 'relative' }}>
                {experiencesWithPos.map((exp, index) => {
                  const x = getXPosition(exp.startPercent);
                  const width = getXPosition(exp.endPercent) - x;
                  const y = index * (BAR_HEIGHT + ROW_GAP);
                  const isSelected = selectedIndex === index;
                  const isHovered = hoveredIndex === index;

                  return (
                    <div key={index} style={{ position: 'relative', marginBottom: ROW_GAP }}>
                      {/* Label */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          left: '-180px', 
                          top: '10px',
                          width: '170px',
                          textAlign: 'right',
                          paddingRight: '10px'
                        }}
                      >
                        <div className="text-gray-300 text-sm font-medium" style={{ fontFamily: "Geist Medium" }}>
                          {exp.company}
                        </div>
                        <div className="text-gray-500 text-xs" style={{ fontFamily: "Geist Light" }}>
                          {exp.role}
                        </div>
                      </div>

                      {/* Gantt Bar */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          left: `${x}px`,
                          top: `${y}px`,
                          width: `${width}px`,
                          height: `${BAR_HEIGHT}px`,
                          background: isSelected 
                            ? 'rgba(200, 200, 200, 0.3)' 
                            : isHovered 
                            ? 'rgba(200, 200, 200, 0.2)' 
                            : 'rgba(150, 150, 150, 0.15)',
                          border: isSelected 
                            ? '2px solid rgba(200, 200, 200, 0.6)' 
                            : '1px solid rgba(150, 150, 150, 0.3)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '10px',
                          paddingRight: '10px'
                        }}
                        onClick={() => handleBarClick(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-gray-400 text-xs" style={{ fontFamily: "Geist Mono" }}>
                          {formatDate(exp.start)} - {formatDate(exp.end)}
                        </div>
                        {exp.end === 'present' && (
                          <div className="ml-2 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Experience Details */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-black/60 border border-gray-700 rounded p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-gray-500"></div>
                <h3 className="text-gray-200 text-xl font-medium" style={{ fontFamily: "Geist Medium" }}>
                  {experiencesWithPos[selectedIndex].role}
                </h3>
              </div>
              <div className="text-gray-400 text-sm mb-4" style={{ fontFamily: "Geist Mono" }}>
                {experiencesWithPos[selectedIndex].company}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-500 text-xs px-2 py-1 border border-gray-600 rounded" style={{ fontFamily: "Geist Light" }}>
                  {experiencesWithPos[selectedIndex].type}
                </span>
                <span className="text-gray-500 text-xs" style={{ fontFamily: "Geist Light" }}>
                  {formatDate(experiencesWithPos[selectedIndex].start)} - {formatDate(experiencesWithPos[selectedIndex].end)}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "Geist Light", lineHeight: "1.8" }}>
                {experiencesWithPos[selectedIndex].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

