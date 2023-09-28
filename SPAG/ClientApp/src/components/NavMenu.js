import React, { Component } from "react";
import Styled from "styled-components";
import { NavLink } from "react-router-dom";

const Main = Styled.div`
  display: flex;
  flex-direction: column;
  height: 225px;

  & .Banner {
    height: 100%;
    background: linear-gradient(90deg, rgba(7,0,120,1) 0%, rgba(76,42,213,1) 50%, rgba(0,212,255,1) 100%);
  }

  & .Nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #000;

    & div {
      margin: 1.2rem 3rem;
      font-size: 1.2rem;

      & .Link {
        text-decoration: none;
        color: #fff;
      }

      & #Login, #Create {
        border-radius: 0.5rem;
        padding: 0.4rem 1rem;
        transition: 0.2s ease-in-out;
      }

      & #Home {
        margin-right: 2rem;
      }

      & #Login {
        margin-right: 2rem;
        border: 2px solid #fff;
        background: #fff;
        color: #000;

        &:hover {
          background: #000;
          color: #fff;
        }
      }

      & #Create {
        border: 2px solid #fff;

        &:hover {
          background: #fff;
          color: #000;
        }
      }
    }
  }
`;

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render() {
    return (
      <Main>
        <div className="Banner"></div>
        <div className="Nav">
          <div>
            <NavLink to="/" className="Link" id="Home">
              Home
            </NavLink>
            <NavLink to="/" className="Link">
              Play
            </NavLink>
          </div>
          <div>
            <NavLink to="/login" className="Link" id="Login">
              Login
            </NavLink>
            <NavLink to="/create" className="Link" id="Create">
              Create Account
            </NavLink>
          </div>
        </div>
      </Main>
    );
  }
}
