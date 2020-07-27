import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class PopularTvShows extends Component {
  state = {
    popularTvShows: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          popularTvShows: response.data.results.map((popularTvShow) => {
            return {
              key: popularTvShow.id,
              tvShowName: popularTvShow.name,
              tvShowImage: popularTvShow.poster_path
                ? `https://image.tmdb.org/t/p/w500` + popularTvShow.poster_path
                : NoImage,
              tvShowReleaseDate: popularTvShow.first_air_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=${this.state.page}`
        )
        .then((response) => {
          this.setState({
            popularTvShows: response.data.results.map((popularTvShow) => {
              return {
                key: popularTvShow.id,
                tvShowName: popularTvShow.name,
                tvShowImage: popularTvShow.poster_path
                  ? `https://image.tmdb.org/t/p/w500` +
                    popularTvShow.poster_path
                  : NoImage,
                tvShowReleaseDate: popularTvShow.first_air_date,
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
        <h1>Popular Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.popularTvShows &&
              this.state.popularTvShows.map((popularTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={"/tvshowdetails/" + popularTvShow.key}>
                      <Image src={popularTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          style={{ color: "black" }}
                          href={"/tvshowdetails/" + popularTvShow.key}
                        >
                          {popularTvShow.tvShowName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{popularTvShow.tvShowReleaseDate}</Card.Meta>
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
export default PopularTvShows;
