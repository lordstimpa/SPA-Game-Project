import Styled from "styled-components";
import API from "../Global/API";

const Main = Styled.div`
  min-height: 1056px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #f2f2f2;

  & h2, h3, h4 {
    font-family: "Press Start 2P", sans-serif;
  }

  & .Text, .Board {
    border: 4px solid #000;
    width: 100%;
    height: min-content;
    margin: 4rem 2rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

    & p {
      margin: 0 1rem 1rem 1rem;
    }
  }

  & .Text {
    max-width: 1200px;
    background: linear-gradient(45deg, rgba(93,42,213,1) 0%,  rgba(59,0,255,1) 100%);
    color: #f2f2f2;
    padding: 2rem 3rem;

    & h2 {
      font-size: 2.5rem;
      text-align: center;
      margin: 2rem;
    }

    & h4 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    & div {
      border-radius: 1rem;
      margin: 1rem;
      padding: 2rem;
      background: rgba(0,0,0, 0.3);
    }
  }

  & .Board {
    max-width: 500px;
    background: linear-gradient(270deg, rgba(93,42,213,1) 0%,  rgba(59,0,255,1) 100%);
    color: #f2f2f2;

    & h2 {
      text-align: center;
      font-size: 1.7rem;
      margin-bottom: 2rem;
    }

    & ol {
      border-radius: 1rem;
      padding: 1rem 4rem 1rem 4rem;
      background: rgba(0,0,0, 0.3);
    }

    & li {
      padding: 1rem 0.5rem;
    }
  }
`;

const Home = () => {
  const {
    data: scores,
    isError,
    isLoading,
  } = API("/api/score/gettoptenoverall");

  return (
    <Main>
      <div className="Text">
        <h2>Welcome to SPAG!</h2>
        <div>
          <p>
            SPAG is a dynamic single-page web application designed to elevate
            your Hangman gaming experience. Along with user registration and
            login features, we offer a unique twist: a global chat that lets you
            connect with fellow players in real time. Whether you're a wordplay
            enthusiast or just looking for a fun way to challenge your
            vocabulary, SPAG is the place to be.
          </p>
        </div>
        <div>
          <h4>Key Features:</h4>
          <ol>
            <li>
              <strong>User Registration and Login: </strong>Create your SPAG
              account or log in to keep track of your progress, save your
              scores, and compete with other players on the global leaderboard.
            </li>
            <li>
              <strong>Hangman Game: </strong>Test your word-guessing skills with
              our classic Hangman game. You'll be presented with a hidden word,
              and your mission is to guess the letters correctly before the
              hangman is complete. The more words you guess correctly, the
              higher your score.
            </li>
            <li>
              <strong>Global Leaderboard: </strong>Check out the leaderboard on
              the homepage to see how you stack up against the top 10 players
              worldwide. Can you claim the top spot and become the Hangman
              champion?
            </li>
            <li>
              <strong>Global Chat: </strong>Engage with other SPAG players in
              the global chatroom. Share tips, strategies, or simply enjoy a
              friendly conversation as you play the game.
            </li>
          </ol>
        </div>
        <div>
          <h4>How to Play:</h4>
          <ol>
            <li>
              <strong>Register or Log In: </strong>Start by creating your SPAG
              account or logging in with your existing credentials.
            </li>
            <li>
              <strong>Hangman Game: </strong>Once you're logged in, you can
              start playing Hangman. Guess the letters, reveal the hidden words,
              and earn points for each correct guess.
            </li>
            <li>
              <strong>Score and Ranking: </strong>Your score is calculated based
              on your correct guesses. The more words you solve, the higher your
              score will be. Your ranking will improve as your score increases.
            </li>
            <li>
              <strong>Compete Globally: </strong>Check the leaderboard on the
              homepage to see how you compare to other players worldwide. Can
              you make it to the top 10 and earn your place among the Hangman
              elites?
            </li>
            <li>
              <strong>Global Chat: </strong>Don't forget to join the lively
              global chatroom where you can discuss strategies, share your
              achievements, or simply enjoy a fun conversation with fellow word
              game enthusiasts.
            </li>
          </ol>
        </div>
        <div>
          <h4>Join the Fun:</h4>
          <p>
            SPAG is not just a game; it's a global community of word enthusiasts
            who love to challenge themselves and connect with others. Whether
            you're a seasoned Hangman pro or new to the game, SPAG provides an
            enjoyable and competitive environment for everyone.
          </p>
          <p>
            Get ready to unravel hidden words, earn high scores, and showcase
            your word mastery on the global leaderboard. Register or log in now,
            join the chat, and let the Hangman games begin! Have fun and may the
            best wordsmith win.
          </p>
        </div>
      </div>
      <div className="Board">
        <h2>Leaderboard</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data</p>}
        {scores && (
          <ol>
            {scores.map((entry, index) => (
              <li key={index}>
                {entry.gamerTag}: {entry.score} points
              </li>
            ))}
          </ol>
        )}
      </div>
    </Main>
  );
};
export default Home;
