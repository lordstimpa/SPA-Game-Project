import React, { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  width: 65%;
  height: 100%;
  display: flex;

  & form {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    text-align: center;

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
