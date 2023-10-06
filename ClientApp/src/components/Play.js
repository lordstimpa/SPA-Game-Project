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

export class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  handleScoreChange = (e) => {
    this.setState({ score: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      score: this.state.score,
    };

    fetch("https://localhost:7201/score/postuserscore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Score submitted successfully");
        } else {
          console.error("Failed to submit score");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <Main>
        <div className="GameWindow">
          <form onSubmit={this.handleSubmit}>
            <label>Score</label>
            <input
              type="number"
              value={this.state.score}
              onChange={this.handleScoreChange}
            ></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </Main>
    );
  }
}
