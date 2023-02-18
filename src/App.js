import './App.css';
import Home from "./Pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './Pages/SignUp';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route exact path = "/signup" element={<SignUp/>} />
      </Routes>
    </div>
    
  );
}

export default App;
