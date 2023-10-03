import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
  width: 25%;
  min-height: 60svh;
  background: #f2f2f2;

  & h3 {
    margin-left: 2rem;
    margin-top: 2rem;
  }

  & .Board {
    margin: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid #000;

    & p {
        padding: 0.2rem 0.5rem;
    }
  }
`;

export class Leaderboard extends Component {
  static displayName = Leaderboard.name;
  /*
  const = {
    data: scores,
    isError,
    isLoading
    } = GetData("https:/score/gettoptenoverall")
*/
  render() {
    return (
      <Main>
        <h3>Leaderboard</h3>
        <div className="Board"></div>
      </Main>
    );
  }
}
