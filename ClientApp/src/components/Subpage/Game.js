import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import authService from "../api-authorization/AuthorizeService";
import MainMenu from "./MainMenu";
import GameStart from "./GameStart";

const Main = styled.div`
  font-family: "Press Start 2P", sans-serif;
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

    & > * {
      height: 100%;
    }
  }
`;

const Game = () => {
  const [connection, setConnection] = useState(null);
  const [joinGame, setJoinGame] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [hiddenAnswer, setHiddenAnswer] = useState("");
  const [gameGuesses, setGameGuesses] = useState(null);
  const [gameScore, setGameScore] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    if (gameId) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("/gameHub")
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      newConnection
        .start()
        .then(() => {
          console.log("SignalR Connected to Game");
          setConnection(newConnection);

          newConnection.invoke("AddToGroup", gameId);

          newConnection.on(
            "UpdateHiddenAnswer",
            (newHiddenAnswer, newGuess) => {
              setHiddenAnswer(newHiddenAnswer);
              setGameGuesses(newGuess);
            }
          );

          newConnection.on("ShowGameResults", (newGameScore, newGameResult) => {
            setGameScore(newGameScore);
            setGameResult(newGameResult);
          });
        })
        .catch((err) => console.error(err));

      return () => {
        if (newConnection) {
          newConnection.stop();
        }
      };
    }
  }, [gameId]);

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
      setHiddenAnswer(response.data.hiddenAnswer);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleJoinGame = async () => {
    try {
    } catch {}
  };

  const makeGuess = (guess) => {
    connection.invoke("MakeGuess", gameId, guess).catch((error) => {
      console.error("Error making a guess:", error);
    });
  };

  return (
    <Main>
      <div className="GameWindow">
        {gameId === null ? (
          <MainMenu
            joinGame={joinGame}
            setJoinGame={setJoinGame}
            handleJoinGame={handleJoinGame}
            startGame={startGame}
          />
        ) : (
          <>
            <GameStart
              setGameId={setGameId}
              setJoinGame={setJoinGame}
              gameId={gameId}
              hiddenAnswer={hiddenAnswer}
              makeGuess={makeGuess}
              gameGuesses={gameGuesses}
              gameScore={gameScore}
              gameResult={gameResult}
            />
          </>
        )}
      </div>
    </Main>
  );
};
export default Game;
