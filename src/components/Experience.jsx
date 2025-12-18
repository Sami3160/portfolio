import React, { useState, useRef, useEffect } from 'react'
import * as motion from "motion/react-client";
import experienceData from '../data/experience.json';

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const scrollContainerRef = useRef(null);

  // Parse dates and calculate positions
  const parseDate = (dateStr) => {
    if (dateStr === 'present') return new Date();
    const [year, month] = dateStr.split('-').map(Number);
    return new Date(year, month - 1);
  };

  const calculateTimeline = () => {
    const experiences = experienceData.map(exp => ({
      ...exp,
      startDate: parseDate(exp.start),
      endDate: parseDate(exp.end)
    }));

    // Find earliest and latest dates
    const allDates = experiences.flatMap(exp => [exp.startDate, exp.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    // Add some padding
    const totalMonths = (maxDate.getFullYear() - minDate.getFullYear()) * 12 + 
                       (maxDate.getMonth() - minDate.getMonth()) + 6;
    
    // Calculate positions (0 to 100%)
    const experiencesWithPos = experiences.map(exp => {
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
        widthPercent
      };
    });

    return { experiencesWithPos, minDate, maxDate, totalMonths };
  };

  const { experiencesWithPos, minDate, maxDate, totalMonths } = calculateTimeline();

  // Generate SVG path for curved timeline
  // Calculate SVG width based on total months (each month = 80px for better visibility)
  const MONTH_WIDTH = 80;
  const SVG_WIDTH = totalMonths * MONTH_WIDTH;
  const SVG_HEIGHT = 140; // Increased height to accommodate month labels
  
  const getXPosition = (percent) => {
    return (percent / 100) * SVG_WIDTH;
  };

  // Calculate year markers
  const getYearMarkers = () => {
    const startYear = minDate.getFullYear();
    const endYear = maxDate.getFullYear();
    const years = [];
    
    for (let year = startYear; year <= endYear; year++) {
      // Calculate position for January 1st of each year
      const yearDate = new Date(year, 0, 1);
      const yearMonths = (yearDate.getFullYear() - minDate.getFullYear()) * 12 + 
                        (yearDate.getMonth() - minDate.getMonth());
      const yearPercent = (yearMonths / totalMonths) * 100;
      
      years.push({
        year,
        percent: yearPercent,
        x: getXPosition(yearPercent)
      });
    }
    
    return years;
  };

  // Calculate month markers
  const getMonthMarkers = () => {
    const startYear = minDate.getFullYear();
    const startMonth = minDate.getMonth();
    const endYear = maxDate.getFullYear();
    const endMonth = maxDate.getMonth();
    const months = [];
    const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    
    let currentDate = new Date(startYear, startMonth, 1);
    const finalDate = new Date(endYear, endMonth + 1, 1);
    
    while (currentDate < finalDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      const monthMonths = (year - minDate.getFullYear()) * 12 + (month - minDate.getMonth());
      const monthPercent = (monthMonths / totalMonths) * 100;
      
      months.push({
        year,
        month,
        monthName: monthNames[month],
        fullMonthName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
        percent: monthPercent,
        x: getXPosition(monthPercent)
      });
      
      currentDate = new Date(year, month + 1, 1);
    }
    
    return months;
  };

  const yearMarkers = getYearMarkers();
  const monthMarkers = getMonthMarkers();
  
  // Calculate default view width (one year = 12 months)
  const ONE_YEAR_WIDTH = 12 * MONTH_WIDTH;
  
  // Auto-scroll to show the first year on mount
  useEffect(() => {
    if (scrollContainerRef.current && yearMarkers.length > 0) {
      // Scroll to show the first year (with a bit of padding)
      const firstYearX = yearMarkers[0].x;
      scrollContainerRef.current.scrollLeft = Math.max(0, firstYearX - 100);
    }
  }, [yearMarkers]);

  const formatDate = (dateStr) => {
    if (dateStr === 'present') return 'Present';
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleMouseMove = (e, index) => {
    setHoveredIndex(index);
    const scrollContainer = e.currentTarget.closest('.timeline-scroll-container');
    const rect = scrollContainer.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 60
    });
  };
  
  const generatePath = (exp) => {
    const x1 = (exp.startPercent / 100) * SVG_WIDTH;
    const x2 = (exp.endPercent / 100) * SVG_WIDTH;
    const y = SVG_HEIGHT / 2; // Center of timeline
    const height = 45; // Height of the curve
    
    // Create a curved path
    const controlY = y - height;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y} Q ${midX} ${controlY} ${x2} ${y}`;
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
        <span className="terminal-command">cat experience.json | jq</span>
      </div>
      <div className="terminal-content">
        {/* SVG Timeline */}
        <div className="mb-8 relative">
          <div className="text-gray-400 mb-4 text-sm flex items-center justify-between" style={{ fontFamily: "Geist Light" }}>
            <span>Timeline Visualization</span>
            <span className="text-xs text-gray-500">Scroll horizontally to view all years</span>
          </div>
          <div className="relative w-full bg-black border border-gray-700 border-opacity-50 rounded overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className="timeline-scroll-container"
              style={{
                width: '100%',
                height: '100%',
                overflowX: 'auto',
                overflowY: 'hidden'
              }}
            >
              <svg 
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                preserveAspectRatio="none"
                style={{ minWidth: '100%' }}
              >
              {/* Background line - more subtle, Linux terminal style */}
              <line
                x1="0"
                y1={SVG_HEIGHT / 2}
                x2={SVG_WIDTH}
                y2={SVG_HEIGHT / 2}
                stroke="rgba(200, 200, 200, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              
              {/* Year markers - Linux terminal style */}
              {yearMarkers.map((marker, index) => (
                <g key={`year-${index}`}>
                  {/* Vertical line for year marker */}
                  <line
                    x1={marker.x}
                    y1={20}
                    x2={marker.x}
                    y2={SVG_HEIGHT / 2 + 8}
                    stroke="rgba(200, 200, 200, 0.3)"
                    strokeWidth="1.5"
                    strokeDasharray={index === 0 || index === yearMarkers.length - 1 ? "0" : "2,2"}
                  />
                  {/* Year label background - terminal style */}
                  <rect
                    x={marker.x - 28}
                    y={5}
                    width="56"
                    height="18"
                    fill="rgba(0, 0, 0, 0.9)"
                    rx="1"
                    stroke="rgba(200, 200, 200, 0.2)"
                    strokeWidth="1"
                  />
                  {/* Year label - terminal gray */}
                  <text
                    x={marker.x}
                    y={18}
                    fill="#b0b0b0"
                    fontSize="11"
                    fontWeight="400"
                    textAnchor="middle"
                    className="select-none"
                    style={{ fontFamily: "Geist Mono" }}
                  >
                    {marker.year}
                  </text>
                </g>
              ))}
              
              {/* Month markers - subtle terminal style */}
              {monthMarkers.map((marker, index) => {
                const isFirstOfYear = marker.month === 0;
                return (
                  <g key={`month-${index}`}>
                    {/* Vertical line for month marker */}
                    <line
                      x1={marker.x}
                      y1={SVG_HEIGHT / 2 - (isFirstOfYear ? 8 : 3)}
                      x2={marker.x}
                      y2={SVG_HEIGHT / 2 + (isFirstOfYear ? 8 : 3)}
                      stroke={isFirstOfYear ? "rgba(200, 200, 200, 0.25)" : "rgba(150, 150, 150, 0.15)"}
                      strokeWidth={isFirstOfYear ? "1.5" : "1"}
                    />
                    {/* Month label - only show for first month of each year or every 3 months */}
                    {(isFirstOfYear || marker.month % 3 === 0) && (
                      <text
                        x={marker.x}
                        y={SVG_HEIGHT / 2 + 35}
                        fill="#808080"
                        fontSize="9"
                        textAnchor="middle"
                        className="select-none"
                        style={{ fontFamily: "Geist Mono", opacity: isFirstOfYear ? 0.9 : 0.6 }}
                      >
                        {marker.fullMonthName}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Experience paths */}
              {experiencesWithPos.map((exp, index) => {
                const path = generatePath(exp);
                const x1 = getXPosition(exp.startPercent);
                const x2 = getXPosition(exp.endPercent);
                const y = SVG_HEIGHT / 2;
                
                return (
                  <g key={index}>
                    {/* Area fill - create a closed path - terminal gray style */}
                    <path
                      d={`M ${x1} ${y} ${path.substring(1)} L ${x2} ${y} Z`}
                      fill="rgba(200, 200, 200, 0.08)"
                      onMouseEnter={(e) => handleMouseMove(e, index)}
                      onMouseMove={(e) => handleMouseMove(e, index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="cursor-pointer transition-opacity"
                      style={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
                    />
                    
                    {/* Curved path - terminal style */}
                    <path
                      d={path}
                      fill="none"
                      stroke={hoveredIndex === index ? "#d0d0d0" : "#a0a0a0"}
                      strokeWidth="2.5"
                      onMouseEnter={(e) => handleMouseMove(e, index)}
                      onMouseMove={(e) => handleMouseMove(e, index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="cursor-pointer transition-all"
                      style={{ filter: hoveredIndex === index ? "drop-shadow(0 0 4px rgba(200,200,200,0.5))" : "none" }}
                    />
                    
                    {/* Start marker - square terminal style */}
                    <rect
                      x={x1 - 3}
                      y={y - 3}
                      width="6"
                      height="6"
                      fill={hoveredIndex === index ? "#d0d0d0" : "#a0a0a0"}
                      onMouseEnter={(e) => handleMouseMove(e, index)}
                      onMouseMove={(e) => handleMouseMove(e, index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="cursor-pointer transition-all"
                    />
                    
                    {/* End marker (or present indicator) - square terminal style */}
                    <rect
                      x={x2 - 3}
                      y={y - 3}
                      width="6"
                      height="6"
                      fill={hoveredIndex === index ? "#d0d0d0" : "#a0a0a0"}
                      onMouseEnter={(e) => handleMouseMove(e, index)}
                      onMouseMove={(e) => handleMouseMove(e, index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="cursor-pointer transition-all"
                    />
                    
                    {exp.end === 'present' && (
                      <rect
                        x={x2 - 5}
                        y={y - 5}
                        width="10"
                        height="10"
                        fill="none"
                        stroke="#d0d0d0"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
              </svg>
            </div>
            
            {/* Tooltip - Linux terminal style */}
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bg-black/95 backdrop-blur-sm border border-gray-600 text-gray-300 px-3 py-2 rounded pointer-events-none z-10 shadow-xl"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y}px`,
                  transform: 'translateX(-50%)',
                  fontFamily: "Geist Mono",
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-500">$</span>
                  <span className="font-medium text-gray-200">{experiencesWithPos[hoveredIndex].company}</span>
                </div>
                <div className="text-gray-400 text-xs ml-4">{experiencesWithPos[hoveredIndex].role}</div>
                <div className="text-gray-500 text-xs mt-1 ml-4">
                  {formatDate(experiencesWithPos[hoveredIndex].start)} - {formatDate(experiencesWithPos[hoveredIndex].end)}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card border border-gray-700 border-opacity-30 rounded p-4 bg-black bg-opacity-60 hover:border-opacity-60 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ borderColor: "#a0a0a0", boxShadow: "0 0 15px rgba(200,200,200,0.1)", scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-2 h-2 bg-gray-500"
                      style={{ fontFamily: "Geist Mono" }}
                    ></div>
                    <h3 className="text-gray-200 font-medium" style={{ fontFamily: "Geist Medium" }}>
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-gray-400 text-sm" style={{ fontFamily: "Geist Mono" }}>
                    {exp.company}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <span className="text-gray-400 text-xs px-2 py-1 border border-gray-600 rounded" style={{ fontFamily: "Geist Light" }}>
                    {exp.type}
                  </span>
                  <div className="text-gray-500 text-xs" style={{ fontFamily: "Geist Light" }}>
                    {formatDate(exp.start)} - {formatDate(exp.end)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2" style={{ fontFamily: "Geist Light", lineHeight: "1.6" }}>
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

