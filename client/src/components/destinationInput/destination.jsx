import React, { useState } from "react";
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
      "&.Mui-focused fieldset": {
        borderColor: "gray",
        borderWidth: "0.2vw",
      },
    },
  },
  selectedOption: {
    borderBottom: "0.3vw solid #000",
  },
  recommendationList: {
    position: "absolute",
    top:"5.5vw",
    width: "60%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

  },
  recommendationItem: {
    padding: "0.5rem",
    cursor: "pointer",
  },
}));

export default function Destination() {
  const [activeOption, setActiveOption] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const recommendationData = {
    all: ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
    accommodation: ["Accommodation 1", "Accommodation 2", "Accommodation 3"],
    transportation: [
      "Transportation 1",
      "Transportation 2",
      "Transportation 3",
    ],
    activities: ["Activity 1", "Activity 2", "Activity 3"],
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setSearchText("");
    setRecommendations([]);
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);

    const filteredRecommendations = recommendationData[activeOption]
      .filter((recommendation) =>
        recommendation.toLowerCase().includes(inputText.toLowerCase())
      )
      .slice(0, 5);

    setRecommendations(filteredRecommendations);
  };

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
          <div
            className={`option ${
              activeOption === "all" ? classes.selectedOption : ""
            }`}
            onClick={() => handleOptionClick("all")}
          >
            <Category className="optionIcon" />
            <span className="optionName">Search all</span>
          </div>
          <div
            className={`option ${
              activeOption === "accommodation" ? classes.selectedOption : ""
            }`}
            onClick={() => handleOptionClick("accommodation")}
          >
            <Home className="optionIcon" />
            <span className="optionName">Accommodation</span>
          </div>
          <div
            className={`option ${
              activeOption === "transportation" ? classes.selectedOption : ""
            }`}
            onClick={() => handleOptionClick("transportation")}
          >
            <EmojiTransportation className="optionIcon" />
            <span className="optionName">Transportation</span>
          </div>
          <div
            className={`option ${
              activeOption === "activities" ? classes.selectedOption : ""
            }`}
            onClick={() => handleOptionClick("activities")}
          >
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
            placeholder={`Search ${activeOption ? `for ${activeOption}` : ""}`}
            fullWidth
            value={searchText}
            onChange={handleInputChange}
          />
           {recommendations.length > 0 && (
            <div className={classes.recommendationList}>
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className={classes.recommendationItem}
                  onClick={() => setSearchText(recommendation)}
                >
                  {recommendation}
                </div>
              ))}
            </div>
          )}
        </div>
        <img src="/images/down.png" alt="" className="downArrow" />
      </div>
    </div>
  );
}
