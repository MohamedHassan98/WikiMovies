import React, { Component } from "react";
import { Container, Pagination, Loader } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../components/Gridder/Gridder";
import NoImage from "../../assets/NoImage.png";

class Person extends Component {
  state = {
    persons: [],
    totalPages: 1,
    page: 1,
    loadingState: true,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/person/popular?page=1&api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          persons: response.data.results.map((person) => ({
            key: person.id,
            name: person.name,
            description: person.known_for_department,
            image: person.profile_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${person.profile_path}`
              : NoImage,
            knownFors: person.known_for.map((knownFor) => ({
              key: knownFor.id,
              movieTitle: knownFor.title,
              tvTitles: knownFor.name,
            })),
          })),
          loadingState: false,
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage, loadingState: true }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/person/popular?page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((response) => {
          this.setState({
            persons: response.data.results.map((person) => ({
              key: person.id,
              name: person.name,
              description: person.known_for_department,
              image: person.profile_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${person.profile_path}`
                : NoImage,
              knownFors: person.known_for.map((knownFor) => ({
                key: knownFor.id,
                movieTitle: knownFor.title,
                tvTitles: knownFor.name,
              })),
            })),
            loadingState: false,
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { persons, totalPages, loadingState } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Popular People</h1>
        {loadingState ? (
          <Loader active inline="centered" />
        ) : (
          <>
            <Gridder mainDatas={persons} hrefMainUrl={`/person/`} />
            <div className="PaginationStyle">
              <Pagination
                defaultActivePage={1}
                totalPages={totalPages}
                onPageChange={this.setPageNum}
              />
            </div>
          </>
        )}
      </Container>
    );
  }
}

export default Person;
