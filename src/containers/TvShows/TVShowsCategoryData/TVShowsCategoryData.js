import React, { Component } from "react";
import { Container, Pagination } from "semantic-ui-react";
import axios from "axios";
import Gridder from "../../../components/Gridder/Gridder";
import NoImage from "../../../assets/NoImage.png";

let categoryURL = null;
let categoryHeader = null;
let tvshowCategory = window.location.pathname.slice(0, -7);

switch (tvshowCategory) {
  case "/popular":
    categoryURL = "popular";
    categoryHeader = "Popular";
    break;

  case "/airingtoday":
    categoryURL = "airing_today";
    categoryHeader = "Airing Today";
    break;

  case "/ontheair":
    categoryURL = "on_the_air";
    categoryHeader = "Currently Airing";
    break;

  case "/toprated":
    categoryURL = "top_rated";
    categoryHeader = "Top Rated";
    break;

  default:
    categoryURL = null;
    categoryHeader = null;
}

class TVShowsCategoryData extends Component {
  state = {
    tvshowsData: [],
    totalPages: 1,
    page: 1,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/${categoryURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        this.responseStateSetter(response);
      });
  }

  setPageNum = (_, { activePage }) => {
    this.setState({ page: activePage }, () =>
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/${categoryURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${activePage}`
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
      tvshowsData: response.data.results.map((tvshowData) => ({
        key: tvshowData.id,
        tvShowName: tvshowData.name,
        tvShowImage: tvshowData.poster_path
          ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${tvshowData.poster_path}`
          : NoImage,
        tvShowReleaseDate: tvshowData.first_air_date,
      })),
    });
  };

  render() {
    const { tvshowsData, totalPages } = this.state;
    return (
      <Container className="ContainerStyle">
        <h1>{categoryHeader} TV Shows</h1>
        <Gridder mainDatas={tvshowsData} hrefMainUrl={`/tvshowdetails/`} />
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
export default TVShowsCategoryData;
