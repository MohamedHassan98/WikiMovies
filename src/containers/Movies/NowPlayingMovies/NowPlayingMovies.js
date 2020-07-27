import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class NowPlaying extends Component {
  state = {
    nowPlayingMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          nowPlayingMovies: response.data.results.map((nowPlayingMovie) => {
            return {
              key: nowPlayingMovie.id,
              movieName: nowPlayingMovie.title,
              movieImage: nowPlayingMovie.poster_path
                ? `https://image.tmdb.org/t/p/w500` +
                  nowPlayingMovie.poster_path
                : NoImage,
              movieReleaseDate: nowPlayingMovie.release_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.state.page}&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
        )
        .then((response) => {
          this.setState({
            nowPlayingMovies: response.data.results.map((nowPlayingMovie) => {
              return {
                key: nowPlayingMovie.id,
                movieName: nowPlayingMovie.title,
                movieImage: nowPlayingMovie
                  ? `https://image.tmdb.org/t/p/w500` +
                    nowPlayingMovie.poster_path
                  : NoImage,
                movieReleaseDate: nowPlayingMovie.release_date,
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
        <h1>Now Playing Movies</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.nowPlayingMovies &&
              this.state.nowPlayingMovies.map((nowPlayingMovie) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={"/moviedetails/" + nowPlayingMovie.key}>
                      <Image src={nowPlayingMovie.movieImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          style={{ color: "black" }}
                          href={"/moviedetails/" + nowPlayingMovie.key}
                        >
                          {nowPlayingMovie.movieName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{nowPlayingMovie.movieReleaseDate}</Card.Meta>
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
export default NowPlaying;
