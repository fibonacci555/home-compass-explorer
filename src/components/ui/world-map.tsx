
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "../ThemeContext";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef(null);
  const isInView = useInView(mapRef, { once: true, margin: "-100px" });

  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const { theme } = useTheme();

  // Adjust map dot colors to blue shades based on theme
  const mapDotColor = theme === "dark" ? "#60a5fa" : "#1e3a8a"; // Light blue for dark theme, dark blue for light theme

  const svgMap = map.getSVG({
    radius: 0.22,
    color: mapDotColor,
    shape: "circle",
    backgroundColor: "transparent", // Changed to transparent to blend with background
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  // Create a curved path that looks more visually appealing
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    // Calculate distance for appropriate curve height
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Adjust curve height based on distance
    const curveHeight = Math.min(distance * 0.3, 80);
    
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - curveHeight;
    
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Function to get a random blue shade between dark and light blue
  const getRandomBlueShade = () => {
    const darkBlue = [30, 58, 138]; // RGB for #1e3a8a (dark blue)
    const lightBlue = [147, 197, 253]; // RGB for #93c5fd (light blue)
    const factor = Math.random();
    const r = Math.round(darkBlue[0] + factor * (lightBlue[0] - darkBlue[0]));
    const g = Math.round(darkBlue[1] + factor * (lightBlue[1] - darkBlue[1]));
    const b = Math.round(darkBlue[2] + factor * (lightBlue[2] - darkBlue[2]));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <motion.div
      ref={mapRef}
      className="w-full aspect-[2/1] rounded-lg relative font-sans overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={isInView ? { 
                  pathLength: [0, 1],
                  opacity: [0.2, 0.8, 0.2],
                } : {}}
                transition={{
                  pathLength: {
                    duration: 2 + Math.random(), // Randomize duration slightly
                    delay: i * 0.1, // Staggered start for each path
                  },
                  opacity: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
                }}
                key={`path-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const dotColor = getRandomBlueShade(); // Random blue shade for each dot
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-group-${i}`}>
              <g key={`start-${i}`}>
                <motion.circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="2.5"
                  fill={dotColor}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                />
                <motion.circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="2"
                  fill={dotColor}
                  opacity="0.5"
                  animate={{
                    r: [2, 8, 2],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
                {/* Add starburst effect for emphasis */}
                <motion.circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="1"
                  stroke={dotColor}
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? {
                    scale: [0, 3, 0],
                    opacity: [0, 0.3, 0]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3 + Math.random() * 5,
                    delay: i * 0.2 + 1
                  }}
                />
                {dot.start.label && (
                  <text
                    x={startPoint.x + 5}
                    y={startPoint.y - 5}
                    fontSize="8"
                    fill={theme === "dark" ? "#f8fafc" : "#334155"}
                    textAnchor="start"
                  >
                    {dot.start.label}
                  </text>
                )}
              </g>
              <g key={`end-${i}`}>
                <motion.circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="2.5"
                  fill={dotColor}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.05 + 0.5, duration: 0.5 }}
                />
                <motion.circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="2"
                  fill={dotColor}
                  opacity="0.5"
                  animate={{
                    r: [2, 8, 2],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1 + 0.5,
                  }}
                />
                {dot.end.label && (
                  <text
                    x={endPoint.x + 5}
                    y={endPoint.y - 5}
                    fontSize="8"
                    fill={theme === "dark" ? "#f8fafc" : "#334155"}
                    textAnchor="start"
                  >
                    {dot.end.label}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}
