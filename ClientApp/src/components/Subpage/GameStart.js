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
    font-family: sans-serif;
    font-weight: bold;

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
      font-size: 2.2rem;
    }
  }

  & .ResultsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f2f2f2;

    & h2 {
      font-size: 3rem;
    }

    & p {
      font-size: 1.5rem;
    }

    & button {
      margin: 1rem;
      padding: 0.5rem 1rem;
      border: 1px solid #f2f2f2;
      background: #000;
      color: #f2f2f2;
      align-self: center;
    }
  }
`;

function GameStart({
  setGameId,
  gameId,
  hiddenAnswer,
  makeGuess,
  gameGuesses,
  gameScore,
  gameResult,
}) {
  return (
    <Main>
      <div className="GameMenu">
        <p>Game-ID: {gameId}</p>
      </div>
      <div className="Game">
        <div className="GameChild">
          <h2 className="HiddenAnswer">{hiddenAnswer}</h2>
        </div>
        {gameResult !== null ? (
          <div className="ResultsContainer">
            <h2>{gameResult ? "You WIN! :D" : "You LOST! :("}</h2>
            <p>Score: {gameScore}</p>
            <p>Wrong guesses: {gameGuesses}</p>
            <button onClick={() => setGameId(null)}>Back to Menu</button>
          </div>
        ) : (
          <GuessForm makeGuess={makeGuess} />
        )}
      </div>
    </Main>
  );
}

export default GameStart;
