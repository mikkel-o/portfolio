import React from "react";
import { motion } from "framer-motion";

export function AlbumContainer(props) {
    const {children, layout, scroll} = props;
  return (
    <motion.div 
    className={`album__container ${layout === "mix" ? "album__container--mix" : null} ${scroll === "snap" ? "album__container--scroll" : null}`}
    initial={'initial'} 
    animate={'animate'} 
    exit={'exit'} 
    transition={{duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}} 
    >
      {children}
    </motion.div>
  )
}