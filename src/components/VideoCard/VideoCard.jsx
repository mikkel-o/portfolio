import React, {useEffect, useRef, useState} from 'react';






export default function VideoCard(props) {
    const {src, poster} = props;
   
  const ref = useRef();
 const [isIntersecting, setIsIntersecting] = useState(false);
    
  //const isColumnCount = useSelector(state => state.toggle.layout);
   

  useEffect(() => {
    
      const observer = new IntersectionObserver(
        ([entry]) => { 
                setIsIntersecting(entry.isIntersecting);
            },
            {
                rootMargin: "0px",
                threshold: .05
            }
        );
       if (isIntersecting) {
            //ref.current.currentTime=0;
            ref.current.play();
        } else {
            ref.current.pause();
            //ref.current.currentTime=0;
        }
        observer.observe(ref.current);
    }, [ref, isIntersecting]);



    return (
      
        <video 
        ref={ref}
        className={`album__video album__video--scroll`}
        src={src} 
        poster={poster}
        
        loop
        autoPlay={0}
        muted
        playsInline
        
       ></video>
    )

}