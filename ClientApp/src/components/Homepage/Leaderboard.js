import React from "react";
import Styled from "styled-components";
import API from "../Global/API";

const Main = Styled.div`
  width: 25%;
  min-height: 60vh;
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
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data</p>}
        {scores && (
          <ul>
            {scores.map((entry, index) => (
              <li key={index}>
                <p>
                  {entry.gamerTag}: {entry.score}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Main>
  );
};

export default Leaderboard;
