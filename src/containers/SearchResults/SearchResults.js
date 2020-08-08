import React, { Component } from "react";
import { Image, Container, Item, Grid, Pagination } from "semantic-ui-react";
import axios from "axios";
import NoImage from "../../assets/NoImage.png";
import "./SearchResults.css";
/* 

TASK: ADD SEARCH CATEGORY, DEFAULT MOVIES


*/

class SearchResults extends Component {
  state = {
    movies: [],
    paginationNumber: 1,
    nothingFound: false,
    totalPages: null,
    page: 1,
  };

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
            movies: response.data.results.map((movie) => ({
              key: movie.id,
              name: movie.title,
              description: movie.overview,
              releaseDate: movie.release_date,
              image: movie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movie.poster_path}`
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
            page: 1,
            nothingFound: false,
            totalPages: response.data.total_pages,
            movies: response.data.results.map((movie) => ({
              key: movie.id,
              name: movie.title,
              description: movie.overview,
              releaseDate: movie.release_date,
              image: movie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movie.poster_path}`
                : NoImage,
            })),
          });
        }
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${activePage}&query=${this.props.match.params.id}`
        )
        .then((response) => {
          this.setState({
            movies: response.data.results.map((movie) => ({
              key: movie.id,
              name: movie.title,
              description: movie.overview,
              releaseDate: movie.release_date,
              image: movie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movie.poster_path}`
                : NoImage,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { nothingFound, movies, page, totalPages } = this.state;
    let content = null;
    if (nothingFound) {
      content = (
        <h1>Nothing found with the name of {this.props.match.params.id}</h1>
      );
    } else {
      content = (
        <>
          <Grid>
            {movies.map((movie) => (
              <Grid className="SearchResultsGrid">
                <Item.Group>
                  <Item>
                    <Image
                      className="SearchResultsImage"
                      src={movie.image}
                      href={`/moviedetails/${movie.key}`}
                    />
                    <Item.Content className="SearchResultsItemContent">
                      <Item.Header className="SearchResultsItemInsideContent">
                        <a
                          className="SearchResultsItemHeader"
                          href={`/moviedetails/${movie.key}`}
                        >
                          {movie.name}
                        </a>
                      </Item.Header>
                      <Item.Meta className="SearchResultsItemInsideContent">
                        {movie.releaseDate}
                      </Item.Meta>
                      <Item.Description className="SearchResultsItemInsideContent">
                        {movie.description}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid>
            ))}
          </Grid>
          <div className="PaginationStyle">
            <Pagination
              defaultActivePage={1}
              activePage={page}
              totalPages={totalPages}
              onPageChange={this.setPageNum}
            />
          </div>
        </>
      );
    }
    return <Container className="SearchResultsContainer">{content}</Container>;
  }
}
export default SearchResults;
