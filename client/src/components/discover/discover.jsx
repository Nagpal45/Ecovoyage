import React from 'react';
import Hotel from './hotel'; 
import './discover.css';
import hotelA from './images/hotel-A.png';
import hotelB from './images/hotel-B.jfif';
import hotelC from './images/hotel-C.jfif';
import hotelD from './images/hotel-D.jfif';
import hotelE from './images/hotel-E.webp';
import hotelF from './images/hotel-F.webp';
import hotelG from './images/hotel-G.webp';
import hotelH from './images/hotel-H.webp';
const Discover = () => {
  
  const hotels = [
    {
      name: 'Echor Himalaya Aurum,Manali',
      distance: 534,
      cost: 2000,
      image: hotelA, 
    },
    {
      name: 'The Kanchanikoot,Manali',
      distance: 493,
      cost: 7000,
      image: hotelB, 
      
    },
    {
      name: 'Hill Top,Manali',
      distance: 523,
      cost: 4000,
      image: hotelC, 
    },
    {
      name: 'Palchan Heights,shimla',
      distance: 413,
      cost: 4500,
      image: hotelD, 
    },
  
    {
      name: 'The Lalit Gold & Spa Resort,Goa',
      distance: 1800,
      cost: 9000,
      image: hotelE, 
    },
  
    {
      name: 'Umaid Bhawan Palace,Jodhpur',
      distance: 343,
      cost: 6574,
      image: hotelF, 
    },
  
    {
      name: 'Vesta Maurya Palace,Jaipur',
      distance: 453,
      cost: 7566,
      image: hotelG, 
    },
  
    {
      name: 'Centaur Hotel,Delhi',
      distance: 70,
      cost: 4321,
      image: hotelH, 
    },
  
  ];

  return (
    <div className="discover-page">
      <p className='heading'>Discover Sustainable Destinations</p>
      <div className ="SubPara">
      <p className='para2'>Travel with a Purpose. Experience Responsible Tourism.</p>
      <div className="hotel-list">
      </div>
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
