import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import styled from "styled-components";

const StyledPage = styled.div`
  background: white;
  color: black;
`;

export default class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <Header />
        {this.props.children}
      </StyledPage>
    );
  }
}
