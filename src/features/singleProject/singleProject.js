import React, {useState} from "react";
import { useSelector } from "react-redux";
import { selectProject } from "./singleProjectSlice";
import Spinner from "../../components/Spinner";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Etiam gravida lacus eget dui eleifend sagittis. In velit lectus, 
  luctus at facilisis nec, rutrum ac sapien. Proin ut neque faucibus, 
  elementum nunc at, iaculis metus. In urna turpis, varius elementum 
  mollis a, dapibus eget sapien. Maecenas eu libero sit amet nisi faucibus
  suscipit vel ac sapien. Curabitur tortor lectus, venenatis sit amet 
  dignissim in, maximus ac velit. Proin at fringilla magna.` ;
const textIntro = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Etiam gravida lacus eget dui eleifend sagittis. In velit lectus, 
  luctus at facilisis nec, rutrum ac sapien.` ;
  

export function SingleVideo(props) {
  const {activeFilm} = props;
  return (
    activeFilm.id ? 
      <motion.div className={'projects-single-image-wrapper'} key={activeFilm.id}   >
        { activeFilm.embed.id ?
            <VideoPlayer 
              position={activeFilm.position} 
              posterVid={activeFilm.vid} 
              posterImg={activeFilm.img} 
              host={activeFilm.embed.host} 
              id={activeFilm.embed.id} 
            ></VideoPlayer>
          :
            null
        }
      </motion.div>
    :
      null
  )
}

const SingleProject = (props) => {
  document.documentElement.classList.add(`trans-nav`);
  const [showMore, setShowMore] = useState(false);
  const columns = useSelector(state => state.toggle.columnCount);
  const singleProject = useSelector(selectProject);
  const { isLoading } = useSelector((state) => state.singleProject);
  const transition = {duration: .5, ease: [0.66, 0.43, 0.53, 0.96]}
  const film = props.film;
  const activeFilm = singleProject.album ? singleProject.album.find(item => item.name === film) : singleProject;
//const isMobile = useSelector(state => state.toggle.isMobile);
  const ease = [.33, .13, .63, .96];
  
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
    exit: {
      y: 100,
      opacity: 0,
      transition: transition
    }
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
      exit: {
        y: 100,
        opacity: 0,
        transition: transition
      }
    
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
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        ease: [0.66, 0.43, 0.53, 0.96],
        duration: .5,
      }
    }
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
      exit: {
        y: 200,
        opacity: 0,
        transition: {
          ease: ease,
          y: {
            duration: .8,
          },
          opacity: {
            
            duration: .3
          },
        }
      }
    
  };

  const navigate = useNavigate();
  const goToPosts = (event, c) => {
    const param = c ? c.replace(/\s/g, '+') : '';
    window.history.replaceState({}, "", c ? `?filters=${param}` : '?filters=')
    navigate({
      pathname: '/work',
      search: c ? `?filters=${param}` : '',
    });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <motion.div 
      className="projects-single-contain" 
      initial={'initial'} 
      animate={'animate'} 
      exit={'exit'}
      transition={transition}
    >
      <div 
        className={'project-single-content'} 
      >
        <motion.div 
          className={'project-single-content-wrapper'} 
        >
          <motion.div 
            className={'project-single-wraps'} 
          >
            <SingleVideo
              activeFilm={activeFilm}
            ></SingleVideo>
    
            <motion.ul 
              className={'project-single-details-list'} 
              variants={detailsMotion}
            >
              <li key={1}>
                <ul>
                  {singleProject.length !== 0 ? singleProject.role.map((e, i) => (
                    <motion.li 
                      className={'project-single-details'} 
                      variants={titleMotion} 
                      key={i} 
                      onClick={event => goToPosts(event, e)}
                    >
                      {e}
                    </motion.li>
                  ))
                  : null }
                </ul>
              </li>
              <li key={2}>
                <ul>
                  {singleProject.length !== 0 ? singleProject.style.map((e, i) => (
                    <motion.li 
                      className={'project-single-details'} 
                      variants={titleMotion} 
                      key={i} 
                      onClick={event => goToPosts(event, e)}
                    >
                      {e}
                    </motion.li>
                  )) : null }
                </ul>
              </li>
              <li key={3}>
                <ul>
                  {singleProject.length !== 0 ? singleProject.type.map((e, i) => (
                    <motion.li 
                      className={'project-single-details'} 
                      variants={titleMotion} 
                      key={i} 
                      onClick={event => goToPosts(event, e)}
                    >
                      {e}
                    </motion.li>
                    ))
                    : null }
                </ul>
              </li>
              <li key={4}>
                <ul>
                  {singleProject.length !== 0 ? singleProject.company.map((e, i) => (
                    <motion.li 
                      className={'project-single-details'} 
                      variants={titleMotion} 
                      key={i} 
                      onClick={event => goToPosts(event, e)}
                    >
                      {e}
                    </motion.li>
                    ))
                    : null }
                </ul>
              </li> 
      </motion.ul>
      
      <motion.h1 variants={titleMotion}>
        {singleProject.name ? singleProject.name.replace(/-/g, ' ') : ''}
      </motion.h1>

      <motion.div className={'project-single-intro'} variants={textMotion}>
        <motion.div variants={textMotion} className={'project-single-intro-text-container'}>
          <p className={ columns > 2 ? 'project-single-intro-texty' : 'project-single-intro-texty'}>
            {textIntro}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>

    <motion.div className={'project-single-summary'} variants={textMotion}>
      <div className={'project-single-summary-text-container'}>
        <p className={ columns > 2 ? 'project-single-summary-texty' : showMore ? 'project-single-summary-texty' : 'project-single-summary-texty closed'}>
          { columns > 2 ? text : showMore ? text : `${text.substring(0, 200)}`}
        </p>
        <button className="more-less-btn" onClick={() => setShowMore(!showMore)}>
          { columns > 2 ? '' : showMore ? "Show less" : "Read more"}
        </button>
      </div>
    </motion.div>

    {singleProject.album && singleProject.album.length !== 0 ? 
    <div className={'video-wrapper'}>{
      singleProject.album.map((e, i) => 
        <motion.div
          className={'video l-grid__item l-grid__item--album'} 
          key={i}
          variants={videoMotion}
        >
          <motion.div  className="c-video" >
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
              poster={e.img}
            >
              <source 
              type="video/mp4" 
              src="https://suncreature.com/wp-content/uploads/2021/05/Riot_Change_Your_Fate_4B_preview.mp4"
              ></source>
            </video>
      </motion.div>
    </motion.div> 
    )
      }</div>
    :   //variants={videoMotion}
      <motion.div  
        className={'video l-grid__item'} 
        variants={videoMotion}
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
            poster="/img/placeholder.jpeg"
          >
				    <source 
            type="video/mp4" 
            src="https://suncreature.com/wp-content/uploads/2021/05/Riot_Change_Your_Fate_4B_preview.mp4"
            ></source>
			    </video>
		    </motion.div>
      </motion.div>}



      </motion.div>

      </div>
    
    </motion.div>
  );
};

export default SingleProject;

//.projects-single-image-wrapper
//style={isMobile ? {height: `25vw`} :  {width: `100%`, maxHeight: `calc(100vh - 30px)`}}





/*




      







  














    
      */