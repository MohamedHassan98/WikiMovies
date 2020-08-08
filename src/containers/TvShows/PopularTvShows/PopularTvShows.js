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
        `${process.env.REACT_APP_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          popularTvShows: response.data.results.map((popularTvShow) => ({
            key: popularTvShow.id,
            tvShowName: popularTvShow.name,
            tvShowImage: popularTvShow.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${popularTvShow.poster_path}`
              : NoImage,
            tvShowReleaseDate: popularTvShow.first_air_date,
          })),
        });
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${activePage}`
        )
        .then((response) => {
          this.setState({
            popularTvShows: response.data.results.map((popularTvShow) => ({
              key: popularTvShow.id,
              tvShowName: popularTvShow.name,
              tvShowImage: popularTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${popularTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: popularTvShow.first_air_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { popularTvShows, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Popular Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {popularTvShows &&
              popularTvShows.map((popularTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={`/tvshowdetails/${popularTvShow.key}`}>
                      <Image src={popularTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          className="CardHeader"
                          href={`/tvshowdetails/${popularTvShow.key}`}
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
export default PopularTvShows;
