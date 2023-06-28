import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import './index.css';
import './media.css';
import App from './app/App';
import ProjectsAll from "./pages/work/ProjectsAll";
import ProjectSingleWrapper from "./pages/work/ProjectSingleWrapper";

import ProjectCategories from "./pages/work/ProjectCategories";
import About from "./pages/about/About";
import PhotosAll from "./pages/photo/PhotosAll";

import reportWebVitals from './reportWebVitals';
import { store } from "./app/store";
import { Provider } from "react-redux";
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {

  const location = useLocation();
  return (
    <AnimatePresence initial={false} mode='wait'>
     <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={<App />}
        >
          <Route 
            path="work" 
            element={<ProjectsAll />}
          />
          <Route 
              path="work/:id/:film" 
              element={<ProjectSingleWrapper />} 
            />
          
            
          <Route 
            path="work/categories" 
            element={<ProjectCategories />} 
          />

          <Route path="/photo" element={<PhotosAll />} />    
            
            

          <Route 
            path="about" 
            element={<About />}
          />
          <Route
            path="*"
            element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
          />
        </Route>
      </Routes> 
    </AnimatePresence>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



