import React from 'react';
import './Showreel.css';





export default function Showreel() {
    
    return (
        <div className={'showreel-wrapper'}>
            <img alt={'blah'} src={"https://drive.google.com/uc?export=download&id=1lrEjyUddsLjDaxRuWIxTkdUbrVqz-Fe3"} 
                className={'showreel__poster'}/> 
            {/*
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
              */}
        </div>
    )

}