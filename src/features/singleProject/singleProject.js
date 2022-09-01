import React from "react";
import { useSelector } from "react-redux";
import { selectProject } from "./singleProjectSlice";
import Spinner from "../../components/Spinner";
import { motion } from 'framer-motion';









const SingleProject = () => {
  console.log(useSelector(state => state));
  const columns = useSelector(state => state.toggle.columnCount);
  console.log(columns);
  const singleProject = useSelector(selectProject);

  const { isLoading } = useSelector((state) => state.singleProject);

  const startingCoord = useSelector(state => state.singleProject.coord);

  const isMobile = useSelector(state => state.toggle.isMobile);
console.log(isMobile);
const transition = {duration: .5, ease: [0.66, 0.43, 0.53, 0.96]}


// the below parameters work mainly for one column layout. need to find a way to add multiples per amount of columns.

const duration = columns === 1 ? .1 : .5,
      ease = [.33, .13, .63, .96];
console.log(startingCoord)
const variants = {
  initial: {
    y: columns === 1 ? 
      startingCoord[4] === 0 ? startingCoord[1] - 50 : startingCoord[1] - 50
    : startingCoord[1] - 50,
    x: isMobile ?  
        columns === 1 ? 
          startingCoord[0] - 15 : 
          columns === 2 ? 
            startingCoord[0] - startingCoord[2] - 35 : ''
      : columns === 3 ? 
          startingCoord[0] - 80: 
          columns === 4 ? 
            startingCoord[0] - 80 : '',
    width: startingCoord[2],
    height: startingCoord[3],
    
  },
  animate: {

    
    y:  0, 
    x:  0,
    width: '100%',
    height: '100%', 
    
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


const titleMotion = {
  initial: {
    opacity: 0,
    y: 10,
    transition: {
      ease: ease,
      duration: .5,
      delay: .5,
    }
  },
  animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: ease,
        duration: .5,
        delay: .5,
      }
    },
  
};

const detailsMotion = {
  initial: {
    opacity: 0,
    y: 10,
    transition: {
      ease: ease,
      duration: .5,
      delay: 1,
    }
  },
  animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: ease,
        duration: .5,
        delay: 1,
      }
    },
  
};

const textMotion = {
  initial: {
    opacity: 0,
    x: -50,
    height: '0',
    display: 'none',
    transition: {
      ease: ease,
      duration: .5,
      delay: 1,
      height: {
        delay: 2,
        duration: .5
      },
      display: {
        delay: 1
      }
    }
  },
  animate: {
      opacity: 1,
      x: 0,
      height: '100%', 
      display: 'block',
      transition: {
        ease: ease,
        duration: .5,
        delay: 1,
        height: {
          delay: 2,
          duration: .5
        },
        display: {
          delay: 1
        }
      }
    },
  
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
          originX: 0,
        //width: isMobile ? 'calc(100% - 30px)' : 'calc(100% - 160px)',
        height: isMobile ? '75%' : 'calc(100vh - 65px)',
      }
    } 
      animate={
        {
          //width: isMobile ? 'calc(100% - 30px)' : 'calc(100% - 160px)',
          height: isMobile ? '75%' : 'calc(100vh - 65px)',
        }
      } 
      transition={transition}
    >

      
<motion.div className={'projects-single-image-wrapper'} key={singleProject.id} style={isMobile ? {width: `100%`, height: `33vh`} :  {width: `100%`, height: `100%`}} initial={'initial'} animate={'animate'} transition={transition}>
    
          <motion.img variants={variants} src={singleProject.img} alt="" className="project-image project-single-image" />
      
    </motion.div>


    <motion.div className={'project-single-content-wrapper'} initial={'initial'} animate={'animate'} exit={'exit'}>
      <motion.h1 variants={titleMotion}>
        {singleProject.name}
      </motion.h1>
      <motion.ul className={'project-details-list'} variants={detailsMotion}>
        <li key={1}>
          <ul>
            {singleProject.length !== 0 ? singleProject.role.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {e}
              </motion.li>
              ))
            : null }
          </ul>
        </li>
        <li key={2}>
          <ul>
            {singleProject.length !== 0 ? singleProject.technique.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {e}
              </motion.li>
              ))
              : null }
          </ul>
        </li>
        <li key={3}>
          <ul>
            {singleProject.length !== 0 ? singleProject.type.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {e}
              </motion.li>
              ))
              : null }
          </ul>
        </li>
        <li key={4}>
          <ul>
            {singleProject.length !== 0 ? singleProject.company.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {e}
              </motion.li>
              ))
              : null }
          </ul>
        </li> 
      </motion.ul>
      <motion.p className={'project-summary'} variants={textMotion}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Etiam gravida lacus eget dui eleifend sagittis. In velit lectus, 
      luctus at facilisis nec, rutrum ac sapien. Proin ut neque faucibus, 
      elementum nunc at, iaculis metus. In urna turpis, varius elementum 
      mollis a, dapibus eget sapien. Maecenas eu libero sit amet nisi faucibus
      suscipit vel ac sapien. Curabitur tortor lectus, venenatis sit amet 
      dignissim in, maximus ac velit. Proin at fringilla magna. 
      </motion.p>
    </motion.div>
      
    </motion.div>
  );
};

export default SingleProject;
