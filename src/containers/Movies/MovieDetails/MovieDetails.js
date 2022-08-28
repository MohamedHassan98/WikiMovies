import React, { Component } from "react";
import { Container, Grid, Image, Icon, Modal, Loader } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderMedia from "react-slick";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import ISO6391 from "iso-639-1";
import Notify from "../../../components/Toastify/Toastify";
import NoImage from "../../../assets/NoImage.png";
import Slider from "../../../components/Slider/Slider";
import "./MovieDetails.css";

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    movieSocials: {},
    movieCasts: [],
    movieMedias: [],
    movieRecommends: [],
    clickPlayTrailer: false,
    favorites: false,
    redirect: null,
    loadingState: true,
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${this.props.match.params.id}?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          movieDetails: response.data,
        });
      })
      .catch((_) => this.setState({ redirect: "/page404" }));
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${this.props.match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          movieCasts: response.data.cast.map((movieCast) => ({
            key: movieCast.id,
            actorName: movieCast.name,
            characterName: movieCast.character,
            actorImage: movieCast.profile_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movieCast.profile_path}`
              : NoImage,
          })),
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${this.props.match.params.id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          movieSocials: response.data,
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${this.props.match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        this.setState({
          movieTrailer: response.data.results[0]
            ? response.data.results[0].key
            : null,
          movieTrailerId: response.data.results[0]
            ? response.data.results[0].id
            : null,
          movieMedias: response.data.results.map((movieMedia) => ({
            key: movieMedia.key,
            id: movieMedia.id,
          })),
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${this.props.match.params.id}/recommendations?language=en-US&api_key=${process.env.REACT_APP_API_KEY}&page=1`
      )
      .then((response) => {
        this.setState({
          movieRecommends: response.data.results.map((movieRecommend) => ({
            key: movieRecommend.id,
            recommendedMovieName: movieRecommend.title,
            recommendedMovieImage: movieRecommend.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movieRecommend.poster_path}`
              : NoImage,
            recommendedMovieReleaseDate: movieRecommend.release_date,
          })),
          loadingState: false,
        });
      });
    if (localStorage.getItem("userName")) {
      axios
        .get(
          `${process.env.REACT_APP_FIREBASE_URL}${localStorage.getItem(
            "userId"
          )}/favorites-movies/${this.props.match.params.id}.json`
        )
        .then((response) => {
          if (response.data !== null) {
            this.setState({ favorites: true });
          }
        })
        .catch((_) => Notify("Failed to retrieve favorites list", "error"));
    }
  }

  addToFavorites = () => {
    axios
      .put(
        `${process.env.REACT_APP_FIREBASE_URL}${localStorage.getItem(
          "userId"
        )}/favorites-movies/${this.props.match.params.id}.json`,
        this.props.match.params.id
      )
      .then(
        (_) => this.setState({ favorites: true }),
        Notify("Added to favorites list", "success")
      )
      .catch((_) => Notify("Failed to add to favorites list", "error"));
  };

  removeFromFavorites = () => {
    axios
      .delete(
        `${process.env.REACT_APP_FIREBASE_URL}${localStorage.getItem(
          "userId"
        )}/favorites-movies/${this.props.match.params.id}.json`
      )
      .then(
        (_) => this.setState({ favorites: false }),
        Notify("Removed from favorites list", "success")
      )
      .catch((_) => Notify("Failed to remove from favorites list", "error"));
  };

  render() {
    const {
      movieTrailer,
      movieMedias,
      movieTrailerId,
      movieCasts,
      movieSocials,
      movieRecommends,
      movieDetails,
      redirect,
      favorites,
      loadingState,
    } = this.state;
    const runtimeHours = Math.floor(movieDetails.runtime / 60);
    const runtimeMinutes = Math.round(
      (movieDetails.runtime / 60 - runtimeHours) * 60
    );

    if (redirect) {
      return <Redirect to={redirect} />;
    }
    const settingss = {
      initialSlide: 0,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };
    return (
      <Container className="MovieDetailsContainerStyle">
        {loadingState ? (
          <Loader active inline="centered" />
        ) : (
          <Grid>
            <Grid.Row
              style={{
                backgroundImage: `linear-gradient(
                                to right,
                                rgba(100, 100, 100, 1),
                                rgba(100, 100, 100, 0.5)
                                ),
                                url("${`${process.env.REACT_APP_ORIGINAL_IMAGE_URL}${movieDetails.backdrop_path}`}")`,
                backgroundSize: "100% 100%",
              }}
            >
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={4}
                className="MovieDetailsLeftCol"
              >
                <Image
                  className="MovieDetailsMainPhotoStyle"
                  alt="Main Image"
                  src={
                    movieDetails.poster_path
                      ? `${process.env.REACT_APP_ORIGINAL_IMAGE_URL}${movieDetails.poster_path}`
                      : NoImage
                  }
                />
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={12}
                className="MovieDetailsGridColumnInfo MovieDetailsRightCol"
              >
                <h2 className="MovieDetailsMovieName">{movieDetails.title}</h2>
                <p className="MovieDetailsMovieInfoP">
                  {movieDetails.release_date}
                </p>
                {movieDetails.genres &&
                  movieDetails.genres
                    .map((movieGenre) => ({
                      key: movieGenre.id,
                      genre: movieGenre.name,
                    }))
                    .map((movieGenre) => (
                      <span
                        key={movieGenre.key}
                        className="MovieDetailsMovieInfoSpan"
                      >
                        {movieGenre.genre + "."}
                      </span>
                    ))}
                {runtimeHours === 0 && runtimeMinutes === 0 ? null : (
                  <span className="MovieDetailsMovieInfoSpan">
                    {runtimeHours + " hrs " + runtimeMinutes + " mins"}
                  </span>
                )}
                <div className="MovieDetailsModalDiv">
                  {localStorage.getItem("userId") ? (
                    favorites ? (
                      <button
                        className="MovieDetailsFavorites"
                        onClick={() => this.removeFromFavorites()}
                      >
                        <Icon name="favorite" color="yellow" />
                      </button>
                    ) : (
                      <button
                        className="MovieDetailsFavorites"
                        onClick={() => this.addToFavorites()}
                      >
                        <Icon name="favorite" />
                      </button>
                    )
                  ) : null}
                  {movieTrailer ? (
                    <Modal
                      closeIcon
                      trigger={
                        <button className="MovieDetailsPlayTrailerButton">
                          <Icon name="play" />
                          Play Trailer
                        </button>
                      }
                    >
                      <Modal.Content className="MovieDetailsModalContent">
                        {movieTrailer && movieMedias ? (
                          <iframe
                            className="MovieDetailsIframeStyle"
                            src={`https://www.youtube.com/embed/${movieTrailer}`}
                            title={movieTrailerId}
                          ></iframe>
                        ) : null}
                      </Modal.Content>
                    </Modal>
                  ) : null}
                </div>
                {movieDetails.tagline ? (
                  <h3 className="MovieDetailsTagline">
                    {movieDetails.tagline}
                  </h3>
                ) : null}
                {movieDetails.overview ? (
                  <>
                    <h3 className="MovieDetailsOverviewHeader">Overview</h3>
                    <p className="MovieDetailsMovieInfoP">
                      {movieDetails.overview}
                    </p>
                  </>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={12}
                className="MovieDetailsLeftCol"
              >
                <h1 className="MovieDetailsFullCast">Full Cast</h1>
                {movieCasts[0] ? (
                  <Slider mainDatas={movieCasts} hrefMainUrl={`/person/`} />
                ) : (
                  <h1 className="MovieDetailsNotFound">No Cast crew found</h1>
                )}
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={4}
                className="MovieDetailsRightCol"
              >
                <div className="MovieDetailsExternalIconsDiv">
                  {movieSocials.facebook_id ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Hyperlink"
                      href={`https://www.facebook.com/${movieSocials.facebook_id}`}
                    >
                      <Icon size="big" name="facebook" />
                    </a>
                  ) : null}
                  {movieSocials.instagram_id ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Hyperlink"
                      href={`https://www.instagram.com/${movieSocials.instagram_id}`}
                    >
                      <Icon size="big" name="instagram" />
                    </a>
                  ) : null}
                  {movieSocials.twitter_id ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter Hyperlink"
                      href={`https://www.twitter.com/${movieSocials.twitter_id}`}
                    >
                      <Icon size="big" name="twitter" />
                    </a>
                  ) : null}
                  {movieDetails.homepage ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={movieDetails.homepage}
                    >
                      <Icon size="big" name="linkify" />
                    </a>
                  ) : null}
                </div>
                <div>
                  <p className="MovieDetailsMovieInfoP">
                    <strong className="MovieDetailsStrong">Status</strong>
                    {movieDetails.status}
                  </p>
                  <p className="MovieDetailsMovieInfoP">
                    <strong className="MovieDetailsStrong">
                      Original Language
                    </strong>
                    {ISO6391.getName(movieDetails.original_language)}
                  </p>
                  <p className="MovieDetailsMovieInfoP">
                    <strong className="MovieDetailsStrong">Budget</strong>
                    {movieDetails.budget ? (
                      <CurrencyFormat
                        value={movieDetails.budget}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        renderText={(value) => <>{value}</>}
                      />
                    ) : (
                      "-"
                    )}
                  </p>
                  <p className="MovieDetailsMovieInfoP">
                    <strong className="MovieDetailsStrong">Revenue</strong>
                    {movieDetails.revenue ? (
                      <CurrencyFormat
                        value={movieDetails.revenue}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        renderText={(value) => <>{value}</>}
                      />
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="MovieDetailsRow">
              <Grid.Column className="MovieDetailsColumn">
                <h1>Media</h1>
                {movieMedias[0] ? (
                  <SliderMedia {...settingss}>
                    {movieMedias &&
                      movieMedias.map((movieMedia) => (
                        <div key={movieMedia.key}>
                          <iframe
                            className="MovieDetailsIframeStyle"
                            src={`https://www.youtube.com/embed/${movieMedia.key}`}
                            title={movieMedia.id}
                          ></iframe>
                        </div>
                      ))}
                  </SliderMedia>
                ) : (
                  <h2 className="MovieDetailsNotFound">No Medias found</h2>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="MovieDetailsRow">
              <Grid.Column className="MovieDetailsColumn">
                <h1>Recommendations</h1>
                {movieRecommends[0] ? (
                  <Slider
                    mainDatas={movieRecommends}
                    hrefMainUrl={"/moviedetails/"}
                  />
                ) : (
                  <h2 className="MovieDetailsNotFound">
                    No Recommendations found
                  </h2>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Container>
    );
  }
}
export default MovieDetails;
