import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import authService from "../api-authorization/AuthorizeService";
import GuessForm from "./GuessForm";

const Main = styled.div`
  height: 1056px;
  display: flex;
  width:65%;

  & .GameWindow {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 750px;
    width: 100%;
    margin: 4rem 2rem;
    border: 2px solid #000;
    border-radius: 1rem;
    overflow: hidden;

    & .GameMenu {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      background: #000;
      padding: 0.5rem 1rem;

      & button {
        background: #000;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 0.5rem;
        padding: 0.4rem 0.5rem;
      }
    }
  }
`;

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [answer, setAnswer] = useState(null);
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
        <div className="GameMenu">
          <button onClick={startGame}>New Game</button>
        </div>
        <div>
          <h2>Guess the Word!</h2>
          {answer !== null && (
            <p>{answer ? "Correct guess!" : "Incorrect guess!"}</p>
          )}
        </div>
        <GuessForm onGuess={handleGuess} />
      </div>
    </Main>
  );
};
export default Game;
