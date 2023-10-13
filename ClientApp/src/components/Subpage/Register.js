import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
  background: #f2f2f2;

  & .FormContainer {
    
  }
`;

export class Register extends Component {
  static displayName = Register.name;

  render() {
    return (
      <Main>
        <div className="FormContainer">
          <h2>Use a local account to log in.</h2>
          <form>
            <label>Email</label>
            <input type="text"></input>
            <label>Gamer Tag</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>
            <label>Confirm Password</label>
            <input type="text"></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </Main>
    );
  }
}
