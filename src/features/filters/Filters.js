import React from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "./filtersSlice";

/*
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
*/

const Filters = ({filters, name}) => {

  const dispatch = useDispatch();

  const onClickChangeHandler = (e) => {
    /*
    const siblings = getSiblings(e.target.parentNode);
    
    siblings.forEach(sibling => {

      sibling.classList.remove('active');
      
      dispatch(removeFilter(
        sibling.innerHTML
      ))  
    
    })
    */
    if (e.target.classList.contains('active')) {
      
      e.target.classList.remove('active')
    
      dispatch(removeFilter(
        e.target.innerHTML
      ))  
    
    } else {
    
      e.target.classList.add('active');
    
      dispatch(addFilter(
        {
          key: name,
          value: e.target.innerHTML
        }
      ));
    
    }

  };


  return (
    
    <div className="filters">
      
      <ul>

        {filters.map((filter, index) => (

          <li key={index} className={(filter.countFilter === 0) ? 'inactive' : ''}>
    
            <button onClick={onClickChangeHandler}>
              {filter.value}
            </button>
            <span>{filter.countFilter} / {filter.countTotal}</span>
    
          </li>
    
        ))}
        
      </ul>
    
    </div>
    
  );
};

export default Filters;
