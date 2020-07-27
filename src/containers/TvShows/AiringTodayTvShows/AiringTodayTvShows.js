import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class AiringTodayTvShows extends Component {
  state = {
    airingTodayTvShows: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          airingTodayTvShows: response.data.results.map((airingTodayTvShow) => {
            return {
              key: airingTodayTvShow.id,
              tvShowName: airingTodayTvShow.name,
              tvShowImage: airingTodayTvShow.poster_path
                ? `https://image.tmdb.org/t/p/w500` +
                  airingTodayTvShow.poster_path
                : NoImage,
              tvShowReleaseDate: airingTodayTvShow.first_air_date,
            };
          }),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/tv/airing_today?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=${this.state.page}`
        )
        .then((response) => {
          this.setState({
            airingTodayTvShows: response.data.results.map(
              (airingTodayTvShow) => {
                return {
                  key: airingTodayTvShow.id,
                  tvShowName: airingTodayTvShow.name,
                  tvShowImage: airingTodayTvShow.poster_path
                    ? `https://image.tmdb.org/t/p/w500` +
                      airingTodayTvShow.poster_path
                    : NoImage,
                  tvShowReleaseDate: airingTodayTvShow.first_air_date,
                };
              }
            ),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <Container style={{ marginTop: "80px" }}>
        <h1>Airing Today Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {this.state.airingTodayTvShows &&
              this.state.airingTodayTvShows.map((airingTodayTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={"/tvshowdetails/" + airingTodayTvShow.key}>
                      <Image src={airingTodayTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          style={{ color: "black" }}
                          href={"/tvshowdetails/" + airingTodayTvShow.key}
                        >
                          {airingTodayTvShow.tvShowName}
                        </a>
                      </Card.Header>
                      <Card.Meta>
                        {airingTodayTvShow.tvShowReleaseDate}
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
export default AiringTodayTvShows;
