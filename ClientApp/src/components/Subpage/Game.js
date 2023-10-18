import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import authService from "../api-authorization/AuthorizeService";
import MainMenu from "./MainMenu";
import GameStart from "./GameStart";

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

    & > * {
      height: 100%;
    }
  }
`;

const Game = () => {
  const [connection, setConnection] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [hiddenAnswer, setHiddenAnswer] = useState("");
  const [joinGame, setJoinGame] = useState(false);

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
          console.log("SignalR Connected");
          setConnection(newConnection);

          newConnection.invoke("AddToGroup", gameId);

          newConnection.on("UpdateHiddenAnswer", (newHiddenAnswer) => {
            console.log("Received new hidden answer:", newHiddenAnswer);
            setHiddenAnswer(newHiddenAnswer);
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
              gameId={gameId}
              hiddenAnswer={hiddenAnswer}
              makeGuess={makeGuess}
            />
          </>
        )}
      </div>
    </Main>
  );
};
export default Game;
