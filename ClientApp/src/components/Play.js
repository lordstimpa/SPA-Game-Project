import { useState } from "react";
import Styled from "styled-components";
import axios from "axios";
import authService from "./api-authorization/AuthorizeService";

const Main = Styled.div`
  height: 1056px;
  display: flex;
  justify-content: center;

  & .GameWindow {
    height: 750px;
    width: 1000px;
    margin: 4rem 2rem;
    padding: 1rem;
    border: 2px solid #000;
    border-radius: 1rem;
  }
`;

const Play = () => {
  const [score, setScore] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await authService.getAccessToken();

      if (!accessToken) {
        console.error("Access token is not available");
        return;
      }

      console.log("Payload to be sent:", { score: score });

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const data = { score: score };

      const response = await axios.post("/api/score/postuserscore", data, {
        headers,
      });

      if (response.status === 200) {
        console.log("Score sent successfully");
      } else {
        console.error("Failed to send score");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  return (
    <Main>
      <div className="GameWindow">
        <form onSubmit={handleSubmit}>
          <label>Score</label>
          <input
            type="number"
            value={score}
            onChange={handleScoreChange}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </Main>
  );
};

export default Play;
