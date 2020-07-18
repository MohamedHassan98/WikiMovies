import React, { Component } from "react";
import { Container, Card, Image, Grid, Pagination } from "semantic-ui-react";
import axios from "axios";
/* 

TASK: FIX CARD HEIGHT

*/
class Person extends Component {
  state = {
    persons: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          persons: response.data.results.map((person) => {
            return {
              key: person.id,
              name: person.name,
              description: person.known_for_department,
              image: `https://image.tmdb.org/t/p/w500` + person.profile_path,
              knownFors: person.known_for.map((knownFor) => {
                return {
                  key: knownFor.id,
                  movieTitle: knownFor.title,
                  tvTitles: knownFor.name,
                };
              }),
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/person/popular?page=${this.state.page}&api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US`
        )
        .then((response) => {
          this.setState({
            persons: response.data.results.map((person) => {
              return {
                key: person.id,
                name: person.name,
                description: person.known_for_department,
                image: `https://image.tmdb.org/t/p/w500` + person.profile_path,
                knownFors: person.known_for.map((knownFor) => {
                  return {
                    key: knownFor.id,
                    movieTitle: knownFor.title,
                    tvTitles: knownFor.name,
                  };
                }),
              };
            }),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <Container style={{ marginTop: "80px" }}>
        <h1 style={{ fontWeight: "700", marginBottom: "30px" }}>
          Popular People
        </h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.persons.map((person) => (
              <Grid.Column width={4}>
                <Card>
                  <a href={"/person/" + person.key}>
                    <Image src={person.image} />
                  </a>
                  <Card.Content>
                    <Card.Header>
                      <a
                        style={{ color: "black" }}
                        href={"/person/" + person.key}
                      >
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
        <div style={{ textAlign: "center" }}>
          <Pagination
            defaultActivePage={1}
            totalPages={this.state.totalPages}
            onPageChange={this.setPageNum}
          />
        </div>
      </Container>
    );
  }
}

export default Person;
