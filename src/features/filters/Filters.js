import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { hideAllToggles} from "../../components/toggleSlice";
import { removePseudoFilter, addPseudoFilter, updateFilterCounts} from "../projects/projectsSlice";
import { removePseudoFilterPhoto, addPseudoFilterPhoto, updateFilterCountsPhoto} from "../photo/photoSlice";
import { motion } from "framer-motion";

import { toggle } from "../../components/toggleSlice";
import './Filters.css';
import { useNavigate, useLocation } from "react-router-dom";

/*- - - - - - -- - - - - ANIMATION - - - - - - - - - - - - - - */


export default function Filters(props) {
  const {filtersActive, filtersAll, filtersPseudo, type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();

  const isFiltersMenuActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  const isFiltersMenuEmpty = filtersActive.length === 0 ? false : true;

  
  useOnClickOutside(ref, () => {dispatch(hideAllToggles('filters'));}); // Detect click outside filters box (try and put in seperat hook so it can be reused)

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
      <div className={'filters__menu'} >
              
        {filtersAll.map( (filterGroup, index) => (
              <div className={'filter-cat__menu'} key={index}>
              <div className={'filter-cat__title-wrapper'} >
                <h5 className={'filter-cat__title'}>
                {filterGroup.filterGroup}
                </h5>
              </div>
              <ul className={'filter-cat__list'}>
              {filterGroup.filters.map((filter, index) => (
                    <li className={'filter-cat__item'} key={index}>
                    <button 
                        onClick={e => onClickSelectFilter(e, index, filterGroup.filters)}
                        className={filtersActive.map( fil => fil.value === filter.value).includes(true) ? 'active filters-button filters-button-mobile' : 'filters-button filters-button-mobile'}
                      >
                        <h6 className={'filter-cat__item-title'}>
                    {filter.value}
                    </h6>
                        
                      </button>
                    
                  </li>

                  ))}
                
              </ul> 
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
              </div>
              
              
              
            ))}
       <div className={'filter-cat__menu'} key={0}>
              <div className={'filter-cat__title-wrapper'} >
                <h5 className={'filter-cat__title'}>
                all
                </h5>
              </div>
              </div>
     
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