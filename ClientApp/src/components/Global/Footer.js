import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
  height: 250px;
  background: #000;
`;

export class Footer extends Component {
  static displayName = Footer.name;

  render() {
    return (
      <Main>
        <div></div>
      </Main>
    );
  }
}
