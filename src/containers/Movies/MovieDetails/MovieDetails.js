import React, { Component } from "react";
import { Container, Grid, Image, Icon } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
/*

TASK: ADD PLAY TRAILER DYNAMICALLY
TASK: CAST REDIRECT TO THEIR PROFILE
TASK: FIX ORIGINAL LANGUAGE

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
  };
  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/419704?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
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
          mainPhoto:
            `https://image.tmdb.org/t/p/original` + response.data.poster_path,
          movieReleaseDate: response.data.release_date,
          movieRuntime: response.data.runtime,
          movieBudget: response.data.budget,
          movieRevenue: response.data.revenue,
          movieOriginalLanguage: response.data.spoken_languages[0].name,
          movieStatus: response.data.status,
          movieTagline: response.data.tagline,
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/419704/credits?api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          movieCasts: response.data.cast.map((movieCast) => {
            return {
              key: movieCast.id,
              actorName: movieCast.name,
              characterName: movieCast.character,
              actorImage:
                `https://image.tmdb.org/t/p/w500` + movieCast.profile_path,
            };
          }),
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/419704/external_ids?api_key=aa8a6567cb9ae791c14c0b267ac92c94`
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
        `https://api.themoviedb.org/3/movie/419704/videos?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US`
      )
      .then((response) => {
        this.setState({
          movieTrailer: response.data.results[0].key,
          movieMedias: response.data.results.map((movieMedia) => {
            return {
              key: movieMedia.key,
              id: movieMedia.id,
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
      initialSlide: -0.00005,
      dots: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
    const settingss = {
      initialSlide: 0,
      dots: true,
      infinite: true,
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
                <Icon name="play" />
                <span
                  style={{
                    fontSize: "20px",
                    marginBottom: "25px",
                    width: "100%",
                  }}
                >
                  Play Trailer
                </span>
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
              <h3 style={{ fontSize: "25px" }}>Overview</h3>
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
                  {this.state.movieOriginalLanguage}
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
                  {this.state.movieBudget === 0
                    ? "-"
                    : "$" + this.state.movieBudget}
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
                  {this.state.movieRevenue === 0
                    ? "-"
                    : "$" + this.state.movieRevenue}
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
        </Grid>
      </Container>
    );
  }
}
export default MovieDetails;
