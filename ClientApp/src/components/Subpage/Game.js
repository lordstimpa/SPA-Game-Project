import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import authService from "../api-authorization/AuthorizeService";
import GuessForm from "./GuessForm";
import JoinGame from "./JoinGame";

const Main = styled.div`
  height: 1056px;
  width: 65%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  & .GameWindow {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin: 4rem 2rem;
    border: 5px solid #000;
    border-radius: 1rem;
    overflow: hidden;

    // Main Menu (start-screen)
    & .MainMenu {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        rgba(7, 0, 120, 1) 0%,
        rgba(76, 42, 213, 1) 50%,
        rgba(0, 212, 255, 1) 100%
      );

      & h1 {
        color: #f2f2f2;
        font-size: 6vw;
      }

      & .Menu {
        display: flex;
        flex-direction: row;
        margin-bottom: 15rem;

        & .InputContainer {
          display: flex;
          flex-direction: column;

          & label {
            margin-left: 1rem;
            color: #f2f2f2;
          }
        }

        & button,
        input {
          border: 1px solid #f2f2f2;
          border-radius: 0.5rem;
          background: #000;
          color: #f2f2f2;
          margin: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1.2rem;
          height: min-content;
        }

        & input {
          width: 30vw;
        }
      }
    }

    // Game Window (game-active)
    & .GameStart {
      display: flex;
      justify-content: space-between;
      width: 100%;
      background: #000;
      padding: 0.5rem 1rem;
      align-items: center;

      & p {
        margin: 0.4rem 0.5rem;
      }

      & button {
        background: #000;
        border: 1px solid #fff;
        border-radius: 0.5rem;
        padding: 0.4rem 0.5rem;
      }

      & p,
      button {
        color: #fff;
      }
    }
  }
`;

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [joinGame, setJoinGame] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = async () => {
    try {
      const accessToken = await authService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post("/api/game/startgame", null, {
        headers: headers,
      });

      setGameId(response.data.gameId);
      setAnswer(null);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleJoinGame = async () => {};

  const handleGuess = async (guess) => {
    try {
      const accessToken = await authService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `/api/game/guessword/${gameId}/${guess}`,
        {
          headers: headers,
        }
      );

      setAnswer(response.data.correct);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleScore = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await authService.getAccessToken();

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const data = { score: score };

      const response = await axios.post("/api/score/postuserscore", data, {
        headers: headers,
      });
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <Main>
      <div className="GameWindow">
        {gameId === null ? (
          <JoinGame />
        ) : (
          <>
            <div className="GameStart">
              <p>Game-ID: {gameId}</p>
              <button onClick={startGame}>New Game</button>
            </div>
            <div>
              <h2>Guess the Word!</h2>
              {answer !== null && (
                <p>{answer ? "Correct guess!" : "Incorrect guess!"}</p>
              )}
            </div>
            <GuessForm onGuess={handleGuess} />
          </>
        )}
      </div>
    </Main>
  );
};
export default Game;
