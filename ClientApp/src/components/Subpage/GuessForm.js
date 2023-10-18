import { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;

  & form {
    display: flex;
    width: 100%;
    flex-direction: column;

    & input {
      margin: 1rem;
      padding: 0.5rem 1rem;
      border: 1px solid #f2f2f2;
      border-radius: 0.5rem;
      background: #000;
      color: #f2f2f2;
      align-self: center;
    }

    & label {
      width: 50%;
      color: #f2f2f2;
      align-self: center;
    }

    & input[type="text"] {
      width: 50%;
    }

    & input[type="submit"] {
      width: 150px;
    }
  }
`;

const GuessForm = ({ makeGuess }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    makeGuess(guess);
    setGuess("");
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <label>Enter a letter or the entire word:</label>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <input type="submit" value="Make a guess!" />
      </form>
    </Main>
  );
};
export default GuessForm;
