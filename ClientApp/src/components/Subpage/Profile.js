import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import authService from "../api-authorization/AuthorizeService";

const Main = styled.div`
  min-height: 1056px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f2;
  overflow: hidden;

  & .Body {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    width: 100%;
    margin: 4rem 2rem;
    border: 2px solid #000;
    border-radius: 1rem;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    color: #f2f2f2;
    background: linear-gradient(
      270deg,
      rgba(93, 42, 213, 1) 0%,
      rgba(59, 0, 255, 1) 100%
    );

    & .Title {
      width: 100%;
      padding: 3rem;
      padding-bottom: 1rem;
      margin-bottom: 0;

      & .UpperTitle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(242, 242, 242, 0.5);

        & .Settings {
          transition: 0.1s ease-in-out;
          text-decoration: underline;

          &:hover {
            color: #000;
            cursor: pointer;
          }
        }
      }

      & h1 {
        margin: 0;
        padding-top: 1rem;
      }
    }

    & .Lower {
      width: 100%;
      display: flex;
      padding: 2rem;

      & .Desc,
      .Stats {
        height: max-content;
        padding: 2rem;
        margin: 1rem;
        margin-top: 0;
        border-radius: 1rem;
        background: rgba(0, 0, 0, 0.3);

        & h5 {
          border-bottom: 1px solid rgba(242, 242, 242, 0.5);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
      }

      & .Desc {
        width: 65%;
      }

      & .Stats {
        width: 35%;
      }
    }
  }
`;

const Profile = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await authService.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get("/api/user/getuser", {
          headers: headers,
        });
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Main>
      <div className="Body">
        <div className="Title">
          <div className="UpperTitle">
            <h5>Personal profile</h5>
            <h5 className="Settings">Settings</h5>
          </div>
          <h1>{userData.gamerTag}</h1>
        </div>
        <div className="Lower">
          <div className="Desc">
            <h5>Description</h5>
            {userData.description !== null ? (
              <p>{userData.description}</p>
            ) : (
              <p>You have not added a description to your personal profile.</p>
            )}
          </div>
          <div className="Stats">
            <h5>Statistics</h5>
            <p>Games played: {userData.gamesPlayed}</p>
            <p>Total score: {userData.score}</p>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Profile;
