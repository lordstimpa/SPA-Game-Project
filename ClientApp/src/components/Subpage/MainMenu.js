import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(7, 0, 120, 1) 0%,
    rgba(76, 42, 213, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );

  & button,
  input {
    display: inline-block;
    height: min-content;
    margin: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #f2f2f2;
    border-radius: 0.5rem;
    background: #000;
    color: #f2f2f2;
    font-size: 1.2rem;
  }

  & button {
    align-self: flex-end;
  }

  & input {
    width: 400px;
  }

  & .Title {
    height: 30%;
    display: flex;
    align-items: center;
    margin-bottom: 7rem;

    & h1 {
      color: #f2f2f2;
      font-size: 6vw;
      height: 25%;
    }
  }

  & .Menu {
    display: flex;
    flex-direction: row;

    & .InputContainer {
      display: flex;
      flex-direction: column;

      & label {
        margin-left: 1rem;
        color: #f2f2f2;
      }
    }
  }

  & .Back {
    height: 35%;
    display: flex;
    align-items: center;

    & button {
      align-self: center;
    }
  }
`;

function MainMenu({ joinGame, setJoinGame, handleJoinGame, startGame }) {
  return (
    <Main>
      <div className="Title">
        <h1>Guess the Word</h1>
      </div>
      {joinGame === false ? (
        <div className="Menu">
          <button onClick={() => setJoinGame(true)}>Join Game</button>
          <button onClick={startGame}>Create Game</button>
        </div>
      ) : (
        <>
          <div className="Menu">
            <div className="InputContainer">
              <label>Game-ID:</label>
              <input type="text" />
            </div>
            <button onClick={handleJoinGame}>Submit</button>
          </div>
          <div className="Back">
            <button onClick={() => setJoinGame(false)}>Go Back</button>
          </div>
        </>
      )}
    </Main>
  );
}

export default MainMenu;
