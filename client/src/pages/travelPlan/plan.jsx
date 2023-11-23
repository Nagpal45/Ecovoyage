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
    };
  }


 
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.handleAutocomplete(name, value);
  }

  handleSelect = (value, name) => {
    this.setState({ [name]: value, [`${name}Suggestions`]: [] });
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



  render() {
    return (
      <div className="card-container">
        <div className="card">
          <h2>Plan Your Trip</h2>
          <form className="form">
            <div className="form-group">
              <label htmlFor="carMake">Car Make</label>
              <select
                id="carMake"
                name="carMake"
                value={this.state.carMake}
                onChange={this.handleInputChange}
              >
                <option value="">Select Car Make</option>

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

                {['ILX', 'ILX HYBRID', 'MDX 4WD', 'Tacoma 4WD D-Cab TRD Off-Road/Pro', 'Atlas Cross Sport 4MOTION', 'XC40 T4 AWD'].map((model) => (
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

                {['COMPACT', 'SUV - SMALL', 'MID-SIZE', 'TWO-SEATER', 'MINICOMPACT', 'SUBCOMPACT', 'FULL-SIZE', 'STATION WAGON - SMALL', 'SUV - STANDARD', 'VAN - CARGO', 'VAN - PASSENGER', 'PICKUP TRUCK - STANDARD', 'MINIVAN', 'SPECIAL PURPOSE VEHICLE', 'STATION WAGON - MID-SIZE', 'PICKUP TRUCK - SMALL'].map((vehicleClass) => (
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

                {['AS5', 'M6', 'AV7', 'AS6', 'AM6', 'A6', 'AM7', 'AV8', 'AS8', 'A7', 'A8', 'M7', 'A4', 'M5', 'AV', 'A5', 'AS7', 'A9', 'AS9', 'AV6', 'AS4', 'AM5', 'AM8', 'AM9', 'AS10', 'A10', 'AV10'].map((transmission) => (
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

                {['Z', 'D', 'X', 'E', 'N'].map((fuelType) => (
                  <option key={fuelType} value={fuelType}>{fuelType}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="arrival">Arrival</label>
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
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
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
            <button type="submit">Plan</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Plan;
