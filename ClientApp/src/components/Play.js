import React, { Component, useEffect, useState } from "react";
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

  const postScore = () => {
    console.log("Sending score:", score); // Add this line
    fetch("/score/postuserscore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Score: score }), // Make sure the property name matches your GameModel
    })
      .then((response) => {
        if (response.ok) {
          console.log("Score submitted successfully");
          // You can add code here to handle a successful submission, such as clearing the input field.
        } else {
          console.error("Failed to submit score");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postScore();
  };

  return (
    <Main>
      <div className="GameWindow">
        <form onSubmit={handleSubmit}>
          <label>Score</label>
          <input type="number" value={score} onChange={handleScoreChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Main>
  );
};

export default Play;
