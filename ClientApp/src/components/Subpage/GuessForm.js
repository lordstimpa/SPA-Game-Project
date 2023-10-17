import { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  width: 65%;
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

const GuessForm = ({ makeGuess }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    makeGuess(guess);
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </Main>
  );
};
export default GuessForm;
