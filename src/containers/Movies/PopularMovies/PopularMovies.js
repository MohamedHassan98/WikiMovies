import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class PopularMovies extends Component {
  state = {
    popularMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          popularMovies: response.data.results.map((popularMovie) => {
            return {
              key: popularMovie.id,
              movieName: popularMovie.title,
              movieImage: popularMovie.poster_path
                ? `https://image.tmdb.org/t/p/w500` + popularMovie.poster_path
                : NoImage,
              movieReleaseDate: popularMovie.release_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
        )
        .then((response) => {
          this.setState({
            popularMovies: response.data.results.map((popularMovie) => {
              return {
                key: popularMovie.id,
                movieName: popularMovie.title,
                movieImage: popularMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500` + popularMovie.poster_path
                  : NoImage,
                movieReleaseDate: popularMovie.release_date,
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
        <h1>Popular Movies</h1>

        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.popularMovies &&
              this.state.popularMovies.map((popularMovie) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={"/moviedetails/" + popularMovie.key}>
                      <Image src={popularMovie.movieImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          style={{ color: "black" }}
                          href={"/moviedetails/" + popularMovie.key}
                        >
                          {popularMovie.movieName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{popularMovie.movieReleaseDate}</Card.Meta>
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
export default PopularMovies;
