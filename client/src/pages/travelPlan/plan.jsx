import React, { useEffect, useState } from "react";
import "./plan.css";
import axios from "axios";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import Header from "./header.jsx";
import Map from "./map.jsx";



export default function Plan() {
  
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [arrival, setArrival] = useState([]);
  const [destination, setDestination] = useState([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [arrivalCoordinates, setArrivalCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [models, setModels] = useState([]);
  const [vehicleClasses, setVehicleClasses] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [predictedCO2, setPredictedCO2] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalCO2, setTotalCO2] = useState(null);
  const [hotelData, setHotelData] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("hotels");

  const getPlacesData = async (type, sw, ne) => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
          params: {
            bl_longitude: sw.lng,
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            tr_longitude: ne.lng,
          },
          headers: {
            "X-RapidAPI-Key":
              "adc2c4ebc5msh5ecd1e81e8395fap121945jsn377f34bb86c1",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const sendCarInfotoMLmodel = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        carMake,
        carModel,
        vehicleClass,
        transmission,
        fuelType,
      });
      const predictedCO2 = response.data.prediction;

      setPredictedCO2(predictedCO2);
    } catch (error) {
      console.error("Error sending car info to ML model:", error);
    }
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    if (name === "carMake") {
      setCarMake(value);
      setCarModel("");
      setVehicleClass("");
      setTransmission("");
      setFuelType("");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/carData/${value}`
        );
        const models = response.data.models;
        const vehicleClasses = response.data.vehicle_classes;
        const transmissions = response.data.transmissions;
        const fuelTypes = response.data.fuel_types;

        setModels(models);
        setVehicleClasses(vehicleClasses);
        setTransmissions(transmissions);
        setFuelTypes(fuelTypes);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    } else if (name === "carModel") {
      setCarModel(value);
      setVehicleClass("");
      setTransmission("");
      setFuelType("");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/carData/${carMake}/${value}`
        );
        const vehicleClasses = response.data.vehicle_classes;
        const transmissions = response.data.transmissions;
        const fuelTypes = response.data.fuel_types;

        setVehicleClasses(vehicleClasses);
        setTransmissions(transmissions);
        setFuelTypes(fuelTypes);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    } else {
      if(name === "arrival") setArrival(value);
      else setDestination(value);
      handleAutocomplete(name, value);
    }
  };

  const handleSelect = async (value, name) => {
    if(name === "arrival") {
      setArrival(value);
      setArrivalSuggestions([]);
    }
    else {
      setDestination(value);
      setDestinationSuggestions([]);
    }
    fetchCoordinates(name);
  };

  const fetchCoordinates = async (name) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${name}&key=d4e73b5ffb22404f9fd4ac67eafae80d`
      );

      const coordinates = response.data.results[0].geometry;
      const lat = coordinates.lat;
      const lng = coordinates.lng;

      if(name === "arrival") setArrivalCoordinates([lat, lng]);
      else setDestinationCoordinates([lat, lng]);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const calculateDistance = async () => {
    if (arrivalCoordinates && destinationCoordinates) {
      const R = 6371; // Earth's radius in kilometers
      const lat1 = arrivalCoordinates[0];
      const lon1 = arrivalCoordinates[1];
      const lat2 = destinationCoordinates[0];
      const lon2 = destinationCoordinates[1];

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;

     setTotalDistance(distance);
    }
  };

  const handleAutocomplete = async (name, query) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=d4e73b5ffb22404f9fd4ac67eafae80d`
      );

      const suggestions = response.data.results.map(
        (result) => result.formatted
      );
      if (name === "arrival") setArrivalSuggestions(suggestions);
      else setDestinationSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  const calculateCO2 = () => {
    const CO2 = (predictedCO2 * totalDistance) / 1000;
    setTotalCO2(CO2);
  };

  const handlePlanSubmit = (event) => {
    event.preventDefault();
    sendCarInfotoMLmodel();
    setTimeout(() => {
      calculateCO2();
    }, 1000);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    calculateDistance();
  };

  const fetchHotelData = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hotels?page=${page}`
      );
      const hotels = response.data;
      setHotelData(hotels);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };
  useEffect(() => {
    fetchHotelData();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      getPlacesData(
        type,
        bounds?.sw,
        bounds?.ne
      ).then((data) => {
        console.log(data);
        setPlaces(data);
      });
    }
  }, [type, bounds, coordinates]);

  return (
    <div className="travelPlanPage">
      <Header
        setCoordinates={setCoordinates}
      />

      <div>
        <Typography variant="h4">Food & Dining around you</Typography>
        <FormControl>
          <InputLabel id="type">Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={places}
        />
        {/* filtering using rating; krne ki zarurat nhi hai */}
        {/* <FormControl className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="3">Above 3.0</MenuItem>
                    <MenuItem value="4">Above 4.0</MenuItem>
                    <MenuItem value="4.5">Above 4.5</MenuItem>
                    </Select>
                </FormControl> */}

        {places?.map((place, i) => (
          <div key={i}>
            <Typography variant="h5">{place.name}</Typography>
          </div>
        ))}
      </div>
      <div className="subNavbar">
        <div className="subNavbar-group">
          <label htmlFor="arrival">From</label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={arrival}
            onChange={handleInputChange}
          />
          {arrivalSuggestions.length > 0 && (
            <div className="autocomplete-dropdown-container  c1">
              {arrivalSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(suggestion, "arrival")}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="subNavbar-group">
          <label htmlFor="destination">To</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={destination}
            onChange={handleInputChange}
          />
          {destinationSuggestions.length > 0 && (
            <div className="autocomplete-dropdown-container">
              {destinationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(suggestion, "destination")}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" onClick={handleSearchSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
      {/* <div className="hotelData">
          {hotelData.map((hotel) => (
            <div className="hotelCard" key={hotel.id}>
              <img
                src={
                  hotel.medium_url
                    ? hotel.medium_url
                    : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                }
                alt={hotel.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
                }}
              />
              <div className="hotelInfo">
                <h3>{hotel.name}</h3>
                <p>{hotel.summary}</p>
                <p>{hotel.city}</p>
                <p>Price: {hotel.price}</p>
              </div>
            </div>
          ))}
        </div> */}
      <div className="card-container">
        <div className="card">
          <h2>Plan Your Trip</h2>
          <p className="sub_card_heading">
            Discover the most Eco-friendly option for your trip.
          </p>
          <form className="form">
            <div className="form-group">
              <label htmlFor="carMake">Car Manufacturer</label>
              <select
                id="carMake"
                name="carMake"
                value={carMake}
                onChange={handleInputChange}
              >
                <option value="">Select Car Manufacturer</option>

                {[
                  "ACURA",
                  "ALFA ROMEO",
                  "ASTON MARTIN",
                  "AUDI",
                  "BENTLEY",
                  "BMW",
                  "BUICK",
                  "CADILLAC",
                  "CHEVROLET",
                  "CHRYSLER",
                  "DODGE",
                  "FIAT",
                  "FORD",
                  "GMC",
                  "HONDA",
                  "HYUNDAI",
                  "INFINITI",
                  "JAGUAR",
                  "JEEP",
                  "KIA",
                  "LAMBORGHINI",
                  "LAND ROVER",
                  "LEXUS",
                  "LINCOLN",
                  "MASERATI",
                  "MAZDA",
                  "MERCEDES-BENZ",
                  "MINI",
                  "MITSUBISHI",
                  "NISSAN",
                  "PORSCHE",
                  "RAM",
                  "ROLLS-ROYCE",
                  "SCION",
                  "SMART",
                  "SRT",
                  "SUBARU",
                  "TOYOTA",
                  "VOLKSWAGEN",
                  "VOLVO",
                  "GENESIS",
                  "BUGATTI",
                ].map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="carModel">Car Model</label>
              <select
                id="carModel"
                name="carModel"
                value={carModel}
                onChange={handleInputChange}
              >
                <option value="">Select Car Model</option>

                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vehicleClass">Vehicle Class</label>
              <select
                id="vehicleClass"
                name="vehicleClass"
                value={vehicleClass}
                onChange={handleInputChange}
              >
                <option value="">Select Vehicle Class</option>

                {vehicleClasses.map((vehicleClass) => (
                  <option key={vehicleClass} value={vehicleClass}>
                    {vehicleClass}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="transmission">Transmission</label>
              <select
                id="transmission"
                name="transmission"
                value={transmission}
                onChange={handleInputChange}
              >
                <option value="">Select Transmission</option>

                {transmissions.map((transmission) => (
                  <option key={transmission} value={transmission}>
                    {transmission}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fuelType">Fuel Type</label>
              <select
                id="fuelType"
                name="fuelType"
                value={fuelType}
                onChange={handleInputChange}
              >
                <option value="">Select Fuel Type</option>

                {fuelTypes.map((fuelType) => (
                  <option key={fuelType} value={fuelType}>
                    {fuelType}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" onClick={handlePlanSubmit}>
              Plan
            </button>
          </form>
          {totalCO2 && (
            <>
              <p>
                Predicted CO2 Emissions:{" "}
                {parseFloat(predictedCO2).toFixed(2)} g/km
              </p>
              <p>
                Total Distance:{" "}
                {parseFloat(totalDistance).toFixed(2)} km
              </p>
              <p>
                Total CO2 Emissions:{" "}
                {parseFloat(totalCO2).toFixed(2)} kg
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
