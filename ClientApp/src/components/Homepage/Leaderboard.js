import React from "react";
import Styled from "styled-components";
import API from "../Global/API";

const Main = Styled.div`
  width: 25%;
  background: #f2f2f2;
  margin-top: 2rem;

  & .Board {
    min-height: 550px;
    margin: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    & h3 {
      margin-bottom: 2rem;
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
      <div className="Board">
        <h3>Leaderboard</h3>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data</p>}
        {scores && (
          <>
            {scores.map((entry, index) => (
              <p key={index}>
                {entry.gamerTag}: {entry.score}
              </p>
            ))}
          </>
        )}
      </div>
    </Main>
  );
};

export default Leaderboard;
