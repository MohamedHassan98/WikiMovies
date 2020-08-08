import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class TopRatedTvShows extends Component {
  state = {
    topRatedTvShows: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          topRatedTvShows: response.data.results.map((topRatedTvShow) => ({
            key: topRatedTvShow.id,
            tvShowName: topRatedTvShow.name,
            tvShowImage: topRatedTvShow.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${topRatedTvShow.poster_path}`
              : NoImage,
            tvShowReleaseDate: topRatedTvShow.first_air_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${activePage}`
        )
        .then((response) => {
          this.setState({
            topRatedTvShows: response.data.results.map((topRatedTvShow) => ({
              key: topRatedTvShow.id,
              tvShowName: topRatedTvShow.name,
              tvShowImage: topRatedTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${topRatedTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: topRatedTvShow.first_air_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { topRatedTvShows, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Top Rated Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {topRatedTvShows &&
              topRatedTvShows.map((topRatedTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={`/tvshowdetails/${topRatedTvShow.key}`}>
                      <Image src={topRatedTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          className="CardHeader"
                          href={`/tvshowdetails/${topRatedTvShow.key}`}
                        >
                          {topRatedTvShow.tvShowName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{topRatedTvShow.tvShowReleaseDate}</Card.Meta>
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
export default TopRatedTvShows;
