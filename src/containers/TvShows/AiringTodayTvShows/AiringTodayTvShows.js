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
        `${process.env.REACT_APP_BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          airingTodayTvShows: response.data.results.map(
            (airingTodayTvShow) => ({
              key: airingTodayTvShow.id,
              tvShowName: airingTodayTvShow.name,
              tvShowImage: airingTodayTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${airingTodayTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: airingTodayTvShow.first_air_date,
            })
          ),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${activePage}`
        )
        .then((response) => {
          this.setState({
            airingTodayTvShows: response.data.results.map(
              (airingTodayTvShow) => ({
                key: airingTodayTvShow.id,
                tvShowName: airingTodayTvShow.name,
                tvShowImage: airingTodayTvShow.poster_path
                  ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${airingTodayTvShow.poster_path}`
                  : NoImage,
                tvShowReleaseDate: airingTodayTvShow.first_air_date,
              })
            ),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { airingTodayTvShows, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Airing Today Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {airingTodayTvShows &&
              airingTodayTvShows.map((airingTodayTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={`/tvshowdetails/${airingTodayTvShow.key}`}>
                      <Image src={airingTodayTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          className="CardHeader"
                          href={`/tvshowdetails/${airingTodayTvShow.key}`}
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
        <div className="PaginationStyle">
          <Pagination
            defaultActivePage={1}
            totalPages={totalPages}
            onPageChange={this.setPageNum}
          />
        </div>
      </Container>
    );
  }
}
export default AiringTodayTvShows;
