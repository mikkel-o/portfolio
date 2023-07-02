import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { hideAllToggles} from "../../components/toggleSlice";
import { setPseudoFilters, removePseudoFilter, addPseudoFilter, updateFilterCounts} from "../projects/projectsSlice";
import { setPseudoFiltersPhoto, removePseudoFilterPhoto, addPseudoFilterPhoto, updateFilterCountsPhoto} from "../photo/photoSlice";
import { motion } from "framer-motion";
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";
import './Filters.css';
import { useNavigate, useLocation } from "react-router-dom";

/*- - - - - - -- - - - - ANIMATION - - - - - - - - - - - - - - */

const scale = {scaleY: 1.1}
const transition = {duration: .2, ease: [0.3, 0.13, 0.13, 0.96]}
const filterColors = [
  { hover: { scale: scale, transition: transition } },
  { hover: { scale: scale, transition: transition } },
  { hover: { scale: scale, transition: transition } },
  { hover: { scale: scale, transition: transition } }
  /*{ hover: { scale: scale, transition: transition, backgroundColor: ['#84dccd', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#89eacc', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#cdf7cb', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#fbfcce', 'rgb(255, 158, 158)'] } }*/
];
const filtersActivepan = {
  initial: { y: 0, transition: transition },
  hover: { y: 100, transition: transition }
};
const filtersActivepanTwo = {
  initial: { y: -100, transition: transition },
  animate: { y: -100, transition: transition },
  hover: { y: 0, transition: transition }
};

export default function Filters(props) {
  const {filtersActive, filtersAll, filtersPseudo, type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();

  const isFiltersMenuActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  const isFiltersMenuEmpty = filtersActive.length === 0 ? false : true;

  const onClickToggleFiltersMenu = (event, name) => { 
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
    } else {
      event.target.classList.add('active');
      type === "work" ? 
      dispatch(setPseudoFilters(filtersActive))
      :
      dispatch(setPseudoFiltersPhoto(filtersActive));
    }
      dispatch(toggle(`${name}`))
      type === "work" ? 
      dispatch(updateFilterCounts())
      :
      dispatch(updateFilterCountsPhoto());
  }  
  useOnClickOutside(ref, () => {dispatch(hideAllToggles('filters'));}); // Detect click outside filters box (try and put in seperat hook so it can be reused)

  const onClickClearFilters = (e) => {
    document.querySelectorAll('.filters .active').forEach(child => child.classList.remove('active'))
    dispatch(hideAllToggles());
    dispatch(toggle('filters__menu__togle'))
  };
  
  const onClickRemoveFilter = (event, filtersPseudo) => {
    type === "work" ?
    dispatch(removePseudoFilter(event.target.children[0].innerHTML))
    :
    dispatch(removePseudoFilterPhoto(event.target.children[0].innerHTML));
    const newFilters = filtersActive.map(item => item);
    const removeIndex = newFilters.findIndex( filter => filter.value === event.target.children[0].innerHTML );
    newFilters.splice( removeIndex, 1 );
    onClickApplyFilters(event, newFilters);
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
    dispatch(hideAllToggles('filters'));
    if (newFilters.length !== 0) {
      newFilters.forEach((filter, index) => {
        tempArr.push(filter.value);
      })
      params.append('filters', tempArr);
    } else {
      params.delete('filters');
    }
    navigate({pathname: location.pathname, search: params.toString()});
  }

  
  return (
    <motion.div 
      className={isFiltersMenuActive ? isFiltersMenuEmpty ? 'filters-wrapper mobile open' : 'filters-wrapper mobile open empty' : isFiltersMenuEmpty ? 'filters-wrapper mobile' : 'filters-wrapper mobile empty'} 
      ref={ref} 
    >
      {/*                  FILTERS MENU                   */}
      <div className={'projects-counter'}>
        <motion.button 
          onClick={event => onClickToggleFiltersMenu(event, ('filters__menu__mobile'))} 
          className={'filters-mobile-btn '}
        >
          {/*{isFiltersMenuActive ? projectedCount : countCurrent }  */}
          {/*  
          {isFiltersMenuActive ? 
          <div style={{display: 'inline-block'}}>
            <span className={'projects-counter-current'}>{ projectsActive.length }</span>
            <span className={'projects-counter-total'}>{` / ${projectsAll.length}`}</span>
          </div>
           : 
           'filters' } 
           */}
        {/*          
          <span className={'projects-counter-current'}>{ projectsActive.length }</span>
          <span className={'projects-counter-total'}>{` / ${projectsAll.length}`}</span>
        */}
        filters
        </motion.button>
      </div>
      
      {/*                   ACTIVE FILTERS                   */}
      {isFiltersMenuEmpty ? 
      <div className={'active-filters-wrapper'}>
        {filtersAll.map( (filterGroup, index) => (
          <ul 
            className={filtersActive.some( (button) => button.key === filterGroup.filterGroup) ? `active-filters-list ${filterGroup.filterGroup}` : `no-margin active-filters-list ${filterGroup.filterGroup}`}
            key={index}
          >
            {filtersActive.map((filter, ind) => ( filter.key === filterGroup.filterGroup ? (
              <motion.li 
                initial={'initial'}
                animate={'animate'}
                exit={'exit'}
                whileHover={'hover'}
                transition={'transition'}
                key={ind}
                className={`active-filters-item`}
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
            ) : ''))}
          </ul>
        ))}
      </div>
        : '' }
      <div className={'filters-ref-wrapper filters-ref-wrapper-mobile'}>
        <Toggle id={'filters__menu__mobile'}>
          <div className={'bleh'}>
            {filtersAll.map( (filterGroup, index) => (
              <div
                className={`filters  filters-mobile ${filterGroup.filterGroup}`}
                key={index}
              >  
                <h4 className={'filters-title'}>
                  {filterGroup.filterGroup}
                </h4>
                <ul className={'filters-list-mobile'}>
                  {filterGroup.filters.map((filter, index) => (
                    <li 
                      key={index}
                      className={(filter.countPseudo === 0) ? 'inactive filters-item' : 'filters-item'}
                    >
                      <button 
                        onClick={e => onClickSelectFilter(e, index, filterGroup.filters)}
                        className={filtersActive.map( fil => fil.value === filter.value).includes(true) ? 'active filters-button filters-button-mobile' : 'filters-button filters-button-mobile'}
                      >
                        <span className={'filter-name'}>
                          {filter.value}
                        </span>
                        <span className={'filter-count-filter'}>
                          {filter.countPseudo + ' '}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
              
          <div className={'filters-item filters-item-apply'}>
            {(filtersActive.length > 0) ? 
              <div className={'filters clear'}>
                <button 
                  className={'filters-clear-btn'} 
                  onClick={onClickClearFilters}
                >
                  <h4 className={'filters-clear-title'}>
                    {isFiltersMenuActive ?  'clear' : ''}
                  </h4>
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
        </Toggle>
      </div>
    </motion.div>
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