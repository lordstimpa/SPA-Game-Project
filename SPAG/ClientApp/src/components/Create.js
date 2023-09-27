import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
    width: 500px;
    height: 500px;
`;

export class Create extends Component {
  static displayName = Create.name;

  render() {
    return (
      <Main>
        <div>CREATE</div>
      </Main>
    );
  }
}
