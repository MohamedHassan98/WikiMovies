import React, { Component } from "react";
import {
  Image,
  Container,
  Item,
  Grid,
  Pagination,
  Form,
  Button,
  Dropdown,
} from "semantic-ui-react";
import axios from "axios";
import WordLimit from "react-word-limit";
import NoImage from "../../assets/NoImage.png";
import "./SearchResults.css";

const sortByOptions = [
  {
    key: "1",
    text: "Movie",
    value: "movie",
  },
  {
    key: "2",
    text: "Tv Show",
    value: "tv",
  },
  {
    key: "3",
    text: "People",
    value: "person",
  },
];

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      paginationNumber: 1,
      nothingFound: false,
      sortByValue: "movie",
      totalPages: null,
      page: 1,
      searchHref: null,
    };
    this.sortByHandleSubmit = this.sortByHandleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&page=1&query=${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.total_results === 0) {
          this.setState({ nothingFound: true });
        } else {
          this.setState({
            totalPages: response.data.total_pages,
            searchHref: `/moviedetails/`,
            searchResults: response.data.results.map((searchResult) => ({
              key: searchResult.id,
              name: searchResult.title,
              description: searchResult.overview,
              releaseDate: searchResult.release_date,
              image: searchResult.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${searchResult.poster_path}`
                : NoImage,
            })),
          });
        }
      });
  }

  componentWillReceiveProps(newProps) {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&page=1&query=${newProps.match.params.id}`
      )
      .then((response) => {
        if (response.data.total_results === 0) {
          this.setState({ nothingFound: true });
        } else {
          this.setState({
            sortByValue: "movie",
            page: 1,
            nothingFound: false,
            totalPages: response.data.total_pages,
            searchHref: `/moviedetails/`,
            searchResults: response.data.results.map((searchResult) => ({
              key: searchResult.id,
              name: searchResult.title,
              description: searchResult.overview,
              releaseDate: searchResult.release_date,
              image: searchResult.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${searchResult.poster_path}`
                : NoImage,
            })),
          });
        }
      });
  }

  setPageNum = (_, { activePage }) => {
    const { sortByValue } = this.state;
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/search/${sortByValue}?api_key=${process.env.REACT_APP_API_KEY}&page=${activePage}&query=${this.props.match.params.id}`
        )
        .then((response) => {
          this.setState({
            totalPages: response.data.total_pages,
            searchHref: response.data.results[0].title
              ? `/moviedetails/`
              : response.data.results[0].original_name
              ? `/tvshowdetails/`
              : response.data.results[0].name
              ? `/person/`
              : null,
            searchResults: response.data.results.map((searchResult) => ({
              key: searchResult.id,
              name:
                searchResult.title || searchResult.name || searchResult.name,
              description: searchResult.overview,
              releaseDate:
                searchResult.release_date || searchResult.first_air_date,
              image:
                searchResult.poster_path || searchResult.profile_path
                  ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${searchResult.poster_path}` ||
                    `${process.env.REACT_APP_BASE_IMAGE_URL}/${searchResult.profile_path}`
                  : NoImage,
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
        `${process.env.REACT_APP_BASE_URL}/search/${sortByValue}?api_key=${process.env.REACT_APP_API_KEY}&page=1&query=${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.total_results === 0) {
          this.setState({ nothingFound: true });
        } else {
          this.setState({
            totalPages: response.data.total_pages,
            nothingFound: false,
            page: 1,
            searchHref: response.data.results[0].title
              ? `/moviedetails/`
              : response.data.results[0].original_name
              ? `/tvshowdetails/`
              : response.data.results[0].name
              ? `/person/`
              : null,
            searchResults: response.data.results.map((searchResult) => ({
              key: searchResult.id,
              name:
                searchResult.title || searchResult.name || searchResult.name,
              description: searchResult.overview,
              releaseDate:
                searchResult.release_date || searchResult.first_air_date,

              image:
                (sortByValue === "movie" && searchResult.poster_path) ||
                (sortByValue === "tv" && searchResult.poster_path)
                  ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${searchResult.poster_path}`
                  : sortByValue === "person" && searchResult.profile_path
                  ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${searchResult.profile_path}`
                  : NoImage,
            })),
          });
        }
      });
    event.preventDefault();
  }
  sortByOnChange = (_, data) => {
    this.setState({ sortByValue: data.value });
  };

  render() {
    const {
      nothingFound,
      searchResults,
      page,
      totalPages,
      sortByValue,
      searchHref,
    } = this.state;

    return (
      <Container className="SearchResultsContainer">
        <Grid>
          <Grid.Column width={4}>
            <div className="SearchResultsSortByDiv">
              <h2 className="SearchResultsSortByHeader">Search Result</h2>
              <div className="SearchResultsSortDropdownDiv">
                <Form onSubmit={this.sortByHandleSubmit}>
                  <Dropdown
                    placeholder="Please select"
                    defaultValue={sortByValue}
                    value={sortByValue}
                    fluid
                    selection
                    options={sortByOptions}
                    onChange={this.sortByOnChange}
                  />
                  <Button className="SearchResultsSubmitButton" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            {nothingFound ? (
              <h1>
                Nothing found with the name of {this.props.match.params.id}
              </h1>
            ) : (
              searchResults.map((searchResult) => (
                <Grid className="SearchResultsGrid">
                  <Item.Group>
                    <Item>
                      <Image
                        className="SearchResultsImage"
                        src={searchResult.image}
                        href={`${searchHref}${searchResult.key}`}
                      />
                      <Item.Content className="SearchResultsItemContent">
                        <Item.Header className="SearchResultsItemInsideContent">
                          <a
                            className="SearchResultsItemHeader"
                            href={`${searchHref}${searchResult.key}`}
                          >
                            {searchResult.name}
                          </a>
                        </Item.Header>
                        <Item.Meta className="SearchResultsItemInsideContent">
                          {searchResult.releaseDate}
                        </Item.Meta>
                        <Item.Description className="SearchResultsItemInsideContent">
                          {searchResult.description ? (
                            <WordLimit limit={250}>
                              {searchResult.description}
                            </WordLimit>
                          ) : null}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid>
              ))
            )}
          </Grid.Column>
          <div className="SearchResultsPaginationStyle">
            {nothingFound ? null : (
              <Pagination
                defaultActivePage={1}
                activePage={page}
                totalPages={totalPages}
                onPageChange={this.setPageNum}
              />
            )}
          </div>
        </Grid>
      </Container>
    );
  }
}
export default SearchResults;
