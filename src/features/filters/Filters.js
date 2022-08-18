import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "./filtersSlice";
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";
import './Filters.css';

/* SIBLINGS START 
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

const Filters = ({filters, name}) => {
  const currentFilters = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onClickChangeHandler = (e) => {
    /* SIBLINGS START 
    const siblings = getSiblings(e.target.parentNode);
    siblings.forEach(sibling => {
      sibling.classList.remove('active');
      dispatch(removeFilter(
        sibling.children[0].innerHTML
      ))
    })
    /* SIBLINGS END */
    if (e.target.classList.contains('active')) {
      
      e.target.classList.remove('active')
    
      dispatch(removeFilter(
        e.target.children[0].innerHTML
      ))  
    
    } else {
    
      e.target.classList.add('active');
    
      dispatch(addFilter(
        {
          key: name,
          value: e.target.children[0].innerHTML
        }
      ));
    
    }

  };


  const toggleId = name + '_toggle';
    
  const onClickToggle = (e) => { 
      dispatch(toggle(toggleId))
  }

  return (
    
    <div className="filters">
      <button onClick={onClickToggle}><h4 className={'filters-title'}>{name}</h4></button>
      <Toggle id={toggleId}>
      <ul className={'filters-list'}>

        {filters.map((filter, index) => (

          <li key={index} className={'filters-item'}>
            <button onClick={onClickChangeHandler} className={currentFilters.filters.map( fil => fil.value === filter.value).includes(true) ? 'active filters-button' : 'filters-button'}>
              <span className={'filter-name'}>{filter.value}</span><span className={'filter-count'}>{filter.countTotal}</span>
            </button>
          </li>
    
        ))}
        
      </ul>
      </Toggle>
      
    </div>
    
    
  );
};

export default Filters;



// add this for counts: <span className={'filter-count'}>{filter.countFilter} / {filter.countTotal}</span>

// add this for inactive filters: (filter.countFilter === 0) ? 'inactive filters-item' : 'filters-item'