import React from "react";
import Place from "./hotel.jsx";
import "./discover.css";
import place1 from "./images/place1.jpg";
import place2 from "./images/place2.jpg";
import place3 from "./images/place3.jpg";
import place4 from "./images/place4.jpg";
import place5 from "./images/place5.jpg";
import place6 from "./images/place6.jpg";
import place7 from "./images/place7.jpg";
import place8 from "./images/place8.jpg";

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
    {
      name:"Rishikesh ,Uttarakhand",
      DestiLat :30.086928,
      DestiLong :78.267612,
      image:place5,

    },
    {
      name: "Amritsar, Punjab",
      DestiLat :31.633979,
      DestiLong :74.872264,
      image:place6,

    },
    {
      name:"Palolem beach, Goa",
      DestiLat :15.01000,
      DestiLong :74.02300,
      image:place7,

    },
    {
      name:"Kolkata, West Bengal",
      DestiLat :22.5626,
      DestiLong :88.3630,
      image:place8,

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
