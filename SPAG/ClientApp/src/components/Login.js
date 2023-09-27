import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
    width: 500px;
    height: 500px;
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
