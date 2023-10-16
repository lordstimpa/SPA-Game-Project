import styled from "styled-components";

const JoinGame = () => {
  <>
    <div className="MainMenu">
      <h1>Guess the Word</h1>
      {joinGame === false ? (
        <div className="Menu">
          <button onClick={() => setJoinGame(true)}>Join Game</button>
          <button onClick={startGame}>Create Game</button>
        </div>
      ) : (
        <div className="Menu">
          <div className="InputContainer">
            <label>Game-ID:</label>
            <input type="text"></input>
          </div>
          <button onClick={handleJoinGame}>Submit</button>
        </div>
      )}
    </div>
  </>;
};
export default JoinGame;
