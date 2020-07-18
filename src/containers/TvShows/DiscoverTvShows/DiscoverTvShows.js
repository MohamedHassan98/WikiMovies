import React, { Component } from "react";
import "./DiscoverTvShows.css";
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

/*

TASK: FIX CARD HEIGHT FOR ALL TV SHOWS
TASK: ADD TV SHOW DETAILS PAGE

*/
class DiscoverTvShows extends Component {
  state = {
    discoverTvShows: [],
    sortByValue: "popularity.desc",
    totalPages: null,
    page: 1,
  };
  constructor(props) {
    super(props);

    this.sortByHandleSubmit = this.sortByHandleSubmit.bind(this);
  }
  sortByOnChange = (e, data) => {
    this.setState({ sortByValue: data.value });
  };

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${this.state.page}&sort_by=${this.state.sortByValue}&api_key=aa8a6567cb9ae791c14c0b267ac92c94&include_null_first_air_dates=false`
        )
        .then((response) => {
          this.setState({
            discoverTvShows: response.data.results.map((discoverTvShow) => {
              return {
                key: discoverTvShow.id,
                tvShowName: discoverTvShow.name,
                tvShowImage:
                  `https://image.tmdb.org/t/p/w500` +
                  discoverTvShow.poster_path,
                tvShowReleaseDate: discoverTvShow.first_air_date,
              };
            }),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&sort_by=popularity.desc&api_key=aa8a6567cb9ae791c14c0b267ac92c94&include_null_first_air_dates=false`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          discoverTvShows: response.data.results.map((discoverTvShow) => {
            return {
              key: discoverTvShow.id,
              tvShowName: discoverTvShow.name,
              tvShowImage:
                `https://image.tmdb.org/t/p/w500` + discoverTvShow.poster_path,
              tvShowReleaseDate: discoverTvShow.first_air_date,
            };
          }),
        });
      });
  }

  sortByHandleSubmit(event) {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&sort_by=${this.state.sortByValue}&api_key=aa8a6567cb9ae791c14c0b267ac92c94&include_null_first_air_dates=false`
      )
      .then((response) => {
        this.setState({
          page: 1,
          discoverTvShows: response.data.results.map((discoverTvShow) => {
            return {
              key: discoverTvShow.id,
              tvShowName: discoverTvShow.name,
              tvShowImage:
                `https://image.tmdb.org/t/p/w500` + discoverTvShow.poster_path,
              tvShowReleaseDate: discoverTvShow.first_air_date,
            };
          }),
        });
      });
    event.preventDefault();
  }

  render() {
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

    return (
      <Container style={{ marginTop: "80px" }}>
        <h1>Discover Tv Shows</h1>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={3}>
              <div
                style={{
                  borderRadius: "20px",
                  border: "2px solid black",
                }}
              >
                <h2
                  style={{
                    padding: "14px 16px",
                    marginBottom: "0px",
                  }}
                >
                  Sort
                </h2>
                <div
                  style={{
                    borderTop: "1px solid black",
                    padding: "16px",
                  }}
                >
                  <h4>Sort Results By</h4>
                  <Form onSubmit={this.sortByHandleSubmit}>
                    <Dropdown
                      placeholder="Please select"
                      defaultValue={this.state.sortByValue}
                      fluid
                      selection
                      options={sortByOptions}
                      onChange={this.sortByOnChange}
                    />
                    <Button
                      className="DiscoverTvShowsSubmitButton"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid container divided="vertically">
                <Grid.Row>
                  {this.state.discoverTvShows &&
                    this.state.discoverTvShows.map((discoverTvShow) => (
                      <Grid.Column width={4}>
                        <Card>
                          <Image src={discoverTvShow.tvShowImage} />
                          <Card.Content>
                            <Card.Header>
                              {discoverTvShow.tvShowName}
                            </Card.Header>
                            <Card.Meta>
                              {discoverTvShow.tvShowReleaseDate}
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    ))}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Pagination
            defaultActivePage={1}
            activePage={this.state.page}
            totalPages={this.state.totalPages}
            onPageChange={this.setPageNum}
          />
        </div>
      </Container>
    );
  }
}
export default DiscoverTvShows;
