import React from 'react';
import { useSelector } from "react-redux";
import { Photos } from "../../features/photo/Photo";
import Filters from "../../features/filters/Filters";

export default function PhotosAll() {
  const state = useSelector(state => state);
  const allPhotos = useSelector(state => state.photo.all).length;
  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];


  const filtersAll = useSelector(state => state.photo.filters.all);
  const filtersActive =  useSelector(state => state.photo.filters.active);
  const filtersPseudo = useSelector(state => state.photo.filters.pseudo);
  console.log(state);
  console.log(state.photo);
  return (
    <div className={'wrapper'}>
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
      <Filters filtersAll={filtersAll} filtersActive={filtersActive} filtersPseudo={filtersPseudo} type={"photo"}/>
      </header>
      <main id="projects-wrapper">
        <section className="projects-section">
          
          {allPhotos !== 0 ?
            <Photos/>
            : 
            null
          }
        </section>
      </main>
    </div>
  );
}