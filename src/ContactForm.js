import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';
import logo from './components/seva.jpeg';
import './Css/ContactForm.css';

function ContactForm() {
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    background: '#f5f5f5',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '20px',
    background: '#e6f5ff',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const logoStyle = {
    maxWidth: '200px',
    display: 'block',
    margin: '0 auto',
    marginBottom: '25px',
    border: '2px solid #007bff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f8f9fa',
  };

  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/save-data', {
      name: name,
      contactNumber: contactNumber,
    })
      .then((response) => {
        console.log('Data sent successfully', response.data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const handleDownload = () => {
    if (name.length > 0 && contactNumber.length === 10) {
      const link = document.createElement('a');
      link.href = 'https://ati.dae.gov.in/ati12052021_8.pdf';
      link.download = 'ati12052021_8.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowDownloadModal(true);

      window.alert('Your download has started.');

      setTimeout(() => {
        window.alert(null);
      }, 60000);
    } else {
      if (name.length === 0) {
        alert('Please Enter Your Name');
      } else if (contactNumber.length !== 10) {
        alert('Please enter a valid 10-digit phone number');
      } else {
        alert('Enter Details');
      }
    }
  };

  const handleWheel = (e) => e.preventDefault();
  const handleMouseOver = (e) => e.preventDefault();

  return (
    <div style={containerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <div style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={labelStyle}>
            <label className="form-label">
              Name<span style={{ color: 'red' }}>*</span>:
              <input
                type="text"
                placeholder="enter your name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3" style={labelStyle}>
            <label className="form-label">
              Contact Number<span style={{ color: 'red' }}>*</span>:
              <input
                type="number"
                placeholder="enter your number"
                className="form-control no-spinners"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                onWheel={handleWheel}
                onMouseOver={handleMouseOver}
              />
            </label>
          </div>
        </form>
      </div>
      <p>Enter your details above to download the pdf</p>
      <button className="btn btn-primary mt-3" onClick={handleDownload}>
        Download
      </button>
      <Home />
      {showDownloadModal && (
        <div className="modal fade" id="downloadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Download Successful
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDownloadModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Your file has been downloaded successfully.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowDownloadModal(false)}
                >
                  Close
                </button>
                <button onClick={handleDownload} className="btn btn-primary">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
