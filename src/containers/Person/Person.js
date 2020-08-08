import React, { Component } from "react";
import { Container, Card, Image, Grid, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../assets/NoImage.png";
import "./Person.css";

class Person extends Component {
  state = {
    persons: [],
    totalPages: null,
    page: 1,
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
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
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
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { persons, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1 className="PersonPopularHeader">Popular People</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {persons.map((person) => (
              <Grid.Column width={4}>
                <Card>
                  <a href={`/person/${person.key}`}>
                    <Image src={person.image} />
                  </a>
                  <Card.Content>
                    <Card.Header>
                      <a className="CardHeader" href={`/person/${person.key}`}>
                        {person.name}
                      </a>
                    </Card.Header>
                    <Card.Meta>
                      {person.knownFors &&
                        person.knownFors.map((knownFor) => (
                          <>
                            <span>
                              {knownFor.movieTitle
                                ? knownFor.movieTitle + "."
                                : knownFor.tvTitles + "."}
                            </span>
                          </>
                        ))}
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
        <div className="PaginationStyle">
          <Pagination
            defaultActivePage={1}
            totalPages={totalPages}
            onPageChange={this.setPageNum}
          />
        </div>
      </Container>
    );
  }
}

export default Person;
