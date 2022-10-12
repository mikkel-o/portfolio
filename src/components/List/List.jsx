import React from 'react';
import './css/List.css';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(255, 255, 255, 1)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    alignItems: 'center'
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));




export default function List(props) {
    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  

    const title = props.title,
          prefix = props.prefix;


    return (
        <div className={`${prefix}-list__wrapper list__wrapper`}>
            <h2 className={`${prefix}-list__title list__title`}>{title}</h2>
            <ul className={`${prefix}-list__list list__list`}>
                { props.list.map( (e, i) => (
                    <li className={`${prefix}-list__item list__item`}>
                    <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
        <AccordionSummary aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
        {e.period ? <h5 className={`${prefix}-list__period list__period`}><span>{e.period ? e.period[1] : ''}</span><span>{e.period ? e.period[0] : ''}</span></h5> : ''}
                            <h3 className={`${prefix}-list__name list__name`}>{e.name}</h3>
                            {e.period ? '' : <h5 className={`${prefix}-list__period list__period`}><span>{e.period ? e.period[1] : ''}</span><span>{e.period ? e.period[0] : ''}</span></h5> }
                            <h4 className={`${prefix}-list__description list__description`}>{e.description}</h4> 
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
                   
                    </li>
                )) }
            </ul>
        </div>
    );
}