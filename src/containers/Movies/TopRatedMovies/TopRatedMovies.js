import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";

class TopRatedMovies extends Component {
  state = {
    topRatedMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          topRatedMovies: response.data.results.map((topRatedMovie) => {
            return {
              key: topRatedMovie.id,
              movieName: topRatedMovie.title,
              movieImage:
                `https://image.tmdb.org/t/p/w500` + topRatedMovie.poster_path,
              movieReleaseDate: topRatedMovie.release_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=${this.state.page}`
        )
        .then((response) => {
          this.setState({
            topRatedMovies: response.data.results.map((topRatedMovie) => {
              return {
                key: topRatedMovie.id,
                movieName: topRatedMovie.title,
                movieImage:
                  `https://image.tmdb.org/t/p/w500` + topRatedMovie.poster_path,
                movieReleaseDate: topRatedMovie.release_date,
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
        <h1>Top Rated Movies</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.topRatedMovies &&
              this.state.topRatedMovies.map((topRatedMovie) => (
                <Grid.Column width={4}>
                  <Card>
                    <Image src={topRatedMovie.movieImage} />
                    <Card.Content>
                      <Card.Header>{topRatedMovie.movieName}</Card.Header>
                      <Card.Meta>{topRatedMovie.movieReleaseDate}</Card.Meta>
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
export default TopRatedMovies;
