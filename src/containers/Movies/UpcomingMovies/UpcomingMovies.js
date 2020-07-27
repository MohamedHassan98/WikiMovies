import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class UpcomingMovies extends Component {
  state = {
    upcomingMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          upcomingMovies: response.data.results.map((upcomingMovie) => {
            return {
              key: upcomingMovie.id,
              movieName: upcomingMovie.title,
              movieImage: upcomingMovie.poster_path
                ? `https://image.tmdb.org/t/p/w500` + upcomingMovie.poster_path
                : NoImage,
              movieReleaseDate: upcomingMovie.release_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=${this.state.page}`
        )
        .then((response) => {
          this.setState({
            upcomingMovies: response.data.results.map((upcomingMovie) => {
              return {
                key: upcomingMovie.id,
                movieName: upcomingMovie.title,
                movieImage: upcomingMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500` +
                    upcomingMovie.poster_path
                  : NoImage,
                movieReleaseDate: upcomingMovie.release_date,
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
        <h1>Upcoming Movies</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.upcomingMovies &&
              this.state.upcomingMovies.map((upcomingMovie) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={"/moviedetails/" + upcomingMovie.key}>
                      <Image src={upcomingMovie.movieImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          style={{ color: "black" }}
                          href={"/moviedetails/" + upcomingMovie.key}
                        >
                          {upcomingMovie.movieName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{upcomingMovie.movieReleaseDate}</Card.Meta>
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
export default UpcomingMovies;
