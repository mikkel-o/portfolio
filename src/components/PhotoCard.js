
import React, {useEffect, useRef, useMemo, useState} from 'react';
import CollectionsIcon from '@mui/icons-material/Collections';
import {motion} from "framer-motion";



function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);
  
    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting),
        ),
      [],
    );
  
    useEffect(() => {
      
      observer.observe(ref.current);
  
      return () => {
        observer.disconnect();
      };
    
    }, [ref, observer]);
  
    return isIntersecting;
  }


export default function PhotoCard({singl, i, albu}) {
const ref = useRef();
const single = singl;
const isInViewport = useIsInViewport(ref);  


  return (

    <motion.div 
      ref={ref} 
      style={{height: '100%'}}
      
      className={isInViewport ? 'inView' : 'notInView'}
      key={i}
      >
              <div className={'album__link'} >
            
                {(single.collection) ? <img alt={'blah'} src={single.collection[0].thumbUrl} className={'album__img album__img--thumb'}/> : single.videoUrl ? <video muted={true} autoPlay={true} start={"1"} loop={true} height={'100%'} poster={single.thumbUrl}><source src={single.videoUrl} type={'video/mp4'}></source></video> : <img alt={'blah'} src={single.thumbUrl} className={'album__img album__img--thumb'}/>}
                {(single.collection) ? <CollectionsIcon className={'collection__icon'}></CollectionsIcon> : ''}
                </div>
            </motion.div>
  );
}

  
  
  
  
  