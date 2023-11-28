import React, { useEffect, useState } from "react";
import "./plan.css";
import axios from "axios";
import Header from "./header.jsx";
import Map from "../../components/map/map.jsx";



export default function Plan() {
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [arrivalCoordinates, setArrivalCoordinates] = useState([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicleClasses, setVehicleClasses] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [predictedCO2, setPredictedCO2] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalCO2, setTotalCO2] = useState(null);
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

      console.log(data[0]);
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
      if (name === "vehicleClass") setVehicleClass(value);
      else if (name === "transmission") setTransmission(value);
      else if (name === "fuelType") setFuelType(value);
    }
  };

  
  const calculateDistance = async () => {
    console.log(arrivalCoordinates, destinationCoordinates);
    if (arrivalCoordinates && destinationCoordinates) {
      const R = 6371; 
      const lat1 = arrivalCoordinates.lat;
      const lon1 = arrivalCoordinates.lng;
      const lat2 = destinationCoordinates.lat;
      const lon2 = destinationCoordinates.lng;

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
      console.log(distance);
     setTotalDistance(distance);
    }
  };

  
  const calculateCO2 = () => {
    const CO2 = (predictedCO2 * totalDistance) / 1000;
    setTotalCO2(CO2);
  };

  const handlePlanSubmit = async (event) => {
    event.preventDefault();
    await sendCarInfotoMLmodel();
  };

  useEffect(() => {
    if (predictedCO2 && totalDistance) {
      calculateCO2();
    }
  }, [predictedCO2, totalDistance]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    calculateDistance();
  };

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
        setPlaces(data);
        console.log(data);
      });
    }
  }, [type,coordinates, bounds]);

  return (
    <div className="travelPlanPage">
      <div className="subNavbar">
        <div className="subNavbar-group">
          <p>From</p>
          <Header setCoordinates={setArrivalCoordinates} />
        </div>
        <div className="subNavbar-group">
          <p>To</p>
          <Header setCoordinates={setDestinationCoordinates} />
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

      <div>
        <h4>Hotels/Attractions</h4>
        <form>
          <label id="type">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
        </form>
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={places}
        />

        {places?.map((place, i) => (
          <div key={i}>
            <h5>{place.name}</h5>
            <img style={{width: "100px", height: "100px"}}
              src={
                place.photo
                  ? place.photo.images.medium.url
                  : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
              }
              alt={place.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
              }}
            />
            <p>{parseFloat(place.distance).toFixed(2)} km</p>
            <p>{place.location_string}</p>
            <p>{place.price}</p>
            <p>{place.rating}</p>
            <button onClick = {
              () => window.open(`https://www.tripadvisor.com/Hotel_Review-g304551-d${place.location_id}`)
            }>
              View Details
            </button>
          </div>
        ))}
      </div>

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
