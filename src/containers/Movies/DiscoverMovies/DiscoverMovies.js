import React, { Component } from "react";
import {
  Container,
  Grid,
  Image,
  Form,
  Card,
  Dropdown,
  Button,
  Pagination,
} from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";
import "./DiscoverMovies.css";

const sortByOptions = [
  {
    key: "1",
    text: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    key: "2",
    text: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    key: "3",
    text: "Rating Descending",
    value: "vote_average.desc",
  },
  {
    key: "4",
    text: "Rating Ascending",
    value: "vote_average.asc",
  },
  {
    key: "5",
    text: "Release Date Descending",
    value: "primary_release_date.desc",
  },
  {
    key: "6",
    text: "Release Date Ascending",
    value: "primary_release_date.asc",
  },
];

class DiscoverMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoverMovies: [],
      sortByValue: "popularity.desc",
      totalPages: null,
      page: 1,
    };
    this.sortByHandleSubmit = this.sortByHandleSubmit.bind(this);
  }

  componentDidMount() {
    const { page } = this.state;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          discoverMovies: response.data.results.map((discoverMovie) => ({
            key: discoverMovie.id,
            movieName: discoverMovie.title,
            movieImage: discoverMovie.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${discoverMovie.poster_path}`
              : NoImage,
            movieReleaseDate: discoverMovie.release_date,
          })),
        });
      });
  }

  sortByOnChange = (_, data) => {
    this.setState({ sortByValue: data.value });
  };

  setPageNum = (_, { activePage }) => {
    const { sortByValue } = this.state;
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/discover/movie?language=en-US&sort_by=${sortByValue}&page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
        )
        .then((response) => {
          this.setState({
            discoverMovies: response.data.results.map((discoverMovie) => ({
              key: discoverMovie.id,
              movieName: discoverMovie.title,
              movieImage: discoverMovie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${discoverMovie.poster_path}`
                : NoImage,
              movieReleaseDate: discoverMovie.release_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  sortByHandleSubmit(event) {
    const { sortByValue } = this.state;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/discover/movie?language=en-US&sort_by=${sortByValue}&page=1&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
      )
      .then((response) => {
        this.setState({
          page: 1,
          discoverMovies: response.data.results.map((discoverMovie) => ({
            key: discoverMovie.id,
            movieName: discoverMovie.title,
            movieImage: discoverMovie.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${discoverMovie.poster_path}`
              : NoImage,
            movieReleaseDate: discoverMovie.release_date,
          })),
        });
      });
    event.preventDefault();
  }

  render() {
    const { sortByValue, discoverMovies, page, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Discover Movies</h1>
        <Grid divided>
          <Grid.Column width={3}>
            <div className="DiscoverMoviesSortByDiv">
              <h2 className="DiscoverMoviesSortByHeader">Sort</h2>
              <div className="DiscoverMoviesSortDropdownDiv">
                <h4>Sort Results By</h4>
                <Form onSubmit={this.sortByHandleSubmit}>
                  <Dropdown
                    placeholder="Please select"
                    defaultValue={sortByValue}
                    fluid
                    selection
                    options={sortByOptions}
                    onChange={this.sortByOnChange}
                  />
                  <Button className="DiscoverMoviesSubmitButton" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid container divided="vertically">
              <Grid.Row>
                {discoverMovies &&
                  discoverMovies.map((discoverMovie) => (
                    <Grid.Column width={4}>
                      <Card>
                        <a href={`/moviedetails/${discoverMovie.key}`}>
                          <Image src={discoverMovie.movieImage} />
                        </a>
                        <Card.Content>
                          <Card.Header>
                            <a
                              className="CardHeader"
                              href={`/moviedetails/${discoverMovie.key}`}
                            >
                              {discoverMovie.movieName}
                            </a>
                          </Card.Header>
                          <Card.Meta>
                            {discoverMovie.movieReleaseDate}
                          </Card.Meta>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
        <div className="PaginationStyle">
          <Pagination
            defaultActivePage={1}
            activePage={page}
            totalPages={totalPages}
            onPageChange={this.setPageNum}
          />
        </div>
      </Container>
    );
  }
}
export default DiscoverMovies;
