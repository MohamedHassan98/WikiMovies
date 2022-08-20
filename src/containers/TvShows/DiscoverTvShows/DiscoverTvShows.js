import React, { Component } from "react";
import {
  Container,
  Grid,
  Form,
  Dropdown,
  Button,
  Pagination,
  Loader,
} from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";
import "./DiscoverTvShows.css";

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

class DiscoverTvShows extends Component {
  state = {
    discoverTvShows: [],
    sortByValue: "popularity.desc",
    totalPages: 1,
    page: 1,
    divided: true,
    loadingState: true,
  };
  constructor(props) {
    super(props);

    this.sortByHandleSubmit = this.sortByHandleSubmit.bind(this);
  }
  sortByOnChange = (_, data) => {
    this.setState({ sortByValue: data.value });
  };

  setPageNum = (_, { activePage }) => {
    const { sortByValue } = this.state;
    this.setState({ page: activePage, loadingState: true }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/discover/tv?language=en-US&page=${activePage}&sort_by=${sortByValue}&api_key=${process.env.REACT_APP_API_KEY}&include_null_first_air_dates=false`
        )
        .then((response) => {
          this.setState({
            discoverTvShows: response.data.results.map((discoverTvShow) => ({
              key: discoverTvShow.id,
              tvShowName: discoverTvShow.name,
              tvShowImage: discoverTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${discoverTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: discoverTvShow.first_air_date,
            })),
            loadingState: false,
          });
        })
    );
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    if (window.innerWidth < 991) {
      this.setState({ divided: false });
    }
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/discover/tv?language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&include_null_first_air_dates=false`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          discoverTvShows: response.data.results.map((discoverTvShow) => ({
            key: discoverTvShow.id,
            tvShowName: discoverTvShow.name,
            tvShowImage: discoverTvShow.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${discoverTvShow.poster_path}`
              : NoImage,
            tvShowReleaseDate: discoverTvShow.first_air_date,
          })),
          loadingState: false,
        });
      });
  }

  sortByHandleSubmit(event) {
    const { sortByValue } = this.state;
    this.setState({ loadingState: true }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/discover/tv?language=en-US&page=1&sort_by=${sortByValue}&api_key=${process.env.REACT_APP_API_KEY}&include_null_first_air_dates=false`
        )
        .then((response) => {
          this.setState({
            page: 1,
            discoverTvShows: response.data.results.map((discoverTvShow) => ({
              key: discoverTvShow.id,
              tvShowName: discoverTvShow.name,
              tvShowImage: discoverTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${discoverTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: discoverTvShow.first_air_date,
            })),
            loadingState: false,
          });
        })
    );
    event.preventDefault();
  }

  render() {
    const {
      sortByValue,
      discoverTvShows,
      page,
      totalPages,
      divided,
      loadingState,
    } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1 className="DiscoverTvShowsHeader">Discover Tv Shows</h1>
        <Grid divided={divided}>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <div className="DiscoverTvShowsSortByDiv">
              <h2 className="DiscoverTvShowsSortByHeader">Sort</h2>
              <div className="DiscoverTvShowsSortDropdownDiv">
                <h3>Sort Results By</h3>
                <Form onSubmit={this.sortByHandleSubmit}>
                  <Dropdown
                    aria-label="Sorting Dropdown"
                    placeholder="Please select"
                    defaultValue={sortByValue}
                    fluid
                    selection
                    options={sortByOptions}
                    onChange={this.sortByOnChange}
                  />
                  <Button className="DiscoverTvShowsSubmitButton" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Grid.Column>
          {loadingState ? (
            <Loader active inline="centered" />
          ) : (
            <Grid.Column mobile={16} tablet={16} computer={12}>
              <Gridder
                mainDatas={discoverTvShows}
                hrefMainUrl={`/tvshowdetails/`}
              />
              <div className="PaginationStyle">
                <Pagination
                  activePage={page}
                  totalPages={totalPages}
                  onPageChange={this.setPageNum}
                />
              </div>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    );
  }
}
export default DiscoverTvShows;
