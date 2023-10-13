import React, { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  width: 50%;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > * {
      margin: 1rem 0;
      padding: 0.5rem;
    }
  }
`;

const GuessForm = ({ onGuess }) => {
  const [guess, setGuess] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(guess);
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </Main>
  );
};
export default GuessForm;
