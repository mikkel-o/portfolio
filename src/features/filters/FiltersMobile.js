import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectAllProjects, selectFilteredAllProjects } from "../allProjects/allProjectsSlice";
import { hideAllToggles} from "../../components/toggleSlice";
import {
  addActiveFilter,
  removeActiveFilter ,
  clearActiveFilters,
  projectedCounts
} from './filtersSlice'
import { motion } from "framer-motion";
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";
import './FiltersMobile.css';
/*- - - - - - -- - - - - - - - - - - - - - - - - - - - - - - -*\
|                        ANIMATION                             |
\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Constants
const scale = {scaleY: 1.1}
const transition = {duration: .2, ease: [0.3, 0.13, 0.13, 0.96]}


// Variants
const filterColors = [
  { hover: { scale: scale, transition: transition, backgroundColor: ['#84dccd', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#89eacc', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#cdf7cb', 'rgb(255, 158, 158)'] } },
  { hover: { scale: scale, transition: transition, backgroundColor: ['#fbfcce', 'rgb(255, 158, 158)'] } }
];
const activeFilterSpan = {
  initial: { y: 0, transition: transition },
  hover: { y: 100, transition: transition }
};
const activeFilterSpanTwo = {
  initial: { y: -100, transition: transition },
  animate: { y: -100, transition: transition },
  hover: { y: 0, transition: transition }
};



/*-  - - - - - -- - - - - - - - - - - - - - -  - - - - - - - -*\
|                         COMPONENT                            |
\*-  - - - - - - - - - - - - - - - - - - - - -  - - - - - - - */

export default function FiltersMobile(filtersTitles) {


  
/*                       DECLARATIONS                         */
  
  // Redux store data calls

  const dispatch = useDispatch();
  const ref = useRef();
  const allProjects = useSelector(selectAllProjects);
  const allFilteredProjects = useSelector(selectFilteredAllProjects);
  const projectedCount = useSelector(state => state.filter.projectedCount);
  const activeFilters = useSelector(state => state.filter.activeFilters);
  const toggleState = useSelector((state) => state.toggle);
  const toggleIdSuffix = '_toggle';
  const toggleIdPrefix = 'filters_';


  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];
const isEmpty = activeFilters.length === 0 ? false : true;
  // Arrays
  

  let filters = [];
  const filterTitles = filtersTitles.filtersTitles; 



let totalFilterAppearance = [];

let all;

  /*                       CLICK HANDLERS                         */
  
  // Clear toggles for temporary filters
  
  const onClickClearHandler = (e) => {
    document.querySelectorAll('.filters .active').forEach(child => child.classList.remove('active'))
    dispatch(clearActiveFilters());
    dispatch(hideAllToggles());
    dispatch(toggle('filters__menu__togle'))
  };
  
  // Remove active filter
  
  const onClickChangeHandler = (e) => {
    dispatch(removeActiveFilter(
      e.target.children[0].innerHTML
    ))  
  };
  
  
  // Open/close menu
  const onClickToggleMenu = (event, name) => { 
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
    } else {
      event.target.classList.add('active');
    }
      dispatch(toggle(`${name}`))
  }
  
  // Detect click outside filters box (try and put in seperat hook so it can be reused)
  useOnClickOutside(ref, () => {dispatch(hideAllToggles('filters')); dispatch(projectedCounts(allFilteredProjects.length))});
let newListIndex = [];
const oldList = activeFilters;
let newList = [];
oldList.forEach(item => newList.push(item));


  const onClickSelectFilter = (e, index, filtersTitle) => {
    
    if (e.target.classList.contains('active')) {
      
      e.target.classList.remove('active');  
      
      const removeIndex = newListIndex.findIndex( filter => filter.value === e.target.children[0].innerHTML );
      
      newListIndex.splice( removeIndex, 1 );

      const removeInde = newList.findIndex( filter => filter.value === filtersTitle[index].value );
      
      newList.splice( removeInde, 1 );
      

    } else {
      e.target.classList.add('active');  
      
      
      newListIndex.push(index);

      newList.push( filtersTitle[index]);
      

    }

    let temp = [];

    newList.forEach(x => {temp.push(x)});
    
    
    let pseudoCount = [];
    
    const siblings = getSiblings(e.target.parentNode.parentNode).filter(sibling => sibling) ;

    
    
   
    for (let i = 0; i < filters.length; i++) {
      pseudoCount.push([]);
      
      filters[i].forEach((x, index) => {
        
        temp.push(x);
        
        pseudoCount[i].push(allProjects.filter(project => temp.every(filter => project[filter.key].includes(filter.value))).length);

        
        //pseudoCount.push(allProjects.filter(project => temp.every(filter => project[filter.key].includes(filter.value))).length);
        
        //e.target.parentElement.parentElement.children[index].children[0].children[1].innerHTML = pseudoCount[index];
        
        if (pseudoCount[i][index] === 0) {
          
          siblings[i].children[1].children[index].classList.add('inactive');
        } else {
          siblings[i].children[1].children[index].classList.remove('inactive');
        }

siblings[i].children[1].children[index].children[0].children[1].innerHTML = pseudoCount[i][index];
        const removeIndex = temp.findIndex( filter => filter.value === x.value );
        
        temp.splice( removeIndex, 1 );

        
      });
      
  
  
      
  
}

//e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[0].innerHTML = Math.max(...pseudoCount.flat());
/*if (newList.length === 0) {
  dispatch(projectedCounts(allFilteredProjects.length) );
} */


};
  



  const onClickApplyFilters = (event, newList, index) => { 
    
    const newFilters = newList;
    
    if (newFilters.length !== 0) {
      dispatch(clearActiveFilters());
      newFilters.forEach((filter, index) => {
        dispatch(addActiveFilter(
          filter
        ));
        
      })
    } else {
      dispatch(clearActiveFilters());
    }
    
    dispatch(toggle(toggleIdPrefix + filterTitles + toggleIdSuffix));
    dispatch(hideAllToggles('filters'));
    
}







/*                             FILTERS                               */

// Filters creation

filterTitles.forEach(filtersTitle => {
  const allFilteredNoFlat = allFilteredProjects.map(project => project[filtersTitle]);
  const allFiltered = allFilteredProjects.map(project => project[filtersTitle]).flat();

  all = allProjects.map((project) => project[filtersTitle]).flat();
  const unique = [...new Set([].concat.apply([], all.map((e) => e)))];
  filters.push(unique.map(obj => (
    {
      key: filtersTitle, 
      value: obj, 
      countTotal: all.filter(num => num === obj).length, 
      countFilter: allFiltered.filter(num => num === obj).length
    }
  )));
  totalFilterAppearance.push(allFilteredNoFlat.map(obj => ( 
    
      obj
    
    
  )))

  
  
});




const countCurrent = allFilteredProjects.length;
const countTotal = allProjects.length;



/*                          CONSOLE LOGs                              */



/*                               JSX                                  */

  return (
    
        <motion.div 
          className={isActive ? isEmpty ? 'filters-wrapper mobile open' : 'filters-wrapper mobile open empty' : isEmpty ? 'filters-wrapper mobile' : 'filters-wrapper mobile empty'} 
          ref={ref}
          initial={{opacity: 1}}  
          animate={{opacity: 1}} 
          exit={{opacity: 0}} 
          transition={{
            duration: .5, ease: [0.3, 0.13, 0.13, 0.96]
          }}
        >
          {/*                  FILTERS MENU                   */}
          {/* ref={ref} */}
          <div className={'projects-counter'}>
          <motion.button initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        whileHover={'hover'}
                        transition={'transition'}
                        onClick={event => onClickToggleMenu(event, ('filters__menu__mobile'))} 
                        className={'filters-mobile-btn '}>
             
            <span className={'projects-counter-current'}>{isActive ? projectedCount : countCurrent }</span>
            <span className={'projects-counter-total'}>{` / ${countTotal}`}</span>
            </motion.button>
          </div>
            
          
          
            
            {/*                   ACTIVE FILTERS                   */}
          {isEmpty ? 
          <div className={'active-filters-wrapper'}>
          { // Looping through the names array to output active filters
            filterTitles.map( (filtersTitle, index) => (
              <ul 
                className={activeFilters.some( (button) => button.key === filtersTitle) ? `active-filters-list ${filtersTitle}` : `no-margin active-filters-list ${filtersTitle}`}
                key={index}
              >
                {
                  activeFilters.map((filter, ind) => (
                    filter.key === filtersTitle ? (
                      <motion.li 
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        whileHover={'hover'}
                        transition={'transition'}
                        key={ind}
                        className={`active-filters-item`}
                      >
                        {/* onClick={onClickChangeHandler} */}
                        <motion.button
                          onClick={onClickChangeHandler}
                          className={`active-filter-btn`}
                        >
                          <motion.span 
                            className={'active-filter-name'} 
                            variants={activeFilterSpan}
                          >
                            {filter.value}
                          </motion.span>
                          <motion.span
                            className={'active-filter-remove'} 
                            variants={activeFilterSpanTwo}
                          >
                            {'remove'}
                          </motion.span>
                        </motion.button>
                        <motion.div
                          className={'active-filter-bg'} 
                          variants={filterColors[index]}>
                        </motion.div>
                      </motion.li>
                    ) : ''
                  ))
                }
              </ul>
            ))
          }
          
        

          </div>
           : '' }
          <div
            className={'filters-ref-wrapper filters-ref-wrapper-mobile'}
            
          >
            <Toggle id={'filters__menu__mobile'}>
            <div className={'bleh'}>
          {
            filters.map( (filtersTitle, index) => (
              <div
                className={toggleState[toggleIdPrefix + filterTitles[index] + toggleIdSuffix] === true ? `activ filters filters-mobile ${filterTitles[index]}` : `filters  filters-mobile ${filterTitles[index]}`}
                key={index}
              >  
               
                  <h4 className={'filters-title'}>
                
                    {filterTitles[index]}
                
                  </h4>
                
               
                
                
      
                  <ul className={'filters-list-mobile'}>

                    {filtersTitle.map((filter, index) => (
                      
                      <li 
                        key={index}
                        className={(filter.countFilter === 0) ? 'inactive filters-item' : 'filters-item'}
                      >
                        {/* onClick={onClickChangeHandler} */}
                        <button 
                          onClick={e => onClickSelectFilter(e, index, filtersTitle)}
                          className={activeFilters.map( fil => fil.value === filter.value).includes(true) ? 'active filters-button filters-button-mobile' : 'filters-button filters-button-mobile'}
                        >
                          <span className={'filter-name'}>
                            {filter.value}
                          </span>
                          <span className={'filter-count-filter'}>
                            {filter.countFilter + ' '}
                          </span>
                        </button>
                      </li>
                    ))}

                      
                  </ul>

                
      
    </div>
    ) )
          }
          </div>

         

          <div className={'filters-item filters-item-apply'}>
          {(activeFilters.length > 0) ? 
          <div className={'filters clear'}>
            {/* onClick={onClickClearHandler} */}
            <button 
              className={'filters-clear-btn'} 
              onClick={onClickClearHandler}
            >
             
              <h4 className={'filters-clear-title'}>
              {isActive ?  'clear' : ''}
              </h4>
            
            </button>
          </div>
          : ''
        }
{/*onClick={event => onClickApplyFilters(event, filtersTitle)}*/}
<button 
  className={'filters-apply-btn'}
  onClick={event => onClickApplyFilters(event, newList)}
>
  <span
    className={'filters-apply'}
  >
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




/* SIBLINGS START */
const getSiblings = function (elem) {
  // Setup siblings array and get the first sibling
	let siblings = [];
	let sibling = elem.parentNode.parentNode.firstChild;
  // Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
      //pushing the first child of the sibling rather than the sibling
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}
	return siblings;
};
/* SIBLINGS END */


/*<span>|</span>
<span>|</span>
<motion.span variants={filterMenuBtnOne} className={'small-circle'}></motion.span>
<motion.span variants={filterMenuBtnTwo} className={'small-circle'}></motion.span>*/