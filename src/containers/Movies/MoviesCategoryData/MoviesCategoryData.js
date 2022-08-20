import React, { Component } from "react";
import { Container, Pagination, Loader } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";

let categoryURL = null;
let categoryHeader = null;
let movieCategory = window.location.pathname.slice(0, -6);

switch (movieCategory) {
  case "/popular":
    categoryURL = "popular";
    categoryHeader = "Popular";
    break;

  case "/nowplaying":
    categoryURL = "now_playing";
    categoryHeader = "Now Playing";
    break;

  case "/upcoming":
    categoryURL = "upcoming";
    categoryHeader = "Upcoming";
    break;

  case "/toprated":
    categoryURL = "top_rated";
    categoryHeader = "Top Rated";
    break;

  default:
    categoryURL = null;
    categoryHeader = null;
}

class MoviesCategoryData extends Component {
  state = {
    moviesData: [],
    totalPages: 1,
    page: 1,
    loadingState: true,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${categoryURL}?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.responseStateSetter(response);
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage, loadingState: true }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/movie/${categoryURL}?language=en-US&page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          this.responseStateSetter(response);
        })
    );
    window.scrollTo(0, 0);
  };

  responseStateSetter = (response) => {
    this.setState({
      totalPages: response.data.total_pages,
      moviesData: response.data.results.map((movieData) => ({
        key: movieData.id,
        movieName: movieData.title,
        movieImage: movieData.poster_path
          ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movieData.poster_path}`
          : NoImage,
        movieReleaseDate: movieData.release_date,
      })),
      loadingState: false,
    });
  };

  render() {
    const { moviesData, totalPages, page, loadingState } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>{categoryHeader} Movies</h1>
        {loadingState ? (
          <Loader active inline="centered" />
        ) : (
          <>
            <Gridder mainDatas={moviesData} hrefMainUrl={`/moviedetails/`} />
            <div className="PaginationStyle">
              <Pagination
                activePage={page}
                totalPages={totalPages}
                onPageChange={this.setPageNum}
              />
            </div>
          </>
        )}
      </Container>
    );
  }
}
export default MoviesCategoryData;
