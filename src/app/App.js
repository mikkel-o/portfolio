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
import {isMobile} from 'react-device-detect';
import { clearId } from "../features/singleProject/singleProjectSlice";
import { toggle } from "../components/toggleSlice";
import { loadProjects, setActiveFilters } from "../features/projects/projectsSlice";
import { loadPhotos, setActiveFiltersPhoto } from "../features/photo/photoSlice";
import useLocalStorage from 'use-local-storage';
import SecondaryNavigation from '../features/ui/secondaryNavigation';
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
    console.log('app running');
    
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
    dispatch(toggle('hideAll'));

  },[location, dispatch, searchParams, projects.hasBeenSet, filters, photos.hasBeenSet])


  const layoutIsh = useSelector(state => state.toggle.layout);
  
  useEffect(() => {
    console.log('running app');
    /*if(layoutIsh === false) {
      dispatch(layout(0));
    } else {
      dispatch(layout(layoutIsh))
    }*/
    
    if(layoutIsh === 0) {
      document.documentElement.classList.add(`layout-full`);
      document.documentElement.classList.remove(`layout-one`);
      document.documentElement.classList.remove(`layout-two`);
      document.documentElement.classList.remove(`layout-three`);
    } else if(layoutIsh === 1) {
      document.documentElement.classList.add(`layout-one`);

      document.documentElement.classList.remove(`layout-full`);
      document.documentElement.classList.remove(`layout-two`);
      document.documentElement.classList.remove(`layout-three`);
    } else if(layoutIsh === 2) {
      document.documentElement.classList.add(`layout-two`);

      document.documentElement.classList.remove(`layout-full`);
      document.documentElement.classList.remove(`layout-one`);
      document.documentElement.classList.remove(`layout-three`);
    } else if(layoutIsh === 3) {
      document.documentElement.classList.add(`layout-three`);

      document.documentElement.classList.remove(`layout-full`);
      document.documentElement.classList.remove(`layout-two`);
      document.documentElement.classList.remove(`layout-one`);
    }
    //albumVideo.forEach(video => video.pause());
   /* if (window.innerWidth > 1349) {
      dispatch(columnCount(4));
    } else if (window.innerWidth > 949) {
      dispatch(columnCount(3));
    } else if (window.innerWidth > 599) {
      dispatch(columnCount(2));
    } else {
      dispatch(columnCount(1));
    }*/
    
    /*const debouncedHandleResize = debounce(function handleResize() {
      /*for (let i = 0; i < albumVideo.length; i++) {
        albumVideo[i].pause();
        albumVideo[i].currentTime = 0;
      }
      if (window.innerWidth > 1349) {
        dispatch(columnCount(4));
      } else if (window.innerWidth > 949) {
        dispatch(columnCount(3));
      } else if (window.innerWidth > 599) {
        dispatch(columnCount(2));
      } else {
        for (let i = 0; i < albumVideo.length; i++) {
          albumVideo[i].play();
        }
        dispatch(columnCount(1));
      }
    }, 100)
    

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
    */
  }, [layoutIsh] )


  

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

    

    {/* END .App */}
    <SecondaryNavigation>
    <button 
        className={'btn__theme'}
        onClick={switchTheme}
        
      >
        <Bulb width={35} height={35}/> 
        
      </button>
    </SecondaryNavigation>
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