import React, { Component } from "react";
import { Container, Pagination } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";

class NowPlaying extends Component {
  state = {
    nowPlayingMovies: [],
    totalPages: 1,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          nowPlayingMovies: response.data.results.map((nowPlayingMovie) => ({
            key: nowPlayingMovie.id,
            movieName: nowPlayingMovie.title,
            movieImage: nowPlayingMovie.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${nowPlayingMovie.poster_path}`
              : NoImage,
            movieReleaseDate: nowPlayingMovie.release_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/movie/now_playing?language=en-US&page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          this.setState({
            nowPlayingMovies: response.data.results.map((nowPlayingMovie) => ({
              key: nowPlayingMovie.id,
              movieName: nowPlayingMovie.title,
              movieImage: nowPlayingMovie.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${nowPlayingMovie.poster_path}`
                : NoImage,
              movieReleaseDate: nowPlayingMovie.release_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { nowPlayingMovies, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Now Playing Movies</h1>
        <Gridder mainDatas={nowPlayingMovies} hrefMainUrl={`/moviedetails/`} />
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
export default NowPlaying;
