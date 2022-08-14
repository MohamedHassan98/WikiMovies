import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import Page404Gif from "../../assets/404GIF.mp4";
import "./Page404.css";

class Page404 extends Component {
  state = {
    searchName: null,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = this.state.searchName;
    this.props.history.push(`/search/${newSearch}`);
  };
  handleChange = (event) => {
    this.setState({ searchName: event.target.value });
  };
  render() {
    const { searchName } = this.state;
    return (
      <>
        <div className="videoDiv">
          <video
            className="videoStyle"
            id="background-video"
            loop
            autoPlay
            muted
          >
            <source src={Page404Gif} type="video/mp4" />
          </video>
        </div>
        <Container className="ContainerStyle">
          <h1 className="Error404Header">404</h1>
          <h2 className="NothingHereHeader">There's nothing here.</h2>
          <h3 className="ErrorSearchHeader">
            Find what you're looking for with our search
          </h3>
          <Form className="ErrorFormStyle" onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                className="ErrorInputStyle"
                placeholder="Search for a movie, tv show, person..."
                name="searchName"
                onChange={this.handleChange}
              />
              <Button
                className="ErrorInputButton"
                type="submit"
                disabled={!searchName}
              >
                Submit
              </Button>
            </Form.Field>
          </Form>
        </Container>
      </>
    );
  }
}
export default Page404;
