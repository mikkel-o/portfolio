import React, { useEffect } from 'react';
import './App.css';
import { 
  Outlet,
  useLocation,
  useSearchParams,
  Link
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import PrimaryNavigation from "../features/ui/primaryNavigation";
//import { columnCount, layout } from "../components/toggleSlice";
//import { layout } from "../components/toggleSlice";
import {isMobile} from 'react-device-detect';
import { clearId } from "../features/singleProject/singleProjectSlice";
//import { toggle } from "../components/toggleSlice";
import { loadProjects, setActiveFilters } from "../features/projects/projectsSlice";
import { loadPhotos, setActiveFiltersPhoto } from "../features/photo/photoSlice";
import useLocalStorage from 'use-local-storage';
//import SecondaryNavigation from '../features/ui/secondaryNavigation';
import { ReactComponent as Bulb } from '../components/Icons/bulb.svg';


function App() {
  const dispatch = useDispatch();
  const isViewMobile = useSelector(state => state.toggle.isMobile);
  const location = useLocation();

  /* Color Theme Start */
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(`theme-${theme}`);
    document.body.classList.add(`theme-${newTheme}`);
    setTheme(newTheme);
    
  }
  document.body.classList.add(`theme-${theme}`);
  /* Color Theme End */

  
  

  /* Filters Start */
  const [searchParams] = useSearchParams();
  const filters = searchParams.get("filters");
  

  const projects = useSelector(state => state.projects);
  const photos = useSelector(state => state.photo);

  //const albumVideo = document.getElementsByClassName("album__video");
  const layoutIsh = useSelector(state => state.toggle.layout);
  useEffect(()=> {
    
    
    if (location.pathname.indexOf('photo') > -1) {
      if (photos.hasBeenSet === false) {
        dispatch(loadPhotos()).then(() => {
          if (filters) {
            dispatch(setActiveFiltersPhoto(filters.split(',')))
          } else if (location.pathname === '/photo') {
            dispatch(setActiveFiltersPhoto('all'));
          }
        })
      } else {
        if (filters) {
          dispatch(setActiveFiltersPhoto(filters.split(',')))
        } else if (location.pathname === '/photo/' || location.pathname === '/photo') {
          dispatch(setActiveFiltersPhoto('all'));
        }
      }
    }
    
    
    if (location.pathname.indexOf('work') > -1) {
      if (projects.hasBeenSet === false) {
        
        dispatch(loadProjects()).then(() => {
          if (filters) {
            dispatch(setActiveFilters(filters.split(',')))
          } else if (location.pathname === '/work') {
            dispatch(setActiveFilters('all'));
            
          }
          
        })
      } else {
        if (filters) {
          dispatch(setActiveFilters(filters.split(',')))
        } else if (location.pathname === '/work/' || location.pathname === '/work') {
          dispatch(setActiveFilters('all'));
          
        }
        
      }
    }

    dispatch(clearId());
    //dispatch(toggle('hideAll'));

  },[location, dispatch, searchParams, projects.hasBeenSet, filters, photos.hasBeenSet])

console.log('bleh');
  useEffect(() => {
    
    if(layoutIsh === 0) {
      document.documentElement.classList.add(`layout-full`);
      document.documentElement.classList.remove(`layout-three`);
    } else if(layoutIsh === 3) {
      document.documentElement.classList.add(`layout-three`);
      document.documentElement.classList.remove(`layout-full`); 
    }
  }, [layoutIsh, dispatch] )


  

  const isActive = location.pathname === '/' || location.pathname === '' ? true : false;
  
  return (
    <div 
      id="app" 
      className={
        isMobile && isViewMobile ? 'mobile mobile-device' : 
        isMobile ? 'mobile-device' : 
        isViewMobile ? 'mobile' : 
        ''}
      data-theme={theme}
    >
      
    {isActive === false ? 
      <PrimaryNavigation navigationItems={['about', 'work', 'contact', 'photo']} >
       <button 
        className={'btn__theme'}
        onClick={switchTheme}
        
      >
        <Bulb width={35} height={35}/> 
        
      </button>
    </PrimaryNavigation>
    :
    null}
    {/* <Outlet> to show content */}
      <Outlet />
      
      <div className={(isActive === false) ? 'main-nav__wrapper front-nav__wrapper--hidden' : 'main-nav__wrapper main-nav__wrapper--show'}>      
        <ul className={'main-nav__list'}>
          <li className={'main-nav__item'}>
            <Link to={'/about'} >about</Link>
          </li>
          <li className={'main-nav__item'}>
            <Link to={'/work'} >animation</Link>
          </li>
          <li className={'main-nav__item'}>
            <Link to={'/photo'} >photo</Link>
          </li>
        </ul>
      </div>

    

    {/* END .App 
    <SecondaryNavigation>
    
    
    </SecondaryNavigation>
    */}
    </div>
  );
}

export default App;
/*
function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}*/