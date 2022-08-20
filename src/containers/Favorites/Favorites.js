import axios from "axios";
import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import Gridder from "../../components/Gridder/Gridder";
import NoImage from "../../assets/NoImage.png";
import "./Favorites.css";

class Favorites extends Component {
  state = {
    favoriteMoviesData: [],
    favoriteSeriesData: [],
    loadingStateMovies: true,
    loadingStateSeries: true,
  };

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    try {
      const respMovies = await axios.get(
        `${process.env.REACT_APP_FIREBASE_URL}${localStorage.getItem(
          "userId"
        )}/favorites-movies/.json`
      );
      const movieIds = Object.values(respMovies.data);
      let moviesArray = [];
      await Promise.all(
        movieIds.map((movieId) =>
          this.fetchFavoriteMovies(movieId, moviesArray)
        )
      );
    } catch (error) {
      this.setState({ loadingStateMovies: false });
    }
    try {
      const respSeries = await axios.get(
        `${process.env.REACT_APP_FIREBASE_URL}${localStorage.getItem(
          "userId"
        )}/favorites-series/.json`
      );
      const seriesIds = Object.values(respSeries.data);
      let seriesArray = [];
      await Promise.all(
        seriesIds.map((seriesId) =>
          this.fetchFavoriteSeries(seriesId, seriesArray)
        )
      );
    } catch (error) {
      this.setState({ loadingStateSeries: false });
    }
  };

  fetchFavoriteMovies = async (movieId, moviesArray) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/movie/${movieId}?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) =>
          moviesArray.push({
            key: response.data.id,
            movieImage: response.data.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${response.data.poster_path}`
              : NoImage,
            movieName: response.data.title,
            movieReleaseDate: response.data.release_date,
          })
        );
      this.setState({
        favoriteMoviesData: moviesArray,
        loadingStateMovies: false,
      });
    } catch (err) {
      alert(err);
    }
  };

  fetchFavoriteSeries = async (seriesId, seriesArray) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/tv/${seriesId}?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) =>
          seriesArray.push({
            key: response.data.id,
            tvShowImage: response.data.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${response.data.poster_path}`
              : NoImage,
            tvShowName: response.data.name,
            tvShowReleaseDate: response.data.first_air_date,
          })
        );
      this.setState({
        favoriteSeriesData: seriesArray,
        loadingStateSeries: false,
      });
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const {
      favoriteMoviesData,
      favoriteSeriesData,
      loadingStateMovies,
      loadingStateSeries,
    } = this.state;
    return (
      <div style={{ marginTop: "150px" }}>
        <h1 className="FavoriteMovies">Favorite Movies</h1>
        {loadingStateMovies ? (
          <Loader active inline="centered" />
        ) : (
          <>
            {favoriteMoviesData.length !== 0 ? (
              <Gridder
                mainDatas={favoriteMoviesData}
                hrefMainUrl={`/moviedetails/`}
              />
            ) : (
              <h2 className="FavoriteNotFound">No Favorite Movies Found</h2>
            )}
          </>
        )}

        <h1 className="FavoriteSeries">Favorite Series</h1>
        {loadingStateSeries ? (
          <Loader active inline="centered" />
        ) : (
          <>
            {favoriteSeriesData.length !== 0 ? (
              <Gridder
                mainDatas={favoriteSeriesData}
                hrefMainUrl={`/tvshowdetails/`}
              />
            ) : (
              <h2 className="FavoriteNotFound">No Favorite Series Found</h2>
            )}
          </>
        )}
      </div>
    );
  }
}
export default Favorites;
