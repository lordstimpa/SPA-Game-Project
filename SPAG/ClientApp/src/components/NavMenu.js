import React, { Component } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginMenu } from "./api-authorization/LoginMenu";

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

      & #Login, #Register {
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

      & #Register {
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

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Main>
        <div className="Banner"></div>
        <div className="Nav">
          <div>
            <Link to="/" className="Link" id="Home">
              Home
            </Link>
            <Link to="/Play" className="Link">
              Play
            </Link>
          </div>
          <div>
            <LoginMenu className="Link" />
          </div>
        </div>
      </Main>
    );
  }
}
