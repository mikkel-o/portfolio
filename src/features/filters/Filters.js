import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectAllProjects, selectFilteredAllProjects } from "../projects/projectsSlice";
import { hideAllToggles} from "../../components/toggleSlice";
import {
  addActiveFilter,
  removeActiveFilter ,
  clearActiveFilters
} from './filtersSlice'
import { motion } from "framer-motion";
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";
import './Filters.css';
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

export default function Filters(filtersTitles) {


  
/*                       DECLARATIONS                         */
  
  // Redux store data calls

  const dispatch = useDispatch();
  const ref = useRef();
  const allProjects = useSelector(selectAllProjects);
  const allFilteredProjects = useSelector(selectFilteredAllProjects);
  
  const activeFilters = useSelector(state => state.filter.activeFilters);
  const toggleState = useSelector((state) => state.toggle);
  const toggleIdSuffix = '_toggle';
  const toggleIdPrefix = 'filters_';

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
    dispatch(hideAllToggles())
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
  useOnClickOutside(ref, () => dispatch(hideAllToggles('filters')));
let newListIndex = [];
const oldList = activeFilters;
let newList = [];
oldList.forEach(item => newList.push(item));


  const onClickSelectFilter = (e, index, filtersTitle) => {
    const siblings = getSiblings(e.target.parentNode).filter(sibling => sibling.classList.contains('filters-button') );

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
    siblings.push(e.target);
    
    let pseudoCount = [];
    let filterTitle = filtersTitle; 
    const menuList = filterTitle.map(x => (x));
    menuList.forEach((x, index) => {

      temp.push(x);
      
      

      pseudoCount.push(allProjects.filter(project => temp.every(filter => project[filter.key].includes(filter.value))).length);
      e.target.parentElement.parentElement.children[index].children[0].children[1].innerHTML = pseudoCount[index];
      
      if (pseudoCount[index] === 0) {
        
        e.target.parentElement.parentElement.children[index].classList.add('inactive');
      } else {
        e.target.parentElement.parentElement.children[index].classList.remove('inactive');
      }

      const removeIndex = temp.findIndex( filter => filter.value === x.value );
      
      temp.splice( removeIndex, 1 );


  });



  for (let i = 0; i < siblings.length; i++) {
   
    

  /*if(!(siblings[i].children[1].innerHTML === newCount[i.value])) {
    //siblings[i].children[1].innerHTML = newCount[i].count;
  }*/
  /*if (newCount[i].count === 0 ) {
    siblings[i].parentElement.classList.add('inactive')
  } else {
    siblings[i].parentElement.classList.remove('inactive')
  }*/
  
}

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
    /*if (filtersIn.length !== 0) {
      filtersIn.forEach((filter) => {
       
        dispatch(addActiveFilter(
          {
            key: filterTitles[index],
            value: filter,
            
          }
        ));

    }
      )
    }*/
    
    dispatch(toggle(toggleIdPrefix + filterTitles + toggleIdSuffix))
    
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


  







/*                               JSX                                  */

  return (
    
        <div className={'filters-wrapper'} >
          {/*                  FILTERS MENU                   */}
          {/* ref={ref} */}
          <div
            className={'filters-ref-wrapper'}
            ref={ref}
          >
          {
            filters.map( (filtersTitle, index) => (
              <div
                className={toggleState[toggleIdPrefix + filterTitles[index] + toggleIdSuffix] === true ? `activ filters ${filterTitles[index]}` : `filters ${filterTitles[index]}`}
                key={index}
              >  
                <button 
                  onClick={event => onClickToggleMenu(event, (toggleIdPrefix + filterTitles[index] + toggleIdSuffix))}
                  className={'filters-title-btn'}
                  name={filterTitles[index]}
                >
                  <h4 className={'filters-title'}>
                
                    {filterTitles[index]}
                
                  </h4>
                
                </button>
                
                <Toggle id={toggleIdPrefix + filterTitles[index] + toggleIdSuffix}>
      
                  <ul className={'filters-list'}>

                    {filtersTitle.map((filter, index) => (
                      
                      <li 
                        key={index}
                        className={(filter.countFilter === 0) ? 'inactive filters-item' : 'filters-item'}
                      >
                        {/* onClick={onClickChangeHandler} */}
                        <button 
                          onClick={e => onClickSelectFilter(e, index, filtersTitle)}
                          className={activeFilters.map( fil => fil.value === filter.value).includes(true) ? 'active filters-button' : 'filters-button'}
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

                      <li className={'filters-item filters-item-apply'}>

                        {/*onClick={event => onClickApplyFilters(event, filtersTitle)}*/}
                        <button 
                          className={'filters-apply-btn'}
                          onClick={event => onClickApplyFilters(event, newList, index)}
                        >
                          <span
                            className={'filters-apply'}
                          >
                            Apply filters
                          </span>
                        </button>
                      </li>
                  </ul>

                </Toggle>
      
    </div>
    ) )
          }
          </div>

          
          {/*                   ACTIVE FILTERS                   */}
          
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


          <div className={'filters clear'}>
            {/* onClick={onClickClearHandler} */}
            <button 
              className={'filters-clear-btn'} 
              onClick={onClickClearHandler}
            >
              <h4 className={'filters-clear-title'}>
                clear filters
              </h4>
            </button>
          </div>
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



/* SIBLINGS START */
const getSiblings = function (elem) {
  // Setup siblings array and get the first sibling
	let siblings = [];
	let sibling = elem.parentNode.firstChild;
  // Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
      //pushing the first child of the sibling rather than the sibling
			siblings.push(sibling.children[0]);
		}
		sibling = sibling.nextSibling
	}
	return siblings;
};
/* SIBLINGS END */