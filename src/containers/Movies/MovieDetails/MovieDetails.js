import React, { Component } from "react";
import { Container, Grid, Image, Icon, Modal } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderMedia from "react-slick";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import ISO6391 from "iso-639-1";
import NoImage from "../../../assets/NoImage.png";
import Slider from "../../../components/Slider/Slider";
import "./MovieDetails.css";

class MovieDetails extends Component {
  state = {
    movieGenres: [],
    movieCasts: [],
    movieMedias: [],
    clickPlayTrailer: false,
    movieRecommends: [],
    redirect: null,
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
          movieName: response.data.title,
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
      })
      .catch((error) => this.setState({ redirect: "/page404" }));
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
            recommendedMovieName: movieRecommend.title,
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
      coverPhoto,
      redirect,
    } = this.state;
    const runtimeHours = Math.floor(movieRuntime / 60);
    const runtimeMinutes = Math.round((movieRuntime / 60 - runtimeHours) * 60);

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
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={4}
              className="MovieDetailsLeftCol"
            >
              <Image className="MovieDetailsMainPhotoStyle" src={mainPhoto} />
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={12}
              className="MovieDetailsGridColumnInfo MovieDetailsRightCol"
            >
              <h2 className="MovieDetailsMovieName">{movieName}</h2>
              <p className="MovieDetailsMovieInfoP">{movieReleaseDate}</p>
              {movieGenres &&
                movieGenres.map((movieGenre) => (
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
              {movieTagline ? (
                <h3 className="MovieDetailsTagline">{movieTagline}</h3>
              ) : null}
              {movieOverview ? (
                <>
                  <h3 className="MovieDetailsOverviewHeader">Overview</h3>
                  <p className="MovieDetailsMovieInfoP">{movieOverview}</p>
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
                      renderText={(value) => <>{value}</>}
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
                <h3 className="MovieDetailsNotFound">No Medias found</h3>
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
                <h3 className="MovieDetailsNotFound">
                  No Recommendations found
                </h3>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default MovieDetails;
