import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
    background: green;
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
