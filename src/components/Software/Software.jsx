
import React from 'react';
import { getSoftware } from "./softwareData";
import Tooltip from '@mui/material/Tooltip';  // Alternative tooltip - http://jsfiddle.net/HJf8q/2/
import Box from '@mui/material/Box';

export default function Software() {
    const software = getSoftware();
    return ( 
    <ul className={'software__list'}>
        {software.map((softwar, i) => (
            <li key={i} className={'software__item tooltip'} >
                <Tooltip title={softwar.prettyTitle} followCursor >
                <Box sx={{ bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
                    <div className={'img-wrapper img-color-wrapper'} >
                        <img alt={softwar.name} src={`/img/logos/${softwar.name}_250x250.png`} />
                    </div>
                    <div className={'img-wrapper img-bw-wrapper'}>
                        <img alt={softwar.name} src={`/img/logos/${softwar.name}_250x250_bw.png`} />
                    </div>
                </Box>
                </Tooltip>
            </li>
        ))}
    </ul>

)
}