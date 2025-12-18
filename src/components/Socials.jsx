import { link } from "motion/react-m";
import React, { useEffect } from "react";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
export default function Socials() {
    const [hoveredPlatform, setHoveredPlatform] = useState(null);
    const linkedinRef = React.useRef(null);
    const githubRef = React.useRef(null);
    const leetcodeRef = React.useRef(null);
    
    const getIconRef = (platform) => {
        if (platform === "linkedin") return linkedinRef;
        if (platform === "github") return githubRef;
        if (platform === "leetcode") return leetcodeRef;
        return null;
    };
    
  return (
    <div className="relative mt-6">
      <ul className="flex justify-start gap-6 relative">
        <AnimatePresence>
          {hoveredPlatform && (
            <PlatformDialog 
              platform={hoveredPlatform} 
              iconRef={getIconRef(hoveredPlatform)}
              key={hoveredPlatform}
            />
          )}
        </AnimatePresence>
        <li 
          ref={linkedinRef}
          onMouseEnter={()=>setHoveredPlatform("linkedin")} 
          onMouseLeave={()=>setHoveredPlatform(null)}
        >
          <a
            href="https://www.linkedin.com/in/sami-bhadgaokar-285833225/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00ff88] cursor-pointer transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 50 50"
            >
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
            </svg>
          </a>
        </li>

        <li 
          ref={githubRef}
          onMouseEnter={()=>setHoveredPlatform("github")} 
          onMouseLeave={()=>setHoveredPlatform(null)}
        >
          <a
            href="https://www.github.com/sami3160"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00ff88] cursor-pointer transition-colors duration-200"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                fillRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li 
          ref={leetcodeRef}
          onMouseEnter={()=>setHoveredPlatform("leetcode")} 
          onMouseLeave={()=>setHoveredPlatform(null)}
        >
          <a
            href="https://www.leetcode.com/sami3160"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00ff88] cursor-pointer transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
              id="leetcode"
            >
              <path d="M20.303 16.047h-9.561c-.936 0-1.697-.803-1.697-1.79s.762-1.79 1.697-1.79h9.561c.936 0 1.697.803 1.697 1.79s-.762 1.79-1.697 1.79zm-9.561-2.58c-.385 0-.697.354-.697.79s.312.79.697.79h9.561c.385 0 .697-.354.697-.79s-.312-.79-.697-.79h-9.561z"></path>
              <path d="M11.618 24c-1.604 0-2.977-.533-3.97-1.541L3.55 18.278C2.551 17.262 2 15.819 2 14.215c0-1.578.551-3.008 1.552-4.025L13.071.509c.66-.67 1.829-.652 2.506.036.694.706.71 1.839.034 2.524l-1.762 1.816a5.25 5.25 0 0 1 1.739 1.159l2.463 2.53c.672.684.655 1.815-.039 2.521a1.79 1.79 0 0 1-1.284.545c-.464 0-.896-.181-1.219-.509l-2.536-2.492c-.321-.327-.779-.49-1.367-.49-.606 0-1.069.157-1.375.469l-4.067 4.194c-.342.349-.521.831-.521 1.4 0 .577.189 1.101.519 1.436l4.083 4.182c.315.321.774.484 1.362.484s1.045-.163 1.36-.484l2.549-2.505a1.687 1.687 0 0 1 1.209-.503h.002c.483 0 .939.194 1.286.546.693.705.71 1.837.036 2.522l-2.457 2.525C14.586 23.438 13.176 24 11.618 24zM14.29 1a.703.703 0 0 0-.507.21l-9.519 9.681C3.449 11.72 3 12.9 3 14.215c0 1.341.449 2.535 1.265 3.363l.001.001 4.097 4.18C9.162 22.57 10.288 23 11.618 23c1.288 0 2.444-.455 3.258-1.282l2.457-2.525c.295-.301.279-.804-.034-1.122a.801.801 0 0 0-.573-.247h-.001a.703.703 0 0 0-.502.209l-2.549 2.505c-.497.507-1.214.778-2.068.778s-1.572-.271-2.076-.784L5.446 16.35c-.519-.527-.805-1.286-.805-2.136 0-.824.286-1.57.806-2.099l4.067-4.194c.503-.512 1.206-.771 2.091-.771.854 0 1.571.271 2.074.783l2.536 2.492a.705.705 0 0 0 .512.216.798.798 0 0 0 .571-.246c.313-.319.33-.822.037-1.121l-2.461-2.528a4.238 4.238 0 0 0-2.028-1.137c-.175-.041-.331-.176-.382-.349s-.021-.363.104-.492l2.325-2.398c.298-.302.282-.805-.031-1.124A.799.799 0 0 0 14.29 1z"></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}
const PlatformDialog=({platform, iconRef})=>{
    const [message, setMessage] = React.useState("");
    const [position, setPosition] = React.useState({ left: 0, top: 0 });
    
    React.useEffect(() => {
        if (platform && iconRef?.current) {
            const dialogsList={
                github:["I see you are interested in GitHub!", "Ahh, Man of Culture I see", "Well recently its dry mostly", "Thats nothing less than a deseart","WARNING: If you fear Js, leave now"],
                leetcode:["Nahh, its not that impressive...", "Im not the DSA guy to begin with", "Really wanna see that??", "WAIT WAIT WAIT WAIT WAIT, NO NO NO NO NO!!", "Could have visited github over this"],
                linkedin:["Hmm LinkedIn, classic!", "Lots of info there...", "Its boring", "Nothing much to flex there", "Wanna connect?..","Btw i use it for depression doses only", "Accept disoppointment before you go there" ]
            };
            const messages = dialogsList[platform] || [];
            setMessage(messages[Math.floor(Math.random()*messages.length)]);
            
            // Calculate position relative to icon
            const rect = iconRef.current.getBoundingClientRect();
            const parentRect = iconRef.current.closest('ul')?.getBoundingClientRect();
            if (parentRect) {
                setPosition({
                    left: rect.left - parentRect.left + rect.width / 2,
                    top: -45
                });
            }
        }
    }, [platform, iconRef]);
    
    if(!platform || !message)return null
    
    return (
        <motion.div 
            className="absolute pointer-events-none z-20"
            style={{
                left: `${position.left}px`,
                top: `${position.top}px`,
                transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <div className="bg-black/95 backdrop-blur-sm border border-gray-700 text-gray-300 py-2 px-4 rounded shadow-lg w-fit max-w-xs" style={{ fontFamily: "Geist Light", fontSize: "0.85rem" }}>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <span>{message}</span>
                </div>
                {/* Arrow pointer */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-gray-700"></div>
            </div>
        </motion.div>
    );
}