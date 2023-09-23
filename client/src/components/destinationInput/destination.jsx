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
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  customTextField: {
    width: "65%",
    
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        borderWidth: "0.2vw",
        borderRadius: "2vw",
        margin: "auto",
      },
      '&.Mui-focused fieldset': {
        borderColor: "gray",
        borderWidth: "0.2vw",

      },
    },
  },
}));

export default function Destination() {
  const classes = useStyles();
  return (
    <div className="destination" id="destination">
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
            <Category className="optionIcon" />
            <span className="optionName">Search all</span>
          </div>
          <div className="option">
            <Home className="optionIcon" />
            <span className="optionName">Accomodation</span>
          </div>
          <div className="option">
            <EmojiTransportation className="optionIcon" />
            <span className="optionName">Transportation</span>
          </div>
          <div className="option">
            <DirectionsBike className="optionIcon" />
            <span className="optionName">Activities</span>
          </div>
        </div>
        <div className="searchBar">
          <TextField
            variant="outlined"
            className={classes.customTextField}
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
                      borderRadius: "1.8vw",
                      fontSize: "0.9vw",
                      backgroundColor: "#34e0a1",
                      color: "#000000",
                      fontFamily: "QuickSand",
                      fontWeight: "bold",
                    }}
                  >
                    search
                  </Button>
                </InputAdornment>
              ),
              style: {
                fontSize: "1.2vw",
                fontFamily: "QuickSand",
                fontWeight: "bold",
                height: "3.5vw",
              },
            }}
            placeholder="Search"
            fullWidth
          />
        </div>
        <img src="/images/down.png" alt="" className="downArrow" />
      </div>
    </div>
  );
}
