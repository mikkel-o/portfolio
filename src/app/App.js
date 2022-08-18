import React from "react";
import './App.css';
import { 
  Outlet 
} from "react-router-dom";
import PrimaryNavigation from "../features/navigation/PrimaryNavigation";

function App() {
 

        

  return (
    <div id="app">

      
      <PrimaryNavigation navigationItems={['about', 'animation & vfx', 'contact']} />


      {/* <Outlet> to show content */}
      <Outlet />

    {/* END .App */}  
    </div>
  );
}

export default App;