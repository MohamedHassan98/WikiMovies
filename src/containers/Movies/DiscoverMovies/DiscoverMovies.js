import React, { Component } from "react";
import "./DiscoverMovies.css";
import {
  Container,
  Grid,
  Image,
  Form,
  Card,
  Dropdown,
  Button,
  Pagination,
} from "semantic-ui-react";
import axios from "axios";
/*

TASK: FIX CARD HEIGHT FOR ALL MOVIES

*/
class DiscoverMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoverMovies: [],
      sortByValue: "popularity.desc",
      totalPages: null,
      page: 1,
    };
    this.sortByHandleSubmit = this.sortByHandleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94&include_adult=false`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          discoverMovies: response.data.results.map((discoverMovie) => {
            return {
              key: discoverMovie.id,
              movieName: discoverMovie.title,
              movieImage:
                `https://image.tmdb.org/t/p/w500` + discoverMovie.poster_path,
              movieReleaseDate: discoverMovie.release_date,
            };
          }),
        });
      });
  }

  sortByOnChange = (e, data) => {
    this.setState({ sortByValue: data.value });
  };

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${this.state.sortByValue}&page=${this.state.page}&api_key=aa8a6567cb9ae791c14c0b267ac92c94&include_adult=false`
        )
        .then((response) => {
          this.setState({
            discoverMovies: response.data.results.map((discoverMovie) => {
              return {
                key: discoverMovie.id,
                movieName: discoverMovie.title,
                movieImage:
                  `https://image.tmdb.org/t/p/w500` + discoverMovie.poster_path,
                movieReleaseDate: discoverMovie.release_date,
              };
            }),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  sortByHandleSubmit(event) {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${this.state.sortByValue}&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94&include_adult=false`
      )
      .then((response) => {
        this.setState({
          page: 1,
          discoverMovies: response.data.results.map((discoverMovie) => {
            return {
              key: discoverMovie.id,
              movieName: discoverMovie.title,
              movieImage:
                `https://image.tmdb.org/t/p/w500` + discoverMovie.poster_path,
              movieReleaseDate: discoverMovie.release_date,
            };
          }),
        });
      });
    event.preventDefault();
  }

  render() {
    const sortByOptions = [
      {
        key: "1",
        text: "Popularity Descending",
        value: "popularity.desc",
      },
      {
        key: "2",
        text: "Popularity Ascending",
        value: "popularity.asc",
      },
      {
        key: "3",
        text: "Rating Descending",
        value: "vote_average.desc",
      },
      {
        key: "4",
        text: "Rating Ascending",
        value: "vote_average.asc",
      },
      {
        key: "5",
        text: "Release Date Descending",
        value: "primary_release_date.desc",
      },
      {
        key: "6",
        text: "Release Date Ascending",
        value: "primary_release_date.asc",
      },
    ];

    return (
      <Container style={{ marginTop: "80px" }}>
        <h1>Discover Movies</h1>
        <Grid divided>
          <Grid.Column width={3}>
            <div
              style={{
                borderRadius: "20px",
                border: "2px solid black",
              }}
            >
              <h2
                style={{
                  padding: "14px 16px",
                  marginBottom: "0px",
                }}
              >
                Sort
              </h2>
              <div
                style={{
                  borderTop: "1px solid black",
                  padding: "16px",
                }}
              >
                <h4>Sort Results By</h4>
                <Form onSubmit={this.sortByHandleSubmit}>
                  <Dropdown
                    placeholder="Please select"
                    defaultValue={this.state.sortByValue}
                    fluid
                    selection
                    options={sortByOptions}
                    onChange={this.sortByOnChange}
                  />
                  <Button className="DiscoverMoviesSubmitButton" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid container divided="vertically">
              <Grid.Row>
                {this.state.discoverMovies &&
                  this.state.discoverMovies.map((discoverMovie) => (
                    <Grid.Column width={4}>
                      <Card>
                        <Image src={discoverMovie.movieImage} />
                        <Card.Content>
                          <Card.Header>{discoverMovie.movieName}</Card.Header>
                          <Card.Meta>
                            {discoverMovie.movieReleaseDate}
                          </Card.Meta>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Pagination
            defaultActivePage={1}
            activePage={this.state.page}
            totalPages={this.state.totalPages}
            onPageChange={this.setPageNum}
          />
        </div>
      </Container>
    );
  }
}
export default DiscoverMovies;
