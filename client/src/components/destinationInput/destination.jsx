import React, { useEffect, useRef, useState } from "react";
import "./destination.css";
import {
  Category,
  DirectionsBike,
  EmojiTransportation,
  Home,
  Search,
} from "@material-ui/icons";
import Typewriter from "typewriter-effect";

export default function Destination() {
  const [activeOption, setActiveOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const [isInputFocused, setInputFocus] = useState(false);

  const inputRef = useRef(null);
  // Handle focus and blur events of the input field
  const handleInputFocus = () => {
    setInputFocus(true);
  };
  const handleInputBlur = () => {
    setInputFocus(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToDestination = () => {
      window.scrollTo({
        top: 670, 
        behavior: "smooth", 
      });
  }
  

  const handleOptionClick = (option) => {
    setActiveOption(option);
    const newRecommendations = generateRecommendations(option, searchQuery);
    setRecommendations(newRecommendations);
  };
  

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (event.target === document.activeElement) {
      const newRecommendations = generateRecommendations(activeOption, query);
      setRecommendations(newRecommendations);
    } else {
      setRecommendations([]);
    }
  };

  function generateRecommendations(selectedOption, query) {
    const dummyData = {
      all: ["Hotel in New York", "Hiking in the Alps", "Car rental deals"],
      accommodation: [
        "Hotels in Paris",
        "Luxury resorts in Bali",
        "Cabin rentals in the Rockies",
        "Car pool in Berlin"
      ],
      activities: [
        "Biking trails near you",
        "Scuba diving spots",
        "Ski resorts in Switzerland",
      ],
      transportation: [
        "Flight to Tokyo",
        "Train tickets in Europe",
        "Rental cars in Miami",
      ],
    };

    const matchingRecommendations = dummyData[selectedOption].filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    return matchingRecommendations || [];
  }
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
            className={
              activeOption === "all" ? "activeoption option" : "option"
            }
            onClick={() => handleOptionClick("all")}
          >
            <Category className="optionIcon" />
            <span className="optionName">Search all</span>
          </div>
          <div
            className={
              activeOption === "accommodation"
                ? "activeoption option"
                : "option"
            }
            onClick={() => handleOptionClick("accommodation")}
          >
            <Home className="optionIcon" />
            <span className="optionName">Accommodation</span>
          </div>
          <div
            className={
              activeOption === "transportation"
                ? "activeoption option"
                : "option"
            }
            onClick={() => handleOptionClick("transportation")}
          >
            <EmojiTransportation className="optionIcon" />
            <span className="optionName">Transportation</span>
          </div>
          <div
            className={
              activeOption === "activities" ? "activeoption option" : "option"
            }
            onClick={() => handleOptionClick("activities")}
          >
            <DirectionsBike className="optionIcon" />
            <span className="optionName">Activities</span>
          </div>
        </div>
        <div className="searchBar">
          <div className="searchInputContainer">
            <Search className="search" />
            <input
              type="text"
              className="searchInput"
              placeholder={"Search for "+activeOption }
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus} 
              onBlur={handleInputBlur} 
              ref={inputRef} 
            />
          </div>
          {document.activeElement ===
            document.querySelector(".searchInput") && isInputFocused && recommendations.length > 0 && (
            <ul className="recommendations">
              {recommendations.slice(0, 4).map((item, index) => (
                <li key={index} className="recommendationItem">
                  <Search className="searchIcon" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <img src="/images/down.png" alt="" className="downArrow" onClick={scrollToDestination}/>
      </div>
    </div>
  );
}
