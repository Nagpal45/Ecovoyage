import React, { Component, useState } from "react";
import "./plan.css";
import axios from "axios";
import { Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import { Autocomplete } from '@react-google-maps/api'
import { InputBase} from '@material-ui/core'

import GoogleMapReact from 'google-map-react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '85vh', width: '100vh',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const Map = ({setCoordinates, setBounds, coordinates, places}) => {
    const classes = useStyles();

    return (   
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDVNAi8lLh0wpnsm746LkkXpL6C8ejfqSE' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{
                    mapTypeControl: true,
                }}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        }
                    </div>
                )
                )}
                
            </GoogleMapReact>
        </div>
    )
}


const Header = ({ setCoordinates }) => {

    const [autocomplete, setAutoComplete] = useState(null)

    const onLoad = (autoC) => setAutoComplete(autoC)
    const onPlaceChanged = () => {
      const lat = Number(autocomplete.getPlace().geometry.location.lat());
      const lng = Number(autocomplete.getPlace().geometry.location.lng());
  
      console.log(lat, lng);
      setCoordinates({ lat: lat, lng: lng });
  };
  

    return (
        <div className="header">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <InputBase />
            </Autocomplete>
        </div>
    )
}


class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carMake: "",
      carModel: "",
      vehicleClass: "",
      transmission: "",
      fuelType: "",
      arrival: "",
      destination: "",
      arrivalSuggestions: [],
      destinationSuggestions: [],
      arrivalCoordinates: null,
      destinationCoordinates: null,
      models: [],
      vehicleClasses: [],
      transmissions: [],
      fuelTypes: [],
      predictedCO2: "",
      totalDistance: "",
      totalCO2: "",
      hotelData: [],
      places: [],
      coordinates: {},
      bounds: {},
      type: "hotels",
    };
  }

  getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, { 
      params : {
        bl_longitude: sw.lng,
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': 'adc2c4ebc5msh5ecd1e81e8395fap121945jsn377f34bb86c1',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    console.log(data);
    return data;
    
  } catch (error) {
    console.log(error);
  }
}

  sendCarInfotoMLmodel = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        carMake: this.state.carMake,
        carModel: this.state.carModel,
        vehicleClass: this.state.vehicleClass,
        transmission: this.state.transmission,
        fuelType: this.state.fuelType,
      });
      const predictedCO2 = response.data.prediction;

      this.setState({ predictedCO2 }, () => {
        console.log("Predicted CO2 Emissions:", this.state.predictedCO2);
      });
    } catch (error) {
      console.error("Error sending car info to ML model:", error);
    }
  };

  handleInputChange = async (event) => {
    const { name, value } = event.target;

    if (name === "carMake") {
      this.setState({
        [name]: value,
        carModel: "",
        vehicleClass: "",
        transmission: "",
        fuelType: "",
      });

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/carData/${value}`
        );
        const models = response.data.models;
        const vehicleClasses = response.data.vehicle_classes;
        const transmissions = response.data.transmissions;
        const fuelTypes = response.data.fuel_types;

        this.setState({
          models,
          vehicleClasses,
          transmissions,
          fuelTypes,
        });
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    } else if (name === "carModel") {
      this.setState({
        [name]: value,
        vehicleClass: "",
        transmission: "",
        fuelType: "",
      });

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/carData/${this.state.carMake}/${value}`
        );
        const vehicleClasses = response.data.vehicle_classes;
        const transmissions = response.data.transmissions;
        const fuelTypes = response.data.fuel_types;

        this.setState({
          vehicleClasses,
          transmissions,
          fuelTypes,
        });
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    } else {
      this.setState({ [name]: value });
      this.handleAutocomplete(name, value);
    }
  };

  handleSelect = async (value, name) => {
    this.setState({ [name]: value, [`${name}Suggestions`]: [] }, () => {
      this.fetchCoordinates(name);
    });
  };

  fetchCoordinates = async (name) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${this.state[name]}&key=d4e73b5ffb22404f9fd4ac67eafae80d`
      );

      const coordinates = response.data.results[0].geometry;
      const lat = coordinates.lat;
      const lng = coordinates.lng;

      this.setState(
        {
          [`${name}Coordinates`]: [lat, lng],
        },
        () => {
          console.log(this.state.arrivalCoordinates);
          console.log(this.state.destinationCoordinates);
        }
      );
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  calculateDistance = async () => {
    const { arrivalCoordinates, destinationCoordinates } = this.state;

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

      this.setState({ totalDistance: distance }, () => {
        console.log("Total Distance:", this.state.totalDistance);
      });
    }
  };

  handleAutocomplete = async (name, query) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=d4e73b5ffb22404f9fd4ac67eafae80d`
      );

      const suggestions = response.data.results.map(
        (result) => result.formatted
      );
      this.setState({ [`${name}Suggestions`]: suggestions });
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  calculateCO2 = () => {
    const { predictedCO2, totalDistance } = this.state;
    const CO2 = (predictedCO2 * totalDistance) / 1000;

    this.setState({ totalCO2: CO2 }, () => {
      console.log("Total CO2 Emissions:", this.state.totalCO2);
    });
  };

  handlePlanSubmit = (event) => {
    event.preventDefault();
    this.sendCarInfotoMLmodel();
    setTimeout(() => {
      this.calculateCO2();
    }, 1000);
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.calculateDistance();
  }

  fetchHotelData = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hotels?page=${page}`
      );
      const hotels = response.data;
      this.setState({ hotelData: hotels });
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      this.setState({
        coordinates: {lat: latitude, lng: longitude},
      });
  })

  setTimeout(() => {
  if (this.state.bounds.sw && this.state.bounds.ne) {
    this.getPlacesData(this.state.type, this.state.bounds.sw, this.state.bounds.ne)
    .then((data) => {
      console.log(data);
      this.setState({ places: data })
      })
  }
}, 1000)
  }


  render() {
    return (
      <div className="travelPlanPage">
      <Header setCoordinates={(newCoordinates) => this.setState({ coordinates: newCoordinates })} />

            <div>
                <Typography variant="h4">Food & Dining around you</Typography>
                <FormControl>
                    <InputLabel id="type">Type</InputLabel>
                    <Select value={this.state.type} onChange={(e) => this.setState({type: e.target.value})}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>
                <Map 
                    setCoordinates={(newCoordinates) => this.setState({ coordinates: newCoordinates })} 
                    setBounds={(newBounds) => this.setState({ bounds: newBounds })}
                    coordinates={this.state.coordinates}
                    places={this.state.places}
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

                {this.state.places?.map((place, i) => (
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
              value={this.state.arrival}
              onChange={this.handleInputChange}
            />
            {this.state.arrivalSuggestions.length > 0 && (
              <div className="autocomplete-dropdown-container  c1">
                {this.state.arrivalSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => this.handleSelect(suggestion, "arrival")}
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
              value={this.state.destination}
              onChange={this.handleInputChange}
            />
            {this.state.destinationSuggestions.length > 0 && (
              <div className="autocomplete-dropdown-container">
                {this.state.destinationSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => this.handleSelect(suggestion, "destination")}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" onClick={this.handleSearchSubmit}>
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
          {this.state.hotelData.map((hotel) => (
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
                  value={this.state.carMake}
                  onChange={this.handleInputChange}
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
                  value={this.state.carModel}
                  onChange={this.handleInputChange}
                >
                  <option value="">Select Car Model</option>

                  {this.state.models.map((model) => (
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
                  value={this.state.vehicleClass}
                  onChange={this.handleInputChange}
                >
                  <option value="">Select Vehicle Class</option>

                  {this.state.vehicleClasses.map((vehicleClass) => (
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
                  value={this.state.transmission}
                  onChange={this.handleInputChange}
                >
                  <option value="">Select Transmission</option>

                  {this.state.transmissions.map((transmission) => (
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
                  value={this.state.fuelType}
                  onChange={this.handleInputChange}
                >
                  <option value="">Select Fuel Type</option>

                  {this.state.fuelTypes.map((fuelType) => (
                    <option key={fuelType} value={fuelType}>
                      {fuelType}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" onClick={this.handlePlanSubmit}>
                Plan
              </button>
            </form>
            {this.state.totalCO2 && (
              <>
                <p>
                  Predicted CO2 Emissions:{" "}
                  {parseFloat(this.state.predictedCO2).toFixed(2)} g/km
                </p>
                <p>
                  Total Distance:{" "}
                  {parseFloat(this.state.totalDistance).toFixed(2)} km
                </p>
                <p>
                  Total CO2 Emissions:{" "}
                  {parseFloat(this.state.totalCO2).toFixed(2)} kg
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Plan;
