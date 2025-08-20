import React from 'react';
import './CalculateBox.css';
import { useNavigate } from 'react-router-dom';

function CalculateBox(){

  const navigate = useNavigate();
  
  return(
    <>
    <div className="calculateBox">
    <h1 className="heading">Cloud Cost Calculator</h1>
    <button className="calculateButton" onClick={() => navigate('/formPage')}> calculate </button>
    </div>
    </>
  );

}

export default CalculateBox;