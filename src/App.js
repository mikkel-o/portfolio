import React from "react";
import { 
  Outlet, 
  Link 
} from "react-router-dom";

function App() {
 
  return (
    <div id="app">
      <Link to={'/Projects'} >projects</Link>
      <Outlet />
    </div>
  );
}

export default App;