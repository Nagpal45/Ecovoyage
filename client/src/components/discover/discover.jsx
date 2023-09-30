import React from "react";
import Hotel from "./hotel";
import "./discover.css";
import hotelA from "./images/hotel-A.png";
import hotelB from "./images/hotel-B.jfif";
import hotelC from "./images/hotel-C.jfif";
import hotelD from "./images/hotel-D.jfif";

const Discover = () => {
  const hotels = [
    {
      name: "Echor Himalaya Aurum,Manali",
      distance: 534,
      cost: 2000,
      image: hotelA,
    },
    {
      name: "The Kanchanikoot,Manali",
      distance: 493,
      cost: 7000,
      image: hotelB,
    },
    {
      name: "Hill Top,Manali",
      distance: 523,
      cost: 4000,
      image: hotelC,
    },
    {
      name: "Palchan Heights,shimla",
      distance: 413,
      cost: 4500,
      image: hotelD,
    },

  ]

  return (
    <div className="discover-page">
      <div className="SubPara">
        <span className="discoverHead">Discover Sustainable Options</span>
        <span className="para2">
          Travel with a Purpose. Experience Responsible Tourism.
        </span>
      </div>
      <span className="discoverOptionName">Accomodation</span>
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <Hotel
            key={index}
            name={hotel.name}
            distance={hotel.distance}
            cost={hotel.cost}
            image={hotel.image}
          />
        ))}
      </div>
      <span className="discoverOptionName">Activities</span>
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <Hotel
            key={index}
            name={hotel.name}
            distance={hotel.distance}
            cost={hotel.cost}
            image={hotel.image}
          />
        ))}
      </div>
      <span className="discoverOptionName">Transport</span>
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <Hotel
            key={index}
            name={hotel.name}
            distance={hotel.distance}
            cost={hotel.cost}
            image={hotel.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
