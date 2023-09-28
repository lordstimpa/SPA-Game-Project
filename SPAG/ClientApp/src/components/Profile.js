import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
  height: 1056px;
  display: flex;
  flex-direction: row;
  background: #f2f2f2;
`;

export class Profile extends Component {
  static displayName = Profile.name;

  render() {
    return (
      <Main>
        <div>
          <h3>Profile</h3>
        </div>
      </Main>
    );
  }
}
