
import React from "react";
import './App.css';
import CalculateBox from './CalculateBox.jsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormPage from './FormPage.jsx';

function App(){
  return(
  <>
  <Router>
      <Routes>
        <Route path="/" element={ <CalculateBox/> } />
        <Route path="/formPage" element={<FormPage/>} />
      </Routes>
    </Router>
  </>
  );
}

export default App;