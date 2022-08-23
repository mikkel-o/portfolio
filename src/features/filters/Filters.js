import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "./filtersSlice";
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";
import './Filters.css';

const Filters = ({filters, name}) => {
  const currentFilters = useSelector(state => state.filter);
  let filtersToApply = [];
  let filtersToRemove = [];
  if (currentFilters.filters.length !== 0) {
    currentFilters.filters.forEach(filter => filtersToApply.push(filter.value));
  } 
  const dispatch = useDispatch();

  const onClickChangeHandler = (e) => {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      
      // get index of object with id of 37
      const removeIndex = filtersToApply.indexOf(e.target.children[0].innerHTML);
      // remove object
      console.log(removeIndex)
      if (removeIndex !== -1) {filtersToApply.splice( removeIndex, 1 )};
      filtersToRemove.push(e.target.children[0].innerHTML);
    } else {
      e.target.classList.add('active');
      
       // get index of object with id of 37
       const removeIndex = filtersToRemove.indexOf(e.target.children[0].innerHTML);
       // remove object
       console.log(removeIndex)
       if (removeIndex !== -1) {filtersToRemove.splice( removeIndex, 1 )};
      filtersToApply.push(e.target.children[0].innerHTML);
    }
  };



  const toggleId = name + '_toggle';

  const onClickToggle = (e) => { 
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
    } else {
      e.target.classList.add('active');
    }
      dispatch(toggle(toggleId))
  }

  const onClickApplyFilters = (e) => { 
    if (filtersToRemove.length !== 0) {
      filtersToRemove.forEach((filter, index) => {
       
        dispatch(removeFilter(filter));

    }
      )
    }
    if (filtersToApply.length !== 0) {
      filtersToApply.forEach((filter, index) => {
       
        dispatch(addFilter(
          {
            key: name,
            value: filter
          }
        ));

    }
      )
    }
    
    dispatch(toggle(toggleId))
    
}


const toggleState = useSelector((state) => state.toggle);
console.log(toggleState);
console.log(toggleId);


  return (
    
    <div className={toggleState[toggleId] === true ? `activ filters ${name}` : `filters ${name}`}>
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
        <li className={'filters-item'}>
            <button onClick={onClickApplyFilters} className={''}>
              <span className={''}>Apply filters</span>
            </button>
          </li>
      </ul>
      </Toggle>
      
    </div>
    
    
  );
};

export default Filters;



// add this for counts: <span className={'filter-count'}>{filter.countFilter} / {filter.countTotal}</span>

// add this for inactive filters: (filter.countFilter === 0) ? 'inactive filters-item' : 'filters-item'