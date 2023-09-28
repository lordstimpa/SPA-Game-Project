import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  & .Help {
    margin: 1rem;
    width: 600px;
    display: flex;
    justify-content: space-between;

    & .Link {
      color: #000;
    }
  }
`;

export class Login extends Component {
  static displayName = Login.name;

  render() {
    return (
      <Main>
        <div className="Title">
          <h3>Login to your account</h3>
        </div>
        <div className="Form">
          <form>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>
            <input type="submit" value="Login"></input>
          </form>
        </div>
        <div className="Help">
          <p>Forgot password</p>
          <Link to="/create" className="Link">
            Create account
          </Link>
        </div>
      </Main>
    );
  }
}
