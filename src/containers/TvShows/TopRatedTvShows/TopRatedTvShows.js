import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";

class TopRatedTvShows extends Component {
  state = {
    topRatedTvShows: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          topRatedTvShows: response.data.results.map((topRatedTvShow) => {
            return {
              key: topRatedTvShow.id,
              tvShowName: topRatedTvShow.name,
              tvShowImage:
                `https://image.tmdb.org/t/p/w500` + topRatedTvShow.poster_path,
              tvShowReleaseDate: topRatedTvShow.first_air_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=${this.state.page}`
        )
        .then((response) => {
          this.setState({
            topRatedTvShows: response.data.results.map((topRatedTvShow) => {
              return {
                key: topRatedTvShow.id,
                tvShowName: topRatedTvShow.name,
                tvShowImage:
                  `https://image.tmdb.org/t/p/w500` +
                  topRatedTvShow.poster_path,
                tvShowReleaseDate: topRatedTvShow.first_air_date,
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
        <h1>Top Rated Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.topRatedTvShows &&
              this.state.topRatedTvShows.map((topRatedTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <Image src={topRatedTvShow.tvShowImage} />
                    <Card.Content>
                      <Card.Header>{topRatedTvShow.tvShowName}</Card.Header>
                      <Card.Meta>{topRatedTvShow.tvShowReleaseDate}</Card.Meta>
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
export default TopRatedTvShows;
