import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class OnTvTvShows extends Component {
  state = {
    onTvTvShows: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          onTvTvShows: response.data.results.map((onTvTvShow) => {
            return {
              key: onTvTvShow.id,
              tvShowName: onTvTvShow.name,
              tvShowImage: onTvTvShow.poster_path
                ? `https://image.tmdb.org/t/p/w500` + onTvTvShow.poster_path
                : NoImage,
              tvShowReleaseDate: onTvTvShow.first_air_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${this.state.page}&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
        )
        .then((response) => {
          this.setState({
            onTvTvShows: response.data.results.map((onTvTvShow) => {
              return {
                key: onTvTvShow.id,
                tvShowName: onTvTvShow.name,
                tvShowImage: onTvTvShow.poster_path
                  ? `https://image.tmdb.org/t/p/w500` + onTvTvShow.poster_path
                  : NoImage,
                tvShowReleaseDate: onTvTvShow.first_air_date,
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
        <h1>Currently Airing Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.onTvTvShows &&
              this.state.onTvTvShows.map((onTvTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={"/tvshowdetails/" + onTvTvShow.key}>
                      <Image src={onTvTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          style={{ color: "black" }}
                          href={"/tvshowdetails/" + onTvTvShow.key}
                        >
                          {onTvTvShow.tvShowName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{onTvTvShow.tvShowReleaseDate}</Card.Meta>
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
export default OnTvTvShows;
