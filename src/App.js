import logo from './logo.svg';
import './App.css';
import { 
  Outlet, 
  Link 
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hellooooo!!
        </p>
        <Link to={'/about'} >about</Link>
      </header>
{/* <Outlet> to show content */}
<Outlet />

    </div>
  );
}

export default App;
