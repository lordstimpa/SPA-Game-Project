import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
  height: 1056px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .Title{
    width: 600px;
    padding: 2rem 0;

    & h3 {
      text-align: center;
    }
  }

  & .Form {
    border: 2px solid #000;
    border-radius: 1rem;
    width: 750px;
    
    & form {
      display: flex;
      flex-direction: column;
      margin: 2rem;

      & input {
        margin-bottom: 1rem;
      }

      & input[type=submit]{
        margin-top: 1rem;
      }
    }
  }
`;

export class Create extends Component {
  static displayName = Create.name;

  render() {
    return (
      <Main>
        <div className="Title">
          <h3>Create a new account</h3>
        </div>
        <div className="Form">
          <form>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>
            <label>Gamer-tag</label>
            <input type="text"></input>
            <input type="submit" value="Create"></input>
          </form>
        </div>
      </Main>
    );
  }
}
