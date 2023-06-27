import React from "react";
import { useSelector } from "react-redux";
import { Album} from "../../components/Album/Album";


export function Photos() {
  const activePhotos = useSelector(state => state.photo.active);
  const allPhotos = useSelector(state => state.photo.all);
  const activeFilters = useSelector(state => state.photo.filters.active);
  return (
    <div>
     <Album items={activePhotos} allItems={allPhotos} filters={activeFilters} type={"photo"} layout={"mix"} scroll={"snap"}/>
    </div>
  );

};

