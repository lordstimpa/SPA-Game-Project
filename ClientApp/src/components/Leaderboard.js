import React, { Component } from "react";
import Styled from "styled-components";
import API from "./API";

const Main = Styled.div`
  width: 25%;
  min-height: 60svh;
  background: #f2f2f2;

  & h3 {
    margin-left: 2rem;
    margin-top: 2rem;
  }

  & .Board {
    margin: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid #000;

    & p {
        padding: 0.2rem 0.5rem;
    }
  }
`;
/*
export class Leaderboard extends Component {
  static displayName = Leaderboard.name;

  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      isError: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    GetData("https://localhost:44457/score/gettoptenoverall")
      .then((data) => {
        this.setState({
          scores: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <Main>
        <h3>Leaderboard</h3>
        <div className="Board">
          {isLoading && (
            <div>
              <h2>Loading...</h2>
            </div>
          )}
          {isError && (
            <div>
              <h2>Error: Unable to fetch data.</h2>
            </div>
          )}
          {scores.map((score) => (
            <p>{score}</p>
          ))}
        </div>
      </Main>
    );
  }
}
*/
