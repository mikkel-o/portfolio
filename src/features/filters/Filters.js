import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { hideAllToggles} from "../../components/toggleSlice";
import { removePseudoFilter, addPseudoFilter, updateFilterCounts} from "../projects/projectsSlice";
import { removePseudoFilterPhoto, addPseudoFilterPhoto, updateFilterCountsPhoto} from "../photo/photoSlice";
import { motion } from "framer-motion";
import { toggle } from "../../components/toggleSlice";
import './Filters.css';
import { useNavigate, useLocation } from "react-router-dom";

/*- - - - - - -- - - - - ANIMATION - - - - - - - - - - - - - - */

/*const scale = {scaleY: 1.1}
const transition = {duration: .2, ease: [0.3, 0.13, 0.13, 0.96]}*/
/*const filterColors = [
  { hover: { scale: scale, transition: transition } },
  { hover: { scale: scale, transition: transition } },
  { hover: { scale: scale, transition: transition } },
  { hover: { scale: scale, transition: transition } }*/
  /*{ hover: { scale: scale, transition: transition, backgroundColor: ['#84dccd', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#89eacc', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#cdf7cb', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#fbfcce', 'rgb(255, 158, 158)'] } }*/
/*];
*/
/*
const filtersActivepan = {
  initial: { y: 0, transition: transition },
  hover: { y: 100, transition: transition }
};
const filtersActivepanTwo = {
  initial: { y: -100, transition: transition },
  animate: { y: -100, transition: transition },
  hover: { y: 0, transition: transition }
};*/



export default function Filters(props) {
  const {filtersActive, filtersAll, filtersPseudo, type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  
  
  const [isOpen, setIsOpen] = useState(false);
  
  const isFiltersMenuActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  const isFiltersMenuEmpty = filtersActive.length === 0 ? false : true;
  
  
  useOnClickOutside(ref, () => {setIsOpen(false)}); // Detect click outside filters box (try and put in seperat hook so it can be reused)
  const onClickOpen = () => {
    
    setIsOpen(!isOpen);

  };
  const onClickClearFilters = (e) => {
    document.querySelectorAll('.filters .active').forEach(child => child.classList.remove('active'))
    dispatch(hideAllToggles());
    dispatch(toggle('filters__menu__togle'))
  };
  
 
  const onClickSelectFilter = (e, index, filtersTitle) => {
    
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');  
      type === "work" ?
      dispatch(removePseudoFilter(filtersTitle[index].value ))
      :
      dispatch(removePseudoFilterPhoto(filtersTitle[index].value ));
      } else {
      e.target.classList.add('active');  
      type === "work" ?
      dispatch(addPseudoFilter(filtersTitle[index] ))
      :
      dispatch(addPseudoFilterPhoto(filtersTitle[index] ));
    }
    type === "work" ? 
      dispatch(updateFilterCounts())
      :
      dispatch(updateFilterCountsPhoto());
  };

  const onClickApplyFilters = (event, filtersPseudo) => {
    
    const newFilters = filtersPseudo;
    const params = new URLSearchParams()
    let tempArr = [];
    //dispatch(hideAllToggles('filters'));
    if (newFilters.length !== 0) {
      newFilters.forEach((filter, index) => {
        tempArr.push(filter.value);
      })
      
      params.append('filters', tempArr);
    } else {
      params.delete('filters');
    }
    navigate({pathname: location.pathname, search: params.toString()});
    setIsOpen(false);
  }
/*
  const onClickRemoveFilter = (event, filtersPseudo) => {
    console.log(event.target);
    type === "work" ?
    dispatch(removePseudoFilter(event.target.children[0].innerHTML))
    :
    dispatch(removePseudoFilterPhoto(event.target.children[0].innerHTML));
    const newFilters = filtersActive.map(item => item);
    const removeIndex = newFilters.findIndex( filter => filter.value === event.target.children[0].innerHTML );
    newFilters.splice( removeIndex, 1 );
    onClickApplyFilters(event, newFilters);
  };
  */
  return (
    <div className={`${isOpen ? 'open' : 'closed'} filters__menu-wrapper-wrapper`}>

{isOpen ? 
        
        <div ref={ref} className={`${isOpen ? 'open' : 'closed'} filters__menu-wrapper`} >
          <button 
            className={`filters__exit-btn`} 
            onClick={event => onClickOpen(event)}
          >
            <span>|</span>
            <span>|</span>
          </button>
          <div className={`filters__menu-bg`} ></div>
          {filtersAll.map( (filterGroup, index) => (
              <div className={'filter-cat__menu'} key={index}>
              <h5 className={'filter-cat__title'}>
                {filterGroup.filterGroup}
                </h5>
              <ul className={'filter-cat__list'}>
              {filterGroup.filters.map((filter, index) => (
                    <li className={'filter-cat__item'} key={index}>
                    <button 
                        onClick={e => onClickSelectFilter(e, index, filterGroup.filters)}
                        className={'filters-button filters-button-mobile'}
                      >
                        <h6 className={filtersActive.map( fil => fil.value === filter.value).includes(true) ? 'active filter-cat__item-title' : 'filter-cat__item-title'}>
                    {filter.value}
                    </h6>
                        
                      </button>
                    
                  </li>

                  ))}
            
              </ul> 
              
              </div>
              
              
              
            ))}
           
          
          {isOpen ? 
           <div className={'filters-item filters-item-apply'}>
            {(filtersActive.length > 0) ? 
              <div className={'filters clear'}>
                <button 
                  className={'filters-clear-btn'} 
                  onClick={onClickClearFilters}
                >
                  <span className={'filters-apply'}>
                     clear
                  </span>
                </button>
              </div>
              : ''}

            <button 
              className={'filters-apply-btn'}
              onClick={event => onClickApplyFilters(event, filtersPseudo)}
            >
              <span className={'filters-apply'}>
                Apply filters
              </span>
            </button>
          </div> 
          : null}
 </div>
            
            : null}
    <motion.div 
    className={isFiltersMenuActive ? isFiltersMenuEmpty ? 'filters-wrapper mobile open' : 'filters-wrapper mobile open empty' : isFiltersMenuEmpty ? 'filters-wrapper mobile' : 'filters-wrapper mobile empty'} 
      
    >

       {/*isFiltersMenuEmpty ? 
      <div className={'active-filters-wrapper'}>
        <ul 
            className={`active-filters-list`}
          >
        {filtersAll.map( (filterGroup, index) => (
          
            filtersActive.map((filter, ind) => ( filter.key === filterGroup.filterGroup ? (
              <motion.li 
                initial={'initial'}
                animate={'animate'}
                exit={'exit'}
                whileHover={'hover'}
                transition={'transition'}
                key={ind}
                className={filtersActive.some( (button) => button.key === filterGroup.filterGroup) ? `active-filters-item ${filterGroup.filterGroup}` : `active-filters-item ${filterGroup.filterGroup}`}
              >
                <motion.button
                  onClick={event => onClickRemoveFilter(event, filtersPseudo)}
                  className={`active-filter-btn`}
                >
                  <motion.span 
                    className={'active-filter-name'} 
                    variants={filtersActivepan}
                  >
                    {filter.value}
                  </motion.span>
                  <motion.span
                    className={'active-filter-remove'} 
                    variants={filtersActivepanTwo}
                  >
                    {'remove'}
                  </motion.span>
                </motion.button>
                <motion.div
                  className={'active-filter-bg'} 
                  variants={filterColors[index]}
                ></motion.div>
              </motion.li>
            ) : ''))
          
        ))}
        </ul>
      </div>
            : '' */}

      <div className={`${isOpen ? 'open' : 'closed'} filters__menu`} >
      <div className={'filter-toggle__menu'} key={0}>
              <div className={'filter-cat__title-wrapper'} onClick={event => onClickOpen(event)}>
              <button
      
      className={'filter__toggle-btn'} 
       >
      <span>|</span>
      
      <span>|</span>
      <div></div>
      <div></div>
    </button> 
               
              </div>
              {filtersActive.length > 0 ?
              <div className='active-filters__count'>
                {filtersActive.length}
              </div>
              : null
              }
              </div>
              
       
      
     
      </div>
     
    </motion.div>
    </div>
  );
}

function useOnClickOutside(ref, handler) {
  
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}