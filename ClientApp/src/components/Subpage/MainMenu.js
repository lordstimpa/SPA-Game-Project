import styled from "styled-components";
import HangMan from "../../img/hangman.png";

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    45deg,
    rgba(7, 0, 120, 1) 0%,
    rgba(93, 42, 213, 1) 50%,
    rgba(59, 0, 255, 1) 100%
  );

  & .Title {
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    & h1 {
      color: #f2f2f2;
      font-size: 4vw;
    }
  }

  & .Logo {
    height: 30%;
    display: flex;
    align-items: center;
    & img {
      width: 250px;
    }
  }

  & .Menu {
    width: 50%;
    height: 40%;
    display: flex;
    flex-direction: ${(props) => (props.joinGame ? "column" : "row")};
    justify-content: center;
    color: #f2f2f2;

    & .LabelContainer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 1rem;
    }

    & .InputContainer {
      display: flex;
      justify-content: center;
    }

    & .Back {
      align-self: center;
    }
  }

  & input {
    width: 100%;
  }

  & input,
  button {
    margin: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #f2f2f2;
    background: #000;
    color: #f2f2f2;
    align-self: center;
  }
`;

function MainMenu({ joinGame, setJoinGame, handleJoinGame, startGame }) {
  return (
    <Main joinGame={joinGame}>
      <div className="Title">
        <h1>Hangman</h1>
      </div>
      <div className="Logo">
        <img src={HangMan}></img>
      </div>
      {joinGame === false ? (
        <div className="Menu">
          <button onClick={() => setJoinGame(true)}>Join Game</button>
          <button onClick={startGame}>Create Game</button>
        </div>
      ) : (
        <>
          <div className="Menu">
            <div className="LabelContainer">
              <label>Game-ID:</label>
            </div>
            <div className="InputContainer">
              <input type="text" />
              <button onClick={handleJoinGame}>Submit</button>
            </div>
            <div className="Back">
              <button onClick={() => setJoinGame(false)}>Go Back</button>
            </div>
          </div>
        </>
      )}
    </Main>
  );
}

export default MainMenu;
