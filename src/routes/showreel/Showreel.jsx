import React from 'react';
import './Showreel.css';





export default function Showreel() {
    
    return (
        <div className={'showreel-wrapper'}>
            {/*<img alt={'blah'} src={single.collection[0].thumbUrl} className={'album__img album__img--thumb'}/> 
            <video muted={true} autoPlay={true} loop={true} height={'100%'} poster={single.thumbUrl}>
                <source src={single.videoUrl} type={'video/mp4'}></source>
            </video>*/}
            <iframe 
                title="vimeo"
               
                src={"https://player.vimeo.com/video/767311875?h=38e18a53c8"}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                width={'100%'}
                height={'100%'}
                className={'video-iframe'}>
                    
              </iframe>
        </div>
    )

}