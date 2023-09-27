import React, { Component } from "react";
import Styled from "styled-components";
import { Leaderboard } from "./Leaderboard";

const Main = Styled.div`
  min-height: 60svh;
  display: flex;
  flex-direction: row;
  background: #f2f2f2;

  & .Home {
    width: 75%;
    display: flex;
    justify-content: center;
    border-radius: 2rem;
    border: 2px solid #000;
    margin: 4rem;
    padding: 2rem;

    & .Title {
      width: 300px;

      & h2 {
        text-align: center;
        border-bottom: 2px solid #000;
      }
    }
  }
`;

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Main>
        <div className="Home">
          <div className="Title">
            <h2>Welcome to SPAG</h2>
          </div>
        </div>
        <Leaderboard />
      </Main>
    );
  }
}
