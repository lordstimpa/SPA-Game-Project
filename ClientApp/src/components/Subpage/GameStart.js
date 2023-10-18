import styled from "styled-components";
import GuessForm from "./GuessForm";

const Main = styled.div`
  width: 100%;
  background: linear-gradient(
    45deg,
    rgba(7, 0, 120, 1) 0%,
    rgba(76, 42, 213, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );

  & .GameMenu {
    height: 6%;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    background: #000;
    color: #f2f2f2;

    & p {
      padding: 0.5rem 0;
      margin: 0;
    }
  }

  & .Game {
    height: 94%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    & h2 {
      color: #f2f2f2;
    }

    & .GameChild {
      text-align: center;
    }

    & .HiddenAnswer {
      letter-spacing: 0.5rem;
      font-size: 3rem;
    }
  }
`;

function GameStart({ gameId, hiddenAnswer, makeGuess }) {
  return (
    <Main>
      <div className="GameMenu">
        <p>Game-ID: {gameId}</p>
      </div>
      <div className="Game">
        <div className="GameChild">
          <h2>Hangman - Guess the Word!</h2>
        </div>
        <div className="GameChild">
          <h2 className="HiddenAnswer">{hiddenAnswer}</h2>
        </div>
        <GuessForm makeGuess={makeGuess} />
      </div>
    </Main>
  );
}

export default GameStart;
