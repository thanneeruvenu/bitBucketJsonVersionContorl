import './App.scss';
import Navbar from './Components/Navbar'
import Main from './Components/Main'
import React,{useEffect} from "react";


function App() {


  return (
    <div className="App">
    <Navbar>
      <Main/>
    </Navbar>

    
    </div>
  );
}

export default App;
