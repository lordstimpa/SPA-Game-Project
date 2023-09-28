import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <>
        <NavMenu />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
