import React, { Component } from "react";
import { Container, Pagination } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";

class UpcomingMovies extends Component {
  state = {
    upcomingMovies: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          upcomingMovies: response.data.results.map((upcomingMovie) => ({
            key: upcomingMovie.id,
            movieName: upcomingMovie.title,
            movieImage: upcomingMovie.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${upcomingMovie.poster_path}`
              : NoImage,
            movieReleaseDate: upcomingMovie.release_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${activePage}`
        )
        .then((response) => {
          this.setState({
            upcomingMovies: response.data.results.map((upcomingMovie) => {
              return {
                key: upcomingMovie.id,
                movieName: upcomingMovie.title,
                movieImage: upcomingMovie.poster_path
                  ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${upcomingMovie.poster_path}`
                  : NoImage,
                movieReleaseDate: upcomingMovie.release_date,
              };
            }),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { upcomingMovies, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Upcoming Movies</h1>
        <Gridder mainDatas={upcomingMovies} hrefMainUrl={`/moviedetails/`} />
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
export default UpcomingMovies;
