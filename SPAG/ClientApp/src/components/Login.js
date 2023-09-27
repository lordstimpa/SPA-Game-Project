import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
    background: red;
`;

export class Login extends Component {
  static displayName = Login.name;

  render() {
    return (
      <Main>
        <div>LOGIN</div>
      </Main>
    );
  }
}
