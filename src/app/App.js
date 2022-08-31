import React, { useEffect } from 'react';
import './App.css';
import { 
  Outlet 
} from "react-router-dom";
import {useDispatch} from "react-redux"
import PrimaryNavigation from "../features/navigation/PrimaryNavigation";
import { toggleMobile } from "../components/toggleSlice";


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
 
const dispatch = useDispatch();
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      

      if (window.innerWidth > 949) {
        dispatch(toggleMobile(false));
      }
      else {
        dispatch(toggleMobile(true));
      }
    }, 100)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
}
})



  return (
    <div id="app">
 {/* <Outlet> to show content */}
 <Outlet />
      
      <PrimaryNavigation navigationItems={['about', 'projects', 'contact']} />


     

    {/* END .App */}  
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