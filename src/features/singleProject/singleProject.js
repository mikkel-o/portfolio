import React from "react";
import { useSelector } from "react-redux";
import { selectProject } from "./singleProjectSlice";
import Spinner from "../../components/Spinner";
import { motion } from 'framer-motion';








const SingleProject = () => {
  
  const singleProject = useSelector(selectProject);

  const { isLoading } = useSelector((state) => state.singleProject);

  const startingCoord = useSelector(state => state.singleProject.coord);

  const isMobile = useSelector(state => state.toggle.isMobile);
console.log(isMobile);
const transition = {duration: .5, ease: [0.66, 0.43, 0.53, 0.96]}


// the below parameters work mainly for one column layout. need to find a way to add multiples per amount of columns.

const duration = 0.1,
      ease = [.33, .13, .63, .96];

const variants = {
  initial: {

    scaleX: 1,
    y: startingCoord[1],
    x: isMobile ? startingCoord[0] - 15  : startingCoord[0] - startingCoord[2] - 100,
    //
    width: startingCoord[2],
    height: startingCoord[3],
    transition: {
      ease: ease,
      duration,


      y: {
        delay: duration,
        duration: .5
      },
      height: {
        delay: duration,
        duration: .5
      }
    }
  },
  animate: {

    scaleX: 1,
    y: 50, 
    x:  0,
    width: '100%',
    height: '33%',
    transition: {
      ease: ease,
      duration,


      y: {
        delay: duration,
        duration: .5
      },
      height: {
        delay: duration,
        duration: .5
      }
      
    }
  }
};






  if (isLoading) {
    return <Spinner />;
  }

  
console.log(startingCoord);

  return (
    <motion.div 
      className="projects-contain" 
      initial={
        {
          originX: 1,
        width: isMobile ? 'calc(100% - 30px)' : 'calc(100% - 160px)',
        height: '75%',
      }
    } 
      animate={
        {
          width: isMobile ? 'calc(100% - 30px)' : 'calc(100% - 160px)',
          height: '75%',
        }
      } 
      transition={transition}
    >

      
<motion.div key={singleProject.id} style={{width: `${startingCoord[2]}`, height: `${startingCoord[3]}`}} className="" initial={'initial'} animate={'animate'} transition={transition}>
      
      
        
          
          <motion.img variants={variants} src={singleProject.img} alt="" className="project-image" />
          
        
        
        
      
      
    </motion.div>
      
    </motion.div>
  );
};

export default SingleProject;
