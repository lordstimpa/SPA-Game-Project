import React, { Component } from "react";
import Styled from "styled-components";
import { NavLink } from "react-router-dom";

const Main = Styled.div`
  display: flex;
  flex-direction: column;

  & .Banner {
    margin: 1.5rem;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    & h1 {
    }
  }

  & .Nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #000;

    & div {
      margin: 1.5rem 3rem;
      font-size: 1.3rem;

      & .Link {
        text-decoration: none;
        color: #fff;
      }

      & #Login, #Create {
        border-radius: 1rem;
        border: 2px solid #fff;
        padding: 0.6rem;
      }

      & #Login {
        margin-right: 2rem;
      }

      & #Create {
        
      }
    }
  }
`;

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render() {
    return (
      <Main>
        <div className="Banner">
          <h1>-Banner image goes here-</h1>
        </div>
        <div className="Nav">
          <div>
            <NavLink to="/" className="Link">
              Home
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
