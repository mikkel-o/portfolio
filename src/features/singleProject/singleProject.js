import React, {useState} from "react";
import { useSelector } from "react-redux";
import { selectProject } from "./singleProjectSlice";
import Spinner from "../../components/Spinner";
import { motion } from 'framer-motion';









const SingleProject = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Etiam gravida lacus eget dui eleifend sagittis. In velit lectus, 
  luctus at facilisis nec, rutrum ac sapien. Proin ut neque faucibus, 
  elementum nunc at, iaculis metus. In urna turpis, varius elementum 
  mollis a, dapibus eget sapien. Maecenas eu libero sit amet nisi faucibus
  suscipit vel ac sapien. Curabitur tortor lectus, venenatis sit amet 
  dignissim in, maximus ac velit. Proin at fringilla magna.` ;
  const [showMore, setShowMore] = useState(false);
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
    height: isMobile ? '100%' : 'calc(100vh - 70px)', 
    
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
      duration: .8,
      delay: 1,
    }
  },
  animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: ease,
        duration: .8,
        delay: 1,
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
    y:  25,
    
    display: 'none',
    transition: {
      ease: [0.66, 0.43, 0.53, 0.96],
      duration: 1.5,
      y: {
        delay: 1
      },
      opacity: {
        delay: 1.2
      },
      display: {
        delay: 1
      }
    }
  },
  animate: {
      opacity: 1,
      y: 0,
      
      display: 'block',
      transition: {
        ease: [0.66, 0.43, 0.53, 0.96],
        duration: 1.5,
        
        y: {
          delay: 1
        },
        opacity: {
          delay: 1.2
        },
        display: {
          delay: 1
        }
      }
    },
  
};


const videoMotion = {
  initial: {
    opacity: 0,
    y: -50,
    display: 'none',
    
    transition: {
      ease: [0.66, 0.43, 0.53, 0.96],
      duration: .5,
      delay: .5,
      opacity: {
        delay: 1
      },
      height: {
        delay: .5,
        duration: .5
      },
      display: {
        delay: 0.2
      }
    }
  },
  animate: {
      opacity: 1,
      y: 0,
      
      display: 'block',
      transition: {
        ease: [0.66, 0.43, 0.53, 0.96],
        duration: .5,
        delay: .5,
        opacity: {
          delay: 1
        },
        height: {
          delay: .5,
          duration: .5
        },
        display: {
          delay: 0.2
        }
      }
    },
  
};



  if (isLoading) {
    return <Spinner />;
  }

  




  return (
    <motion.div 
      className="projects-contain" 
      initial={
        
         'initial'
      
    } 
      animate={
        'animate'
      } 
      transition={transition}
    >

      
<motion.div className={'projects-single-image-wrapper'} key={singleProject.id} style={isMobile ? {width: `100%`, height: `25vw`} :  {width: `100%`, maxHeight: `calc(100vh - 70px)`}} initial={'initial'} animate={'animate'} transition={transition}>
    
          <motion.img variants={variants} src={singleProject.img} alt="" className="project-image project-single-image" />
      
    </motion.div>

    <div className={'project-single-content'} >
    <motion.div className={'project-single-content-wrapper'} >
      <motion.h1 variants={titleMotion}>
        {singleProject.name}
      </motion.h1>
      <motion.ul className={'project-details-list'} variants={detailsMotion}>
        <li key={1}>
          <ul>
            {singleProject.length !== 0 ? singleProject.role.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {singleProject.role.length !== i + 1 ? e + ' | ' : e}
              </motion.li>
              ))
            : null }
          </ul>
        </li>
        <li key={2}>
          <ul>
            {singleProject.length !== 0 ? singleProject.technique.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {singleProject.technique.length !== i + 1 ? e + ' | ' : e}
              </motion.li>
              ))
              : null }
          </ul>
        </li>
        <li key={3}>
          <ul>
            {singleProject.length !== 0 ? singleProject.type.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {singleProject.type.length !== i + 1 ? e + ' | ' : e}
              </motion.li>
              ))
              : null }
          </ul>
        </li>
        <li key={4}>
          <ul>
            {singleProject.length !== 0 ? singleProject.company.map((e, i) => (
              <motion.li variants={titleMotion} key={i}>
                {singleProject.company.length !== i + 1 ? e + ' | ' : e}
              </motion.li>
              ))
              : null }
          </ul>
        </li> 
      </motion.ul>
      <motion.div className={'project-summary'} variants={textMotion}>
      
      
      <div className={'project-summary-text-container'}>
      <p className={ columns > 2 ? 'project-summary-texty' : showMore ? 'project-summary-texty' : 'project-summary-texty closed'}>
        { columns > 2 ? text : showMore ? text : `${text.substring(0, 200)}`}
        </p>
      
      <button className="more-less-btn" onClick={() => setShowMore(!showMore)}>
        { columns > 2 ? '' : showMore ? "Show less" : "Read more"}
      </button>
      </div>
      
      </motion.div>
      </motion.div>
      <motion.div  variants={videoMotion}
        className={'video l-grid__item'} 
      >
      <motion.div  className="c-video">
						<div className="c-video__link-container">
								<a 
                  className="c-video__link lightbox lightbox-link lightbox-video" 
                  href="https://player.vimeo.com/video/100902001?h=dcaa89d3e0&title=0&byline=0&portrait=0"
                >


                  Watch
                </a>
								
			</div>
			<video 
        
        muted="muted" 
        playsInline={true} 
        loop="loop" 
        className="c-video__video" 
        poster="/img/placeholder.jpeg">
				<source 
          type="video/mp4" 
          src="https://suncreature.com/wp-content/uploads/2021/05/Riot_Change_Your_Fate_4B_preview.mp4"
        >

        </source>
			</video>
		</motion.div>
      </motion.div>

      </div>
    
    </motion.div>
  );
};

export default SingleProject;
