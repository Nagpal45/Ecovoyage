import React, { Component } from 'react';
import './plan.css';
import axios from 'axios';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carMake: '',
      carModel: '',
      vehicleClass: '',
      transmission: '',
      fuelType: '',
      arrival: '',
      destination: '',
      arrivalSuggestions: [],
      destinationSuggestions: [],
      arrivalCoordinates: null,
      destinationCoordinates: null, 
      models: [],
      vehicleClasses: [],
      transmissions: [],
      fuelTypes: [],
      predictedCO2: '',
      totalDistance: '',
      totalCO2: '',
      hotelData: [],
    };
  }

  sendCarInfotoMLmodel = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        carMake: this.state.carMake,
        carModel: this.state.carModel,
        vehicleClass: this.state.vehicleClass,
        transmission: this.state.transmission,
        fuelType: this.state.fuelType,
      });
      const predictedCO2 = response.data.prediction;

      
      this.setState({ predictedCO2 }, () => {
        console.log('Predicted CO2 Emissions:', this.state.predictedCO2);
      });
    } catch (error) {
      console.error('Error sending car info to ML model:', error);
    }
    
  };


  handleInputChange = async (event) => {
    const { name, value } = event.target;
  
    if (name === 'carMake') {
      this.setState({ [name]: value, carModel: '', vehicleClass: '', transmission: '', fuelType: '' });
  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/carData/${value}`);
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
        console.error('Error fetching car details:', error);
      }
    } 
    else if(name === "carModel"){
      this.setState({ [name]: value, vehicleClass: '', transmission: '', fuelType: '' });
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/carData/${this.state.carMake}/${value}`);
        const vehicleClasses = response.data.vehicle_classes;
        const transmissions = response.data.transmissions;
        const fuelTypes = response.data.fuel_types;

        this.setState({
          vehicleClasses,
          transmissions,
          fuelTypes,
        });
      }
      catch (error) {
        console.error('Error fetching car details:', error);
      }
    }


    else {
      this.setState({ [name]: value });
      this.handleAutocomplete(name, value);
    }
  }


  handleSelect = async (value, name) => {
    this.setState({ [name]: value, [`${name}Suggestions`]: [] }, () => {
      this.fetchCoordinates(name);
    });
  };
  
  fetchCoordinates = async (name) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state[name]}&key=d4e73b5ffb22404f9fd4ac67eafae80d`);
  
      const coordinates = response.data.results[0].geometry;
      const lat = coordinates.lat;
      const lng = coordinates.lng;
  
      this.setState({
        [`${name}Coordinates`]: [lat, lng]
      }, () => {
        console.log(this.state.arrivalCoordinates);
        console.log(this.state.destinationCoordinates);
      });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
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
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; 

      this.setState({ totalDistance: distance }, () => {
        console.log('Total Distance:', this.state.totalDistance);
      });
    }
  }

  

  handleAutocomplete = async (name, query) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=d4e73b5ffb22404f9fd4ac67eafae80d`);

      const suggestions = response.data.results.map(result => result.formatted);
      this.setState({ [`${name}Suggestions`]: suggestions });
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  }

  calculateCO2 = () => {
    const { predictedCO2, totalDistance } = this.state;
    const CO2 = (predictedCO2 * totalDistance)/1000;

    this.setState({ totalCO2: CO2 }, () => {
      console.log('Total CO2 Emissions:', this.state.totalCO2);
    });
  }

  handlePlanSubmit = (event) => {
    event.preventDefault();
    this.sendCarInfotoMLmodel();
    this.calculateDistance();
    setTimeout(() => {
      this.calculateCO2();
    }
    , 1000);
  }

  fetchHotelData = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels?page=${page}`);
      const hotels = response.data;
      this.setState({ hotelData: hotels });
      console.log(hotels[0]);

    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  componentDidMount() {
    this.fetchHotelData();
  }



  render() {
    return (
      <>
      <div className="hotelData">
        {this.state.hotelData.map((hotel) => (
          <div className="hotelCard" key={hotel.id}>
            <img src={hotel.medium_url} alt="hotel" />
            <div className="hotelInfo">
              <h3>{hotel.name}</h3>
              <p>{hotel.summary}</p>
              <p>Price: {hotel.price}</p>
              <p>Rating: {hotel.review_scores_rating}</p>
            </div>
          </div>
        ))}
      </div>
    return (<div>
    <div className='subNavbar'>
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
                <div className="autocomplete-dropdown-container">
                  {this.state.arrivalSuggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => this.handleSelect(suggestion, 'arrival')}>
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
                    <div key={index} onClick={() => this.handleSelect(suggestion, 'destination')}>
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" onClick={this.handlePlanSubmit}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>
            </div>
      <div className="card-container">
        <div className="card">
          <h2>Plan Your Trip</h2>
          <p className='sub_card_heading'>Discover the most Eco-friendly option for your trip.</p>
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

                {['ACURA', 'ALFA ROMEO', 'ASTON MARTIN', 'AUDI', 'BENTLEY', 'BMW', 'BUICK', 'CADILLAC', 'CHEVROLET', 'CHRYSLER', 'DODGE', 'FIAT', 'FORD', 'GMC', 'HONDA', 'HYUNDAI', 'INFINITI', 'JAGUAR', 'JEEP', 'KIA', 'LAMBORGHINI', 'LAND ROVER', 'LEXUS', 'LINCOLN', 'MASERATI', 'MAZDA', 'MERCEDES-BENZ', 'MINI', 'MITSUBISHI', 'NISSAN', 'PORSCHE', 'RAM', 'ROLLS-ROYCE', 'SCION', 'SMART', 'SRT', 'SUBARU', 'TOYOTA', 'VOLKSWAGEN', 'VOLVO', 'GENESIS', 'BUGATTI',].map((make) => (
                  <option key={make} value={make}>{make}</option>
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
                  <option key={model} value={model}>{model}</option>
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
                  <option key={vehicleClass} value={vehicleClass}>{vehicleClass}</option>
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
                  <option key={transmission} value={transmission}>{transmission}</option>
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
                  <option key={fuelType} value={fuelType}>{fuelType}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" onClick={this.handlePlanSubmit}>Plan</button>
          </form>
          {this.state.totalCO2 && (
            <>
          <p>Predicted CO2 Emissions: {parseFloat(this.state.predictedCO2).toFixed(2)} g/km</p>
          <p>Total Distance: {parseFloat(this.state.totalDistance).toFixed(2)} km</p>
          <p>Total CO2 Emissions: {parseFloat(this.state.totalCO2).toFixed(2)} kg</p>
            </>
          )}
        </div>
      </div>
      </div>
      </>
    );
  }
}

export default Plan;
