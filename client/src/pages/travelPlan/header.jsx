import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

export default function Header ({ setCoordinates })  {
    const [autocomplete, setAutoComplete] = useState(null);
  
    const onLoad = (autoC) => setAutoComplete(autoC);
    const onPlaceChanged = () => {
      const lat = Number(autocomplete.getPlace().geometry.location.lat());
      const lng = Number(autocomplete.getPlace().geometry.location.lng());
  
      console.log(lat, lng);
      setCoordinates({ lat: lat, lng: lng });
    };
  
    return (
      <div className="planHeader">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input type="text" placeholder="Enter an address" className="planHeaderInput"/>
        </Autocomplete>
      </div>
    );
  };