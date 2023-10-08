import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Styled from "styled-components";

const Main = Styled.div`
  height: 1056px;
  display: flex;
  justify-content: center;

  & .GameWindow {
    height: 750px;
    width: 1000px;
    margin: 4rem 2rem;
    padding: 1rem;
    border: 2px solid #000;
    border-radius: 1rem;
  }
`;

const Play = () => {
  const [score, setScore] = useState(0);

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postScore();
  };

  const postScore = () => {
    fetch("/score/postuserscore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { score },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Score submitted successfully");
          console.log("Score value: " + score);
          setScore(0);
        } else {
          // Handle the error based on the response status code
          if (response.status === 400) {
            console.error("Bad Request: Invalid data sent.");
          } else {
            console.error("Failed to submit score. Status: " + response.status);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Main>
      <div className="GameWindow">
        <form onSubmit={handleSubmit}>
          <label>Score</label>
          <input
            type="number"
            value={score}
            onChange={handleScoreChange}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </Main>
  );
};

export default Play;
