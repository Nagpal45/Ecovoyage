import React from 'react';


const Hotel = ({ name, distance, cost, image }) => {
  return (
    <div className="hotel">
      <div className="hotel-image">
        <img src={image} alt={`${name}'s profile`} />
      </div>
      <div className="hotel-details">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg> {name}</h3>
        <p> {distance}km away</p>
        <p>₹{cost} per night</p>
      </div>
    </div>
  );
};

export default Hotel;
