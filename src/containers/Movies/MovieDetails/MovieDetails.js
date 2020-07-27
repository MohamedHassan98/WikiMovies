import React, { Component } from "react";
import { Container, Grid, Image, Icon, Modal } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";
import ISO6391 from "iso-639-1";
/*

TASK: CAST REDIRECT TO THEIR PROFILE

*/
class MovieDetails extends Component {
  state = {
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
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          coverPhoto:
            `https://image.tmdb.org/t/p/original` + response.data.backdrop_path,
          movieGenres: response.data.genres.map((movieGenre) => {
            return {
              key: movieGenre.id,
              genre: movieGenre.name,
            };
          }),
          movieHomepage: response.data.homepage,
          movieName: response.data.original_title,
          movieOverview: response.data.overview,
          mainPhoto: response.data.poster_path
            ? `https://image.tmdb.org/t/p/original` + response.data.poster_path
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
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          movieCasts: response.data.cast.map((movieCast) => {
            return {
              key: movieCast.id,
              actorName: movieCast.name,
              characterName: movieCast.character,
              actorImage: movieCast.profile_path
                ? `https://image.tmdb.org/t/p/w500` + movieCast.profile_path
                : NoImage,
            };
          }),
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/external_ids?api_key=aa8a6567cb9ae791c14c0b267ac92c94`
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
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US`
      )
      .then((response) => {
        this.setState({
          movieTrailer: response.data.results[0]
            ? response.data.results[0].key
            : null,
          movieTrailerId: response.data.results[0]
            ? response.data.results[0].id
            : null,
          movieMedias: response.data.results.map((movieMedia) => {
            return {
              key: movieMedia.key,
              id: movieMedia.id,
            };
          }),
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/recommendations?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94&page=1`
      )
      .then((response) => {
        this.setState({
          movieRecommends: response.data.results.map((movieRecommend) => {
            return {
              key: movieRecommend.id,
              recommendedMovieName: movieRecommend.original_title,
              recommendedMovieImage: movieRecommend.poster_path
                ? `https://image.tmdb.org/t/p/w500` + movieRecommend.poster_path
                : NoImage,
              recommendedMovieReleaseDate: movieRecommend.release_date,
            };
          }),
        });
      });
  }
  render() {
    const runtimeHours = Math.floor(this.state.movieRuntime / 60);
    const runtimeMinutes = Math.round(
      (this.state.movieRuntime / 60 - runtimeHours) * 60
    );
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
      <Container style={{ marginTop: "150px" }}>
        <Grid>
          <Grid.Row
            style={{
              backgroundImage: `linear-gradient(
                                to right,
                                rgba(100, 100, 100, 1),
                                rgba(100, 100, 100, 0.5)
                                ),
                                url("${this.state.coverPhoto}")`,
              backgroundSize: "cover",
            }}
          >
            <Grid.Column width={4}>
              <Image
                style={{ borderRadius: "30px" }}
                src={this.state.mainPhoto}
              />
            </Grid.Column>
            <Grid.Column
              style={{
                display: "flex",
                alignContent: "center",
                flexWrap: "wrap",
                color: "white",
              }}
              width={12}
            >
              <h2
                style={{
                  fontSize: "40px",
                  width: "100%",
                  marginBottom: "25px",
                }}
              >
                {this.state.movieName}
              </h2>
              <span style={{ fontSize: "15px" }}>
                {this.state.movieReleaseDate}
              </span>
              {this.state.movieGenres &&
                this.state.movieGenres.map((movieGenre) => (
                  <span style={{ paddingLeft: "10px", fontSize: "15px" }}>
                    {movieGenre.genre + "."}
                  </span>
                ))}
              <span style={{ paddingLeft: "10px", fontSize: "15px" }}>
                {runtimeHours + " hrs " + runtimeMinutes + " mins"}
              </span>
              <div style={{ width: "100%", marginTop: "25px" }}>
                <Modal
                  closeIcon
                  trigger={
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "white",
                        fontSize: "20px",
                      }}
                    >
                      <Icon name="play" />
                      Play Trailer
                    </button>
                  }
                >
                  <Modal.Content style={{ padding: "0", lineHeight: "0" }}>
                    {this.state.movieTrailer && this.state.movieMedias ? (
                      <iframe
                        style={{ height: "600px", width: "100%" }}
                        src={
                          "https://www.youtube.com/embed/" +
                          this.state.movieTrailer
                        }
                        title={this.state.movieTrailerId}
                      ></iframe>
                    ) : null}
                  </Modal.Content>
                </Modal>
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  fontStyle: "italic",
                  width: "100%",
                  opacity: "0.7",
                }}
              >
                {this.state.movieTagline}
              </h3>
              <h3 style={{ fontSize: "25px", width: "100%" }}>Overview</h3>
              <p style={{ fontSize: "15px" }}>{this.state.movieOverview}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={12}>
              <h1>Full Cast</h1>
              <Slider {...settings}>
                {this.state.movieCasts &&
                  this.state.movieCasts.map((movieCast) => (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: "70%", borderRadius: "30px" }}
                          src={movieCast.actorImage}
                        />
                        <h1 style={{ fontSize: "17px", textAlign: "center" }}>
                          {movieCast.actorName}
                        </h1>
                        <p>{movieCast.characterName}</p>
                      </div>
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
            <Grid.Column width={4}>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                {this.state.movieFacebook ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.facebook.com/" + this.state.movieFacebook
                    }
                  >
                    <Icon size="big" name="facebook" />
                  </a>
                ) : null}
                {this.state.movieInstagram ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.instagram.com/" + this.state.movieInstagram
                    }
                  >
                    <Icon size="big" name="instagram" />
                  </a>
                ) : null}
                {this.state.movieTwitter ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.twitter.com/" + this.state.movieTwitter}
                  >
                    <Icon size="big" name="twitter" />
                  </a>
                ) : null}
                {this.state.movieHomepage ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.movieHomepage}
                  >
                    <Icon size="big" name="linkify" />
                  </a>
                ) : null}
              </div>
              <div>
                <p style={{ fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "5px",
                    }}
                  >
                    Status
                  </strong>
                  {this.state.movieStatus}
                </p>
                <p style={{ fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "5px",
                    }}
                  >
                    Original Language
                  </strong>
                  {ISO6391.getName(this.state.movieOriginalLanguage)}
                </p>
                <p style={{ fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "5px",
                    }}
                  >
                    Budget
                  </strong>
                  {this.state.movieBudget ? (
                    <CurrencyFormat
                      value={this.state.movieBudget}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value) => <div>{value}</div>}
                    />
                  ) : (
                    "-"
                  )}
                </p>
                <p style={{ fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "5px",
                    }}
                  >
                    Revenue
                  </strong>
                  {this.state.movieRevenue ? (
                    <CurrencyFormat
                      value={this.state.movieRevenue}
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
            <Grid.Column style={{ marginTop: "30px" }}>
              <h1>Media</h1>
              <Slider {...settingss}>
                {this.state.movieMedias &&
                  this.state.movieMedias.map((movieMedia) => (
                    <div>
                      <iframe
                        style={{ height: "600px", width: "100%" }}
                        src={"https://www.youtube.com/embed/" + movieMedia.key}
                        title={movieMedia.id}
                      ></iframe>
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ marginTop: "30px" }}>
              <h1>Recommendations</h1>
              <Slider {...settings}>
                {this.state.movieRecommends &&
                  this.state.movieRecommends.map((movieRecommend) => (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: "70%", borderRadius: "30px" }}
                          src={movieRecommend.recommendedMovieImage}
                        />
                        <h1 style={{ fontSize: "17px", textAlign: "center" }}>
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
