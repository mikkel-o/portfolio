import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './app/App';
import Projects from "./routes/projects/Projects";
import reportWebVitals from './reportWebVitals';
import store from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/projects" element={<Projects />} >
          
          </Route>
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
    </BrowserRouter>
    </Provider>
    
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



