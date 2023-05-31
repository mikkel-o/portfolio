import React, { useEffect } from 'react';
import './App.css';
import { 
  Outlet,
  useLocation,
  useSearchParams,
  Link
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import PrimaryNavigation from "../features/navigation/PrimaryNavigation";
import { columnCount } from "../components/toggleSlice";
import {isMobile} from 'react-device-detect';
import { clearId } from "../features/singleProject/singleProjectSlice";
import { toggle } from "../components/toggleSlice";
import { loadProjects, setActiveFilters, toggleMethod } from "../features/projects/projectsSlice";
import { loadPhotos } from "../features/photo/photoSlice";
import useLocalStorage from 'use-local-storage';

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}
function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const isViewMobile = useSelector(state => state.toggle.isMobile)
const dispatch = useDispatch();

const [searchParams] = useSearchParams();
  
const filters = searchParams.get("filters");
const method = searchParams.get("method");

const hasBeenSet = useSelector(state => state.projects.hasBeenSet);
const photo = useSelector(state => state.photo);

const location = useLocation();
console.log(location.pathname);
useEffect(()=> {
console.log(location.pathname);

  if (location.pathname.indexOf('photo') > -1) {
    console.log('bleh');
      if (photo.hasBeenSet === false) {
        console.log('blehbleh');
          dispatch(loadPhotos());
        }
      }
      
      

      


      console.log(location.pathname.indexOf('photo') > -1);
  console.log(location.pathname.indexOf('projects') > -1);
  if (location.pathname.indexOf('projects') > -1) {
  if (hasBeenSet === false) {
    dispatch(loadProjects()).then(() => {
      if (filters) {
        if (method) {
          dispatch(toggleMethod(method));
          
          } else {
            dispatch(toggleMethod("AND"));
          
          }
      dispatch(setActiveFilters(filters.split(',')))
    } else if (location.pathname === '/projects') {
        dispatch(setActiveFilters('all'));
      }
    })
    } else {
      if (filters) {
        if (method) {
          dispatch(toggleMethod(method));
          
          } else {
            dispatch(toggleMethod("AND"));
          
          }
      dispatch(setActiveFilters(filters.split(',')))
      } else if (location.pathname === '/projects/' || location.pathname === '/projects') {
        dispatch(setActiveFilters('all'));
      }
    }
  }
dispatch(clearId());
dispatch(toggle('hideAll'));



},[location, dispatch, searchParams, hasBeenSet, filters, method, photo.hasBeenSet])



  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      
      
      if (window.innerWidth > 1349) {
        dispatch(columnCount(4));
        //dispatch(toggleMobile(false));
      } else if (window.innerWidth > 949) {
        dispatch(columnCount(3));
        //dispatch(toggleMobile(false));
      } else if (window.innerWidth > 599) {
        dispatch(columnCount(2));
        //dispatch(toggleMobile(true));
      } else {
        dispatch(columnCount(1));
        //dispatch(toggleMobile(true));
      }
    }, 100)




    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
}
})
document.body.classList.add(`theme-${theme}`);
const switchTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.body.classList.remove(`theme-${theme}`);
  document.body.classList.add(`theme-${newTheme}`);
  
  setTheme(newTheme);
}
const isActive = location.pathname === '/' || location.pathname === '' ? true : false;
console.log(isActive);
  return (
    <div 
      id="app" 
      className={
        isMobile && isViewMobile ? 'mobile mobile-device' : 
        isMobile ? 'mobile-device' : 
        isViewMobile ? 'mobile' : 
        ''}
      data-theme={theme}>
 {isActive === false ? 
 <PrimaryNavigation navigationItems={['about', 'projects', 'contact']} />
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
          <Link to={'/showreel'} >showreel</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/projects'} >projects</Link>
        </li>
        
        
      </ul>  
    </div>

    <button 
      onClick={switchTheme}
      style={{position: 'fixed', bottom: '0', right: '0', zIndex: '20'}}  
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
     

    {/* END .App */}  
    {/*<Footer/>*/}
    </div>
  );
}

export default App;





//https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript


//throws an error on but seems to work...
/*
function preloadImages(array, waitForOtherResources, timeout) {
  let loaded = false, 
      list = preloadImages.list, 
      imgs = array.slice(0), 
      t = timeout || 15*1000, 
      timer;
 
  if (!preloadImages.list) {
      preloadImages.list = [];
  }
  if (!waitForOtherResources || document.readyState === 'complete') {
      loadNow();
  } else {
      window.addEventListener("load", function() {
          clearTimeout(timer);
          loadNow();
      });
      // in case window.addEventListener doesn't get called (sometimes some resource gets stuck)
      // then preload the images anyway after some timeout time
      timer = setTimeout(loadNow, t);
  }

  function loadNow() {
      if (!loaded) {
          loaded = true;
          for (var i = 0; i < imgs.length; i++) {
              var img = new Image();
              img.onload = img.onerror = img.onabort = function() {
                  var index = list.indexOf(this);
                  if (index !== -1) {
                      // remove image from the array once it's loaded
                      // for memory consumption reasons
                      list.splice(index, 1);
                  }
              }
              list.push(img);
              img.src = imgs[i];
          }
      }
  }
}

preloadImages(["/img/placeholder.jpeg", ""], true);

*/