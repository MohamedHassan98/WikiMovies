import React, { Component } from "react";
import { Container, Grid, Image, Card, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";

class TopRatedMovies extends Component {
  state = {
    topRatedMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          topRatedMovies: response.data.results.map((topRatedMovie) => ({
            key: topRatedMovie.id,
            movieName: topRatedMovie.title,
            movieImage: topRatedMovie.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${topRatedMovie.poster_path}`
              : NoImage,
            movieReleaseDate: topRatedMovie.release_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${activePage}`
        )
        .then((response) => {
          this.setState({
            topRatedMovies: response.data.results.map((topRatedMovie) => ({
              key: topRatedMovie.id,
              movieName: topRatedMovie.title,
              movieImage: topRatedMovie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${topRatedMovie.poster_path}`
                : NoImage,
              movieReleaseDate: topRatedMovie.release_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { topRatedMovies, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Top Rated Movies</h1>
        <Grid container divided="vertically">
          <Grid.Row>
            {topRatedMovies &&
              topRatedMovies.map((topRatedMovie) => (
                <Grid.Column width={4}>
                  <Card>
                    <a href={`/moviedetails/${topRatedMovie.key}`}>
                      <Image src={topRatedMovie.movieImage} />
                    </a>
                    <Card.Content>
                      <Card.Header>
                        <a
                          className="CardHeader"
                          href={`/moviedetails/${topRatedMovie.key}`}
                        >
                          {topRatedMovie.movieName}
                        </a>
                      </Card.Header>
                      <Card.Meta>{topRatedMovie.movieReleaseDate}</Card.Meta>
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
export default TopRatedMovies;
