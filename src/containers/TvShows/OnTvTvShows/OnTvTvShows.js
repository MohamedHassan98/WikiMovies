import React, { Component } from "react";
import { Container, Pagination } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";

class OnTvTvShows extends Component {
  state = {
    onTvTvShows: [],
    totalPages: null,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/on_the_air?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          totalPages: response.data.total_pages,
          onTvTvShows: response.data.results.map((onTvTvShow) => ({
            key: onTvTvShow.id,
            tvShowName: onTvTvShow.name,
            tvShowImage: onTvTvShow.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${onTvTvShow.poster_path}`
              : NoImage,
            tvShowReleaseDate: onTvTvShow.first_air_date,
          })),
        });
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/on_the_air?language=en-US&page=${activePage}&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          this.setState({
            onTvTvShows: response.data.results.map((onTvTvShow) => ({
              key: onTvTvShow.id,
              tvShowName: onTvTvShow.name,
              tvShowImage: onTvTvShow.poster_path
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${onTvTvShow.poster_path}`
                : NoImage,
              tvShowReleaseDate: onTvTvShow.first_air_date,
            })),
          });
        })
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { onTvTvShows, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>Currently Airing Tv Shows</h1>
        <Gridder mainDatas={onTvTvShows} hrefMainUrl={`/tvshowdetails/`} />
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
export default OnTvTvShows;
