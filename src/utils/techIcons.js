import { 
  SiReact, SiTailwindcss, SiMui, SiFramer, SiThreedotjs,
  SiNodedotjs, SiDjango, SiSpring, SiSocketdotio, SiExpress, SiJsonwebtokens,
  SiDocker, SiKubernetes, SiMongodb, SiFirebase, SiPostgresql,
  SiLinux,  SiPortswigger, SiPython, SiJavascript, SiTypescript,
  SiGithub, SiGimp, SiAmazonwebservices
} from 'react-icons/si';
import { FaEye,FaJava } from 'react-icons/fa';
import { FaDatabase, FaRobot } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';

// Tech icons mapping with React Icons
export const techIcons = {
  // Frontend
  "React": SiReact,
  "Tailwind": SiTailwindcss,
  "Material-UI (Basic)": SiMui,
  "Framer-Motion": SiFramer,
  "ThreeJs (Learning)": SiThreedotjs,
  
  // Backend
  "Node.js": SiNodedotjs,
  "Django (Basic)": SiDjango,
  "Spring Boot (New)": SiSpring,
  "socket.io": SiSocketdotio,
  "Express.js": SiExpress,
  "jsonwebtoken": SiJsonwebtokens,
  
  // DevOps
  "Docker (Basics)": SiDocker,
  "Kubernetes (Learning)": SiKubernetes,
  "docker-compose (Learning)": SiDocker,
  "AWS (Basic)": SiAmazonwebservices,
  
  // Database
  "MongoDB": SiMongodb,
  "Firebase (Basic)": SiFirebase,
  "PostgreSql": SiPostgresql,
  "SQL": FaDatabase,
  
  // Security
  "Linux, Parrot OS": SiLinux,
  "Nmap (Learning)": FiEye,
  "PortSwigger (Learning)": SiPortswigger,
  
  // ML
  "MediaPipe (Using for pose estimation)": FaRobot,
  
  // Languages
  "Javascript (TypeScript)": SiJavascript,
  "TypeScript": SiTypescript,
  "Java": FaJava,
  "Python": SiPython,
  "SQL": FaDatabase,
  
  // Tools
  "GitHub": SiGithub,
  "GIMP": SiGimp,
  "Linux": SiLinux
};

// One Piece references for skills
export const onePieceQuotes = [
  "🏴‍☠️ The Will of D continues...",
  "⚓ Set sail for the Grand Line!",
  "🍖 Meat! Meat! Meat!",
  "👒 I'm gonna be King of the Pirates!",
  "🗡️ Three Sword Style!",
  "💨 Gear Second!",
  "🔥 Ace would be proud!",
  "🌊 The sea is calling!",
  "⚔️ Nothing happened...",
  "🎯 Haki activated!"
];

export const getOnePieceQuote = () => {
  return onePieceQuotes[Math.floor(Math.random() * onePieceQuotes.length)];
};
