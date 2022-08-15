import React from "react";
import { useDispatch } from "react-redux";
import {
  clearFilter,
  setFilter,
} from "./filtersSlice";

const Filters = ({filters}) => {
  const dispatch = useDispatch();
  const onClickChangeHandler = (e) => {
    dispatch(setFilter(e.target.innerHTML));
  };
  const onClickClearHandler = (e) => {
    dispatch(clearFilter());
  };

return (
    <div id="filters">
      <button onClick={onClickClearHandler}>
          all
        </button>
      {filters.map((e, index) => (
        <button key={index} onClick={onClickChangeHandler}>
          {e}
        </button>
      ))}
    </div>
  );
};

export default Filters;
