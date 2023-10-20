import { useEffect, useState } from "react";
import axios from "axios";
import authService from "../api-authorization/AuthorizeService";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";

const Main = Styled.div`
  display: flex;
  flex-direction: column;
  height: 225px;

  & .Banner {
    height: 100%;
    background: radial-gradient(circle, rgba(7,0,120,1) 0%, rgba(93,42,213,1) 50%, rgba(59,0,255,1) 100%);
  }

  & .Nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #000;
    
    & .LoginMenu, .HomeMenu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    }

    & div {
      margin: 1rem 3rem;
      font-size: 1.2rem;

      & .Link {
        text-decoration: none;
        color: #fff;
      }

      & #Login, #Register, #Logout, #Profile {
        border-radius: 0.5rem;
        padding: 0.4rem 1rem;
        transition: 0.2s ease-in-out;
      }

      & #Home {
        margin-right: 2rem;
      }

      & #Login, #Profile {
        margin-right: 2rem;
        border: 2px solid #fff;
        background: #fff;
        color: #000;

        &:hover {
          background: #000;
          color: #fff;
        }
      }

      & #Register, #Logout {
        border: 2px solid #fff;

        &:hover {
          background: #fff;
          color: #000;
        }
      }
    }
  }
`;

const NavMenu = () => {
  const [userLogggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await authService.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get("/api/user/userloggedin", {
          headers: headers,
        });
        setUserLoggedIn(response.data);
      } catch (error) {
        console.error("Error fetching loggin status:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Main>
      <div className="Banner"></div>
      <div className="Nav">
        <div className="HomeMenu">
          <Link to="/" className="Link" id="Home">
            Home
          </Link>
          {userLogggedIn === true && (
            <Link to="/Play" className="Link">
              Play
            </Link>
          )}
        </div>
        <div className="LoginMenu">
          <LoginMenu className="Link" />
        </div>
      </div>
    </Main>
  );
};
export default NavMenu;
