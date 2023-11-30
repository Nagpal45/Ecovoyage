import React from "react";
import Place from "./hotel.jsx";
import "./discover.css";
import place1 from "./images/place1.jpg";
import place2 from "./images/place2.jpg";
import place3 from "./images/place3.jpg";
import place4 from "./images/place4.jpg";


const Discover = () => {
  const hotels = [
    {
      name: "Ladakh, Jammmu and Kashmir",
      DestiLat : 34.209515,
      DestiLong : 77.615112,
      image: place1,
    },
    {
      name: "Jaisalmer, Rajasthan",
      DestiLat : 26.9157,
      DestiLong : 70.9083,
      image: place2,
    },
    {
      name: "Varanasi, Uttar Pradesh",
      DestiLat : 25.321684,
      DestiLong : 82.987289,
      image: place3,
    },
    {
      name: "The Kerela Backwaters",
      DestiLat : 9.86348,
      DestiLong : 76.3594,
      image: place4,
    },

  ]

  return (
    <div className="discover-page">
      <div className="SubPara">
        <span className="discoverHead">Discover Travel Options</span>
        <span className="para2">
          Travel with a Purpose. Experience Responsible Tourism.
        </span>
      </div>
      <span className="discoverOptionName">Accomodation</span>
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <Place
            key={index}
            name={hotel.name}
            DestiLat={hotel.DestiLat}
            DestiLong={hotel.DestiLong}
            image={hotel.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
