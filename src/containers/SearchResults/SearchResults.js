import React, { Component } from "react";
import { Image, Container, Item, Grid, Pagination } from "semantic-ui-react";
import axios from "axios";

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
        `https://api.themoviedb.org/3/search/movie?api_key=aa8a6567cb9ae791c14c0b267ac92c94&page=1&query=${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data.total_results === 0) {
          this.setState({ nothingFound: true });
        } else {
          this.setState({
            totalPages: response.data.total_pages,
            movies: response.data.results.map((movie) => {
              return {
                key: movie.id,
                name: movie.title,
                description: movie.overview,
                releaseDate: movie.release_date,
                image: `https://image.tmdb.org/t/p/w500/` + movie.poster_path,
              };
            }),
          });
        }
      });
  }

  componentWillReceiveProps(newProps) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=aa8a6567cb9ae791c14c0b267ac92c94&page=1&query=${newProps.match.params.id}`
      )
      .then((response) => {
        if (response.data.total_results === 0) {
          this.setState({ nothingFound: true });
        } else {
          this.setState({
            page: 1,
            nothingFound: false,
            totalPages: response.data.total_pages,
            movies: response.data.results.map((movie) => {
              return {
                key: movie.id,
                name: movie.title,
                description: movie.overview,
                releaseDate: movie.release_date,
                image: `https://image.tmdb.org/t/p/w500/` + movie.poster_path,
              };
            }),
          });
        }
      });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=aa8a6567cb9ae791c14c0b267ac92c94&page=${this.state.page}&query=${this.props.match.params.id}`
        )
        .then((response) => {
          this.setState({
            movies: response.data.results.map((movie) => {
              return {
                key: movie.id,
                name: movie.title,
                description: movie.overview,
                releaseDate: movie.release_date,
                image: `https://image.tmdb.org/t/p/w500/` + movie.poster_path,
              };
            }),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    let content = null;
    if (this.state.nothingFound) {
      content = (
        <h1>Nothing found with the name of {this.props.match.params.id}</h1>
      );
    } else {
      content = (
        <>
          <Grid>
            {this.state.movies.map((movie) => (
              <Grid
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "35px",
                  borderRadius: "30px",
                }}
              >
                <Item.Group style={{ marginBottom: "50px" }}>
                  <Item>
                    <Image
                      style={{ width: "20%", borderRadius: "30px" }}
                      src={movie.image}
                    />
                    <Item.Content
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                      }}
                    >
                      <Item.Header style={{ padding: "25px" }}>
                        {movie.name}
                      </Item.Header>
                      <Item.Meta style={{ padding: "25px" }}>
                        {movie.releaseDate}
                      </Item.Meta>
                      <Item.Description style={{ padding: "25px" }}>
                        {movie.description}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid>
            ))}
          </Grid>
          <div style={{ textAlign: "center" }}>
            <Pagination
              defaultActivePage={1}
              activePage={this.state.page}
              totalPages={this.state.totalPages}
              onPageChange={this.setPageNum}
            />
          </div>
        </>
      );
    }
    return <Container style={{ marginTop: "120px" }}>{content}</Container>;
  }
}
export default SearchResults;
