import React, { Component } from "react";
import { Container, Pagination } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";

class PopularMovies extends Component {
  state = {
    popularMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/popular?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          popularMovies: response.data.results.map((popularMovie) => ({
            key: popularMovie.id,
            movieName: popularMovie.title,
            movieImage: popularMovie.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${popularMovie.poster_path}`
              : NoImage,
            movieReleaseDate: popularMovie.release_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/movie/popular?language=en-US&page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          this.setState({
            popularMovies: response.data.results.map((popularMovie) => ({
              key: popularMovie.id,
              movieName: popularMovie.title,
              movieImage: popularMovie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${popularMovie.poster_path}`
                : NoImage,
              movieReleaseDate: popularMovie.release_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { popularMovies, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Popular Movies</h1>
        <Gridder mainDatas={popularMovies} hrefMainUrl={`/moviedetails/`} />
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
export default PopularMovies;
