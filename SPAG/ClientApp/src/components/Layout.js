import React, { Component } from "react";
import { Footer } from "./Footer";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
