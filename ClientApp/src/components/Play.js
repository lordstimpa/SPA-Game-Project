import React, { Component } from "react";
import Styled from "styled-components";

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

export class Play extends Component {
  static displayName = Play.name;

  render() {
    return (
      <Main>
        <div className="GameWindow">
          <p>Hej Leo</p>
        </div>
      </Main>
    );
  }
}
