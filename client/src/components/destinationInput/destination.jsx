import React from "react";
import "./destination.css";
import TextField from "@material-ui/core/TextField";
import {
  Category,
  DirectionsBike,
  EmojiTransportation,
  Home,
  Search,
} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typewriter from "typewriter-effect";

export default function Destination() {
  return (
    <div className="destination">
      <div className="wrapper">
        <div className="header">
        <Typewriter
        
 onInit={(typewriter) => {
     typewriter
         .typeString("Stay Close to Nature")
         .pauseFor(100)
         .deleteAll()
         .typeString("Do something Adventurous")
          .pauseFor(100)
          .deleteAll()
          .typeString("Travel Sustainably")
          .pauseFor(100)
          .deleteAll()
          .typeString("Save The Environment")
          .pauseFor(100)
          .deleteAll()
          .start();
 }}
  options={{ 
    autoStart: true,
    loop: true,
    delay: 75,
  }}

/>
        </div>
        <div className="options">
          <div className="option">
            <Category />
            <span className="optionName">Search all</span>
          </div>
          <div className="option">
            <Home />
            <span className="optionName">Accomodation</span>
          </div>
          <div className="option">
            <EmojiTransportation />
            <span className="optionName">Transportation</span>
          </div>
          <div className="option">
            <DirectionsBike />
            <span className="optionName">Activities</span>
          </div>
        </div>
        <div className="searchBar">
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "20px", // Adjust border radius
                      fontSize: "1.1vw",
                      backgroundColor: "#34e0a1",
                      color: "#000000",
                    }}
                  >
                    search
                  </Button>
                </InputAdornment>
              ),
              style: {
                borderRadius: "25px",
                fontSize: "1.5vw",
                width: "65%",
                margin: "auto",
                border: "2px solid #000",
              },
            }}
            placeholder="Search"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
