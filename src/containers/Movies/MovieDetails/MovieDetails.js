import React, { Component } from "react";
import { Container, Grid, Image, Icon, Modal } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import ISO6391 from "iso-639-1";
import NoImage from "../../../assets/NoImage.png";
import "./MovieDetails.css";
/*

TASK: CAST REDIRECT TO THEIR PROFILE

*/
class MovieDetails extends Component {
  state = {
    movie: {},
    coverPhoto: null,
    movieGenres: [],
    movieHomepage: null,
    movieName: null,
    movieOverview: null,
    mainPhoto: null,
    movieReleaseDate: null,
    movieRuntime: null,
    movieBudget: null,
    movieRevenue: null,
    movieOriginalLanguage: null,
    movieStatus: null,
    movieTagline: null,
    movieCasts: [],
    movieFacebook: null,
    movieInstagram: null,
    movieTwitter: null,
    movieTrailer: null,
    movieMedias: [],
    clickPlayTrailer: false,
    movieRecommends: [],
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${this.props.match.params.id}?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          coverPhoto: `${process.env.REACT_APP_ORIGINAL_IMAGE_URL}${response.data.backdrop_path}`,
          movieGenres: response.data.genres.map((movieGenre) => ({
            key: movieGenre.id,
            genre: movieGenre.name,
          })),
          movieHomepage: response.data.homepage,
          movieName: response.data.original_title,
          movieOverview: response.data.overview,
          mainPhoto: response.data.poster_path
            ? `${process.env.REACT_APP_ORIGINAL_IMAGE_URL}${response.data.poster_path}`
            : NoImage,
          movieReleaseDate: response.data.release_date,
          movieRuntime: response.data.runtime,
          movieBudget: response.data.budget,
          movieRevenue: response.data.revenue,
          movieOriginalLanguage: response.data.original_language,
          movieStatus: response.data.status,
          movieTagline: response.data.tagline,
        });
      });
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
          movieFacebook: response.data.facebook_id,
          movieInstagram: response.data.instagram_id,
          movieTwitter: response.data.twitter_id,
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
            recommendedMovieName: movieRecommend.original_title,
            recommendedMovieImage: movieRecommend.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${movieRecommend.poster_path}`
              : NoImage,
            recommendedMovieReleaseDate: movieRecommend.release_date,
          })),
        });
      });
  }
  render() {
    const {
      movieRuntime,
      mainPhoto,
      movieName,
      movieReleaseDate,
      movieGenres,
      movieTrailer,
      movieMedias,
      movieTrailerId,
      movieTagline,
      movieOverview,
      movieCasts,
      movieFacebook,
      movieInstagram,
      movieTwitter,
      movieHomepage,
      movieStatus,
      movieOriginalLanguage,
      movieBudget,
      movieRevenue,
      movieRecommends,
    } = this.state;
    const runtimeHours = Math.floor(movieRuntime / 60);
    const runtimeMinutes = Math.round((movieRuntime / 60 - runtimeHours) * 60);

    const { coverPhoto } = this.state;

    const settings = {
      initialSlide: 0,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
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
        <Grid>
          <Grid.Row
            style={{
              backgroundImage: `linear-gradient(
                                to right,
                                rgba(100, 100, 100, 1),
                                rgba(100, 100, 100, 0.5)
                                ),
                                url("${coverPhoto}")`,
              backgroundSize: "100% 100%",
            }}
          >
            <Grid.Column width={4}>
              <Image className="MovieDetailsMainPhotoStyle" src={mainPhoto} />
            </Grid.Column>
            <Grid.Column className="MovieDetailsGridColumnInfo" width={12}>
              <h2 className="MovieDetailsMovieName">{movieName}</h2>
              <p className="MovieDetailsMovieInfoP">{movieReleaseDate}</p>
              {movieGenres &&
                movieGenres.map((movieGenre) => (
                  <span className="MovieDetailsMovieInfoSpan">
                    {movieGenre.genre + "."}
                  </span>
                ))}
              <span className="MovieDetailsMovieInfoSpan">
                {runtimeHours + " hrs " + runtimeMinutes + " mins"}
              </span>
              <div className="MovieDetailsModalDiv">
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
              </div>
              <h3 className="MovieDetailsTagline">{movieTagline}</h3>
              <h3 className="MovieDetailsOverviewHeader">Overview</h3>
              <p className="MovieDetailsMovieInfoP">{movieOverview}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <h1>Full Cast</h1>
              <Slider {...settings}>
                {movieCasts &&
                  movieCasts.map((movieCast) => (
                    <div>
                      <div className="SliderDiv">
                        <Image
                          className="SliderImage"
                          src={movieCast.actorImage}
                        />
                        <h1 className="SliderHeader">{movieCast.actorName}</h1>
                        <p>{movieCast.characterName}</p>
                      </div>
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
            <Grid.Column width={4}>
              <div className="MovieDetailsExternalIconsDiv">
                {movieFacebook ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/${movieFacebook}`}
                  >
                    <Icon size="big" name="facebook" />
                  </a>
                ) : null}
                {movieInstagram ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.instagram.com/${movieInstagram}`}
                  >
                    <Icon size="big" name="instagram" />
                  </a>
                ) : null}
                {movieTwitter ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.twitter.com/${movieTwitter}`}
                  >
                    <Icon size="big" name="twitter" />
                  </a>
                ) : null}
                {movieHomepage ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={movieHomepage}
                  >
                    <Icon size="big" name="linkify" />
                  </a>
                ) : null}
              </div>
              <div>
                <p className="MovieDetailsMovieInfoP">
                  <strong className="MovieDetailsStrong">Status</strong>
                  {movieStatus}
                </p>
                <p className="MovieDetailsMovieInfoP">
                  <strong className="MovieDetailsStrong">
                    Original Language
                  </strong>
                  {ISO6391.getName(movieOriginalLanguage)}
                </p>
                <p className="MovieDetailsMovieInfoP">
                  <strong className="MovieDetailsStrong">Budget</strong>
                  {movieBudget ? (
                    <CurrencyFormat
                      value={movieBudget}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value) => <div>{value}</div>}
                    />
                  ) : (
                    "-"
                  )}
                </p>
                <p className="MovieDetailsMovieInfoP">
                  <strong className="MovieDetailsStrong">Revenue</strong>
                  {movieRevenue ? (
                    <CurrencyFormat
                      value={movieRevenue}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value) => <div>{value}</div>}
                    />
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="MovieDetailsColumn">
              <h1>Media</h1>
              <Slider {...settingss}>
                {movieMedias &&
                  movieMedias.map((movieMedia) => (
                    <div>
                      <iframe
                        className="MovieDetailsIframeStyle"
                        src={`https://www.youtube.com/embed/${movieMedia.key}`}
                        title={movieMedia.id}
                      ></iframe>
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="MovieDetailsColumn">
              <h1>Recommendations</h1>
              <Slider {...settings}>
                {movieRecommends &&
                  movieRecommends.map((movieRecommend) => (
                    <div>
                      <div className="SliderDiv">
                        <Image
                          className="SliderImage"
                          src={movieRecommend.recommendedMovieImage}
                        />
                        <h1 className="SliderHeader">
                          {movieRecommend.recommendedMovieName}
                        </h1>
                        <p>{movieRecommend.recommendedMovieReleaseDate}</p>
                      </div>
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default MovieDetails;
