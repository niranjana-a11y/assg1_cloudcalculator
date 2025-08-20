import './FormPage.css';
import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineEdit } from "react-icons/ai";

function FormPage() {

  const [formData, setFormData] = useState([]); // start with an empty array
  const [costMessage, setCostMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [breakdownData, setBreakdownData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(''); // Initialize with an empty string or a default value
  const [pricePopup, SetpricePopup] = useState(false);
  const [selectedResource, setselectedResource] = useState('');
  const [resourcePrice, setResourcePrice] = useState({});
  const [allResourceType, setAllResourceType] = useState([]); // Initialize with an empty array
  const [editPopup, setEditPopup] = useState(false);

const handleNext = async (event) => {
  event.preventDefault();

  const newEntry = {
    region: event.target.region.value,
    resourceType: event.target.resources.value,
    count: parseInt(event.target.count.value, 10),
  };
  // Add the new object to the array
  setFormData((prevData) => [...prevData, newEntry]);
  // Reset the form fields
  event.target.reset();
  setSelectedRegion('');
  // Optionally, you can log the updated formData 
  
};

const handlesubmit = async (event) => {
  event.preventDefault();
  const form = event.target.form || event.target.closest('form');
  const newEntry = {
    region: form.region.value,
    resourceType: form.resources.value,
    count: parseInt(form.count.value, 10),
  };

  // Check if newEntry is valid
  if (
    newEntry.region &&
    newEntry.resourceType &&
    !isNaN(newEntry.count) &&
    newEntry.count > 0
  ) {
    // Add newEntry to formData
    const updatedFormData = [...formData, newEntry];
    setBreakdownData(updatedFormData);

    try {
      const response = await axios.post('http://localhost:8080/cost', updatedFormData);
      console.log('Form data submitted:', updatedFormData);
      // Handle the response from the API
      console.log('API Response:', response.data);
      if (response.data) {
        setFormData([]); // Clear the formData after submission
        setCostMessage(response.data);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Failed to send data');
    }
  } else {
    setBreakdownData(formData);
    if(formData.length === 0) {alert('Please add at least one resource before submitting.'); return;}
    // Submit only formData (do not add newEntry)
    try {
      const response = await axios.post('http://localhost:8080/cost', formData);
       console.log('Form data submitted:', formData);
      // Handle the response from the API
      console.log('API Response:', response.data);
      if (response.data) {
        setFormData([]); // Clear the formData after submission
        setCostMessage(response.data);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Failed to send data');
    }
  }

  form.reset();
  setSelectedRegion('');
};


  // const handlesubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target.form || event.target.closest('form');
  // const newEntry = {
  //   region: form.region.value,
  //   resourceType: form.resources.value,
  //   count: parseInt(form.count.value, 10),
  // };

  // form.reset();
  // setSelectedRegion(''); // Reset the form fields after submission

  // // Add current entry to formData
  // const updatedFormData = [...formData, newEntry];
  // setBreakdownData(updatedFormData);

  //   try {
  //     // Send POST request to your API
  //     const response = await axios.post('http://localhost:8080/cost', updatedFormData);
  //     console.log('Form data submitted:', updatedFormData);
  //     // Handle the response from the API
  //     console.log('API Response:', response.data);
  //     if (response.data) {
  //       setFormData([]); // Clear the formData after submission
  //       setCostMessage(response.data);
  //     }
  //     alert('Data sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //     alert('Failed to send data');
  //   }
  // }

  const breakDown = async(event) => {
    event.preventDefault();
    // Handle the breakdown logic here
    try {
      const response = await axios.post('http://localhost:8080/cost/breakdown', breakdownData);
      setBreakdownData(response.data); // Save API response to state
      console.log('Breakdown response:', response.data);
      // Handle the response from the API
    } catch (error) {
      console.error('Error sending breakdown data:', error);
    }
  };



const handleBillClick = async (event) => {
  await breakDown(event); // Wait for breakdown API call to finish
  setShowPopup(true);     // Then show the popup
};


const [regions, setRegions] = useState([]);
useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [resourceTypes, setResourceTypes] = useState([]);
  useEffect(() => {   
  if (selectedRegion) {
    axios
      .get(`http://localhost:8080/cost/region?region=${selectedRegion}`)
      .then((response) => {
        setResourceTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resource types:", error);
      });
    console.log('Selected region:', selectedRegion);
  } else {
    setResourceTypes([]);
  }
}, [selectedRegion]);

  useEffect(() => {console.log('formData:', formData);}, [formData]);
  useEffect(() => {
    console.log('Cost message:', costMessage);
  }, [costMessage]);

  const getResourcePrice = async (resource) => {
    try {
      const response = await axios.get(`http://localhost:8080/cost?resources=${resource}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching resource price:", error);
      return {};
    }
  };

  const getResources = async() => {
    try {
      const response = await axios.get('http://localhost:8080/api/resources');
      setAllResourceType(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching resources:", error);
      return [];
    }

  }

  return (
    <div className="form-page">
      <div className="formDiv">
      <form className="form" onSubmit={handleNext}>
        <h2 className='title'>cost estimator</h2>
        <label className='formText'>
          Region:&nbsp;
          <select name="region" className='selectOption' value={selectedRegion}
  onChange={e => setSelectedRegion(e.target.value)}>
            <option value="">SELECT</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
          
        </label>
        <br />
        <label className='formText'>
          ResourceType:&nbsp;
          <select name="resources" className='selectOption'>
            <option value="">SELECT</option>
            {resourceTypes.map((resource, index) => (
              <option key={index} value={resource}>{resource}</option>
            ))}
          </select>
          <div>
  <label
    className='priceLabel'
    onClick={async () => {
      await getResources(); // Fetch resources before showing popup
      SetpricePopup(true);
    }}
  >
    checkout Prices
  </label>
</div>

        </label>
        <br />
        <label className='formText'>
          Count:&nbsp;
          <input type="number" min={0} name="count"  placeholder="ENTER COUNT" className='count'/>
        </label>
        <br />
        <div class="editnextcontainer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="next">Next</button>
        </div>
          <button type="button" className='submitButton' onClick={handlesubmit}>Submit</button>
      </form>
      <div className="costMessage">
        {costMessage && <p className='costMessage'>Cost: {costMessage}</p>}
      </div>
      <div className="editnextcontainer">
      <button className='billButton' onClick={handleBillClick}>bill</button>
      <button
        className="editButton"
        onClick={() => setEditPopup(true)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
        <AiOutlineEdit size={28} style={{ color: "#333" }} />
      </button>
      </div>

  
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h3>Bill</h3>

      {/* Table */}
      {Array.isArray(breakdownData.breakdownList) && (
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Resource Type</th>
              <th>Count</th>
              <th>Price per Unit</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {breakdownData.breakdownList.map((item, index) => (
              <tr key={index}>
                <td>{item.inputlist.region}</td>
                <td>{item.inputlist.resourceType}</td>
                <td>{item.inputlist.count}</td>
                <td>{item.ppu}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Total */}
      <h4>Total Cost: {breakdownData.cost}</h4>

      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </div>
)}
      {pricePopup && (
        <div className="pricePopup">
          <h3 className='pricePopupHeading'>Resources Price acreoss regions</h3>
          <select
          value={selectedResource}
          onChange={async (e) => {
            setselectedResource(e.target.value);
            if (e.target.value) {
              const prices = await getResourcePrice(e.target.value);
              setResourcePrice(prices || {});
            } else {
              setResourcePrice({});
            }
          }}
          className='selectResourcePrice'
        >
          <option value="">SELECT Resource</option>
          { allResourceType.map((resource, index) => (
            <option key={index} value={resource}>{resource}</option>
          ))}
        </select>
          {selectedResource && (
  <table border="1" style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th>Region</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(resourcePrice).map(([region, price]) => (
        <tr key={region}>
          <td>{region}</td>
          <td>{price}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
          <button onClick={() => SetpricePopup(false)}>Close</button>
        </div>
      )}
      
      {editPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h3>Edit Resources</h3>
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Resource Type</th>
            <th>Count</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.region}</td>
              <td>{item.resourceType}</td>
              <td>{item.count}</td>
              <td>
                <span
                  style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
                  onClick={() => {
                    setFormData(formData.filter((_, i) => i !== idx));
                  }}
                >
                  &#10060;
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setEditPopup(false)}>Close</button>
    </div>
  </div>
)}

      
        <div style={{ position: 'absolute', top: 20, left: 20 }}>
          <Link to="/">
            <AiOutlineHome size={40} style={{ color: "#333", cursor: "pointer" }} />
          </Link>
        </div>
       
      </div>
    </div>
  );
}

export default FormPage;