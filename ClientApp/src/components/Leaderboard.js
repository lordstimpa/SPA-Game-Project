import React, { Component } from "react";
import Styled from "styled-components";
import API from "./API";

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

const Leaderboard = () => {
  const {
    data: scores,
    isError,
    isLoading,
  } = API("/api/score/gettoptenoverall");

  return (
    <Main>
      <h3>Leaderboard</h3>
      <div className="Board">
        {isLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {isError && (
          <div>
            <p>Error: Unable to fetch data.</p>
          </div>
        )}
        {!isLoading &&
          !isError &&
          scores.map((score, index) => <p key={index}>{score.score}</p>)}
      </div>
    </Main>
  );
};
export default Leaderboard;
