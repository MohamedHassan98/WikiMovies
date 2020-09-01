import React, { Component } from "react";
import {
  Container,
  Grid,
  Form,
  Dropdown,
  Button,
  Pagination,
} from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
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
      totalPages: 1,
      page: 1,
      divided: true,
    };
    this.sortByHandleSubmit = this.sortByHandleSubmit.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth < 991) {
      this.setState({ divided: false });
    }
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
        <h1 className="DiscoverMoviesHeader">Discover Movies</h1>
        <Grid divided={this.state.divided}>
          <Grid.Column mobile={16} tablet={16} computer={4}>
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
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <Gridder
              mainDatas={discoverMovies}
              hrefMainUrl={`/moviedetails/`}
            />
            <div className="PaginationStyle">
              <Pagination
                activePage={page}
                totalPages={totalPages}
                onPageChange={this.setPageNum}
              />
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
export default DiscoverMovies;
