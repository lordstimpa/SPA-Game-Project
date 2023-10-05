import React, { Component } from "react";
import Styled from "styled-components";
import { Leaderboard } from "./Leaderboard";

const Main = Styled.div`
  min-height: 1056px;
  display: flex;
  flex-direction: row;
  background: #f2f2f2;
`;

const General = Styled.div`
  width: 75%;

  & .Title {
    margin-top: 2rem;
    
    & h2 {
      text-align: center;
    }
  }

  & .Text {
    min-height: 250px;
    margin: 2rem;
    padding: 1rem;
    border: 2px solid #000;
    border-radius: 1rem;
  }
`;

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Main>
                <General>
                    <div className="Title">
                        <h2>Welcome to SPAG!</h2>
                    </div>
                    <div className="Text">
                        <p>lsdokfdghjfg</p>
                    </div>
                </General>
                <Leaderboard />
            </Main>
        );
    }
}
