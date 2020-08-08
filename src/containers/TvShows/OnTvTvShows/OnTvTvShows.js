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
        `${process.env.REACT_APP_BASE_URL}/tv/on_the_air?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          onTvTvShows: response.data.results.map((onTvTvShow) => ({
            key: onTvTvShow.id,
            tvShowName: onTvTvShow.name,
            tvShowImage: onTvTvShow.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${onTvTvShow.poster_path}`
              : NoImage,
            tvShowReleaseDate: onTvTvShow.first_air_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/on_the_air?language=en-US&page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          this.setState({
            onTvTvShows: response.data.results.map((onTvTvShow) => ({
              key: onTvTvShow.id,
              tvShowName: onTvTvShow.name,
              tvShowImage: onTvTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${onTvTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: onTvTvShow.first_air_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { onTvTvShows, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Currently Airing Tv Shows</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {onTvTvShows &&
              onTvTvShows.map((onTvTvShow) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={`/tvshowdetails/${onTvTvShow.key}`}>
                      <Image src={onTvTvShow.tvShowImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          className="CardHeader"
                          href={`/tvshowdetails/${onTvTvShow.key}`}
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
export default OnTvTvShows;
