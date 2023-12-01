import React from 'react';
import { useNavigate } from 'react-router-dom';

const Place = ({ name, DestiLat, DestiLong, image }) => {
    
  const navigate = useNavigate();

  const handleClick = () => {
  
    navigate(`/plan?Dlat=${DestiLat}&Dlong=${DestiLong}`);
  };


  return (
    <div className="hotel">
      <div className="hotel-image">
        <img src={image} alt={`${name}'s profile`} />
      </div>
      <div className="hotel-details">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg> {name}</h3>
        <button className="hotel-button" onClick={handleClick}>
          Explore <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" >
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
</svg>
         </button>
      </div>

    </div>
  );
};

export default Place;
