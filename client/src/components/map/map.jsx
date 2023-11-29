import GoogleMapReact from "google-map-react";
import "./map.css";
import { LocationOnOutlined } from "@material-ui/icons";


export default function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
}) {
  const Marker = ({ lat, lng }) => (
    <div className="marker">
      <LocationOnOutlined color="primary" fontSize="large" />
    </div>
  );
  return (
    <div className="map">

    <div className="mapContainer">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDVNAi8lLh0wpnsm746LkkXpL6C8ejfqSE" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          mapTypeControl: true,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {places?.map((place, i) => (
          <Marker key={i} lat={Number(place.latitude) || 0} lng={Number(place.longitude) || 0} />
        ))}
      </GoogleMapReact>
    </div>
    </div>
  );
}
