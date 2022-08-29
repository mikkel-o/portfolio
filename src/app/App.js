import React from "react";
import './App.css';
import { 
  Outlet 
} from "react-router-dom";
import PrimaryNavigation from "../features/navigation/PrimaryNavigation";

function App() {
 

        

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