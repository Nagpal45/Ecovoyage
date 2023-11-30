import React from "react";
import "./result.css";
import { ArrowBack, AttachMoney, LocationOn } from "@material-ui/icons";

export default function Result({
  selectedAttraction,
  selectedHotel,
  selectedRestaurant,
  setResult,
  totalDistance,
  totalCO2
}) {
  return (
    <div className="result">
      <ArrowBack
        className="resultBack"
        onClick={() => setResult(false)}
        style={{ fontSize: "2vw", cursor: "pointer" }}
      />
      <div className="resultPlaces">
        {selectedHotel ? (
          <>
            <h3>Hotel</h3>
            {selectedHotel?.map((place, index) => (
              <div className="resultPlace" key={index}>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://images.unsplash.com/photo-1521737711867-5f2dcf4d46c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                  }
                  alt=""
                />
                <div className="resultPlacedetails">
                  <h5>{place.name}</h5>
                  <p>{parseFloat(place.distance).toFixed(2)} km</p>
                  <div className="resultplaceDist r1">
                    <LocationOn
                      color="black"
                      style={{
                        fontSize: "1.2vw",
                      }}
                    />
                    <p>
                      {place.address ? place.address : place.location_string}
                    </p>
                  </div>
                  {place.price ? (
                    <div className="resultplaceDist">
                      <AttachMoney
                        color="black"
                        style={{
                          fontSize: "1.2vw",
                        }}
                      />
                      <p>{place.price?.replace("$", "")?.replace("$", "")}</p>
                    </div>
                  ) : null}
                  <div className="resultLinks">
                    {place.website ? (
                      <a href={place.website} target="_blank" rel="noreferrer">
                        <img
                          src="/images/website.png"
                          alt=""
                          className="resultwebsiteLink"
                        />
                      </a>
                    ) : null}
                    <a
                      href={`https://www.tripadvisor.com/Hotel_Review-g304551-d${place.location_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="/images/tripadvisor.png"
                        alt=""
                        className="resulttripLink"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : null}
        {selectedRestaurant ? (
            <>
        <h3>Restaurant</h3>
        {selectedRestaurant?.map((place, index) => (
          <div className="resultPlace" key={index}>
            <img
              src={
                place.photo
                  ? place.photo.images.large.url
                  : "https://images.unsplash.com/photo-1521737711867-5f2dcf4d46c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              }
              alt=""
            />
            <div className="resultPlacedetails">
              <h5>{place.name}</h5>
              <p>{parseFloat(place.distance).toFixed(2)} km</p>
              <div className="resultplaceDist r1">
                <LocationOn
                  color="black"
                  style={{
                    fontSize: "1.2vw",
                  }}
                />
                <p>{place.address ? place.address : place.location_string}</p>
              </div>
              {place.price ? (
                <div className="resultplaceDist">
                  <AttachMoney
                    color="black"
                    style={{
                      fontSize: "1.2vw",
                    }}
                  />
                  <p>{place.price?.replace("$", "")?.replace("$", "")}</p>
                </div>
              ) : null}
              <div className="resultLinks">
                {place.website ? (
                  <a href={place.website} target="_blank" rel="noreferrer">
                    <img
                      src="/images/website.png"
                      alt=""
                      className="resultwebsiteLink"
                    />
                  </a>
                ) : null}
                <a
                  href={`https://www.tripadvisor.com/Hotel_Review-g304551-d${place.location_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images/tripadvisor.png"
                    alt=""
                    className="resulttripLink"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
        </>
        ) : null}
        {selectedAttraction ? (<>
        <h3>Attraction</h3>
        {selectedAttraction?.map((place, index) => (
          <div className="resultPlace" key={index}>
            <img
              src={
                place.photo
                  ? place.photo.images.large.url
                  : "https://images.unsplash.com/photo-1521737711867-5f2dcf4d46c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              }
              alt=""
            />
            <div className="resultPlacedetails">
              <h5>{place.name}</h5>
              <p>{parseFloat(place.distance).toFixed(2)} km</p>
              <div className="resultplaceDist r1">
                <LocationOn
                  color="black"
                  style={{
                    fontSize: "1.2vw",
                  }}
                />
                <p>{place.address ? place.address : place.location_string}</p>
              </div>
              {place.price ? (
                <div className="resultplaceDist">
                  <AttachMoney
                    color="black"
                    style={{
                      fontSize: "1.2vw",
                    }}
                  />
                  <p>{place.price?.replace("$", "")?.replace("$", "")}</p>
                </div>
              ) : null}
              <div className="resultLinks">
                {place.website ? (
                  <a href={place.website} target="_blank" rel="noreferrer">
                    <img
                      src="/images/website.png"
                      alt=""
                      className="resultwebsiteLink"
                    />
                  </a>
                ) : null}
                <a
                  href={`https://www.tripadvisor.com/Hotel_Review-g304551-d${place.location_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images/tripadvisor.png"
                    alt=""
                    className="resulttripLink"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
        </>) : null}
      </div>
      <div className="resultInfo">
        <h3>Total Cost</h3>
        <div className="resultInfoDetails">
          <div className="resultInfoDetail">
            <h5>Hotel</h5>
            <p>
              {selectedHotel && selectedHotel[0]?.price
                ? selectedHotel[0].price
                : "$" + 300}
            </p>
          </div>
          <div className="resultInfoDetail">
            <h5>Restaurant</h5>
            <p>
              {selectedRestaurant && selectedRestaurant[0]?.price
                ? selectedRestaurant[0].price
                : "$" + 1000}
            </p>
          </div>
          <div className="resultInfoDetail">
            <h5>Attraction</h5>
            <p>
              {selectedAttraction && selectedAttraction[0]?.price
                ? selectedAttraction[0].price
                : "$" + 500}
            </p>
          </div>
          <div className="resultInfoDetail">
            <h5>Distance</h5>
            <p>{
              parseFloat(totalDistance).toFixed(2)
            } km</p>
          </div>
          <div className="resultInfoDetail">
            <h5>CO2 emission</h5>
            <p>{totalCO2 ? totalCO2 : "Not calculated"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
