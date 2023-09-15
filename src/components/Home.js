import React from 'react';
import './index1.css';
import newImage from ''// Replace with the actual path to your new image

function Home() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://ati.dae.gov.in/ati12052021_8.pdf';
    link.download = 'https://ati.dae.gov.in/ati12052021_8.pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='homepage'>
      <img src={newImage} alt="New Image" className='image' />
      <button className='down' onClick={handleDownload}>Download PDF</button>
    </div>
  );
}

export default Home;
