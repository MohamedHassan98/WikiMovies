import React, { Component } from "react";
import { Container, Grid, Image, Icon, Modal } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";
import ISO6391 from "iso-639-1";
/*

TASK: CAST REDIRECT TO THEIR PROFILE
TASK: FIX RUNTIME

*/
class TvShowDetails extends Component {
  state = {
    coverPhoto: null,
    tvShowGenres: [],
    tvshowHomepage: null,
    tvshowName: null,
    tvshowOverview: null,
    mainPhoto: null,
    tvshowReleaseDate: null,
    tvshowRuntime: null,
    tvshowNetwork: null,
    tvshowOriginalLanguage: null,
    tvshowStatus: null,
    tvshowCasts: [],
    tvshowFacebook: null,
    tvshowInstagram: null,
    tvshowTwitter: null,
    tvshowTrailer: null,
    tvshowMedias: [],
    tvshowRecommends: [],
    clickPlayTrailer: false,
  };
  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US`
      )
      .then((response) => {
        this.setState({
          coverPhoto:
            `https://image.tmdb.org/t/p/original` + response.data.backdrop_path,
          tvshowGenres: response.data.genres.map((tvshowGenre) => {
            return {
              key: tvshowGenre.id,
              genre: tvshowGenre.name,
            };
          }),
          tvshowHomepage: response.data.homepage,
          tvshowName: response.data.original_name,
          tvshoweOverview: response.data.overview,
          mainPhoto: response.data.poster_path
            ? `https://image.tmdb.org/t/p/original` + response.data.poster_path
            : NoImage,
          tvshowReleaseDate: response.data.first_air_date,
          tvshowRuntime: response.data.episode_run_time,
          tvshowNetwork: response.data.networks[0].logo_path,
          tvshowOverview: response.data.overview,
          tvshowOriginalLanguage: response.data.original_language,
          tvshowStatus: response.data.status,
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/credits?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          tvshowCasts: response.data.cast.map((tvshowCast) => {
            return {
              key: tvshowCast.id,
              actorName: tvshowCast.name,
              characterName: tvshowCast.character,
              actorImage: tvshowCast.profile_path
                ? `https://image.tmdb.org/t/p/w500` + tvshowCast.profile_path
                : NoImage,
            };
          }),
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/external_ids?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          tvshowFacebook: response.data.facebook_id,
          tvshowInstagram: response.data.instagram_id,
          tvshowTwitter: response.data.twitter_id,
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/videos?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          tvshowTrailer: response.data.results[0]
            ? response.data.results[0].key
            : null,
          tvshowTrailerId: response.data.results[0]
            ? response.data.results[0].id
            : null,
          tvshowMedias: response.data.results.map((tvshowMedia) => {
            return {
              key: tvshowMedia.key,
              id: tvshowMedia.id,
            };
          }),
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/recommendations?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94&page=1`
      )
      .then((response) => {
        this.setState({
          tvshowRecommends: response.data.results.map((tvshowRecommend) => {
            return {
              key: tvshowRecommend.id,
              recommendedTvShowName: tvshowRecommend.original_name,
              recommendedTvShowDate: tvshowRecommend.first_air_date,
              recommendedTvShowImage: tvshowRecommend.poster_path
                ? `https://image.tmdb.org/t/p/w500` +
                  tvshowRecommend.poster_path
                : NoImage,
            };
          }),
        });
      });
  }
  render() {
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
                {this.state.tvshowName}
              </h2>
              <span style={{ fontSize: "15px" }}>
                {this.state.tvshowReleaseDate}
              </span>
              {this.state.tvshowGenres &&
                this.state.tvshowGenres.map((tvshowGenre) => (
                  <span style={{ paddingLeft: "10px", fontSize: "15px" }}>
                    {tvshowGenre.genre + "."}
                  </span>
                ))}
              <span style={{ paddingLeft: "10px", fontSize: "15px" }}>
                {this.state.tvshowRuntime}
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
                    {this.state.tvshowTrailer && this.state.tvshowMedias ? (
                      <iframe
                        style={{ height: "600px", width: "100%" }}
                        src={
                          "https://www.youtube.com/embed/" +
                          this.state.tvshowTrailer
                        }
                        title={this.state.tvshowTrailerId}
                      ></iframe>
                    ) : null}
                  </Modal.Content>
                </Modal>
              </div>
              <h3 style={{ fontSize: "25px", width: "100%" }}>Overview</h3>
              <p style={{ fontSize: "15px" }}>{this.state.tvshowOverview}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={12}>
              <h1>Full Cast</h1>
              <Slider {...settings}>
                {this.state.tvshowCasts &&
                  this.state.tvshowCasts.map((tvshowCast) => (
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
                          src={tvshowCast.actorImage}
                        />
                        <h1 style={{ fontSize: "17px", textAlign: "center" }}>
                          {tvshowCast.actorName}
                        </h1>
                        <p>{tvshowCast.characterName}</p>
                      </div>
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
            <Grid.Column width={4}>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                {this.state.tvshowFacebook ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.facebook.com/" + this.state.tvshowFacebook
                    }
                  >
                    <Icon size="big" name="facebook" />
                  </a>
                ) : null}
                {this.state.tvshowInstagram ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.instagram.com/" + this.state.tvshowInstagram
                    }
                  >
                    <Icon size="big" name="instagram" />
                  </a>
                ) : null}
                {this.state.tvshowTwitter ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.twitter.com/" + this.state.tvshowTwitter}
                  >
                    <Icon size="big" name="twitter" />
                  </a>
                ) : null}
                {this.state.tvshowHomepage ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.tvshowHomepage}
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
                  {this.state.tvshowStatus}
                </p>
                <p style={{ fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "5px",
                    }}
                  >
                    Network
                  </strong>
                  <Image
                    style={{ width: "25%" }}
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      this.state.tvshowNetwork
                    }
                  />
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
                  {ISO6391.getName(this.state.tvshowOriginalLanguage)}
                </p>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ marginTop: "30px" }}>
              <h1>Media</h1>
              <Slider {...settingss}>
                {this.state.tvshowMedias &&
                  this.state.tvshowMedias.map((tvshowMedia) => (
                    <div>
                      <iframe
                        style={{ height: "600px", width: "100%" }}
                        src={"https://www.youtube.com/embed/" + tvshowMedia.key}
                        title={tvshowMedia.id}
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
                {this.state.tvshowRecommends &&
                  this.state.tvshowRecommends.map((tvshowRecommend) => (
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
                          src={tvshowRecommend.recommendedTvShowImage}
                        />
                        <h1 style={{ fontSize: "17px", textAlign: "center" }}>
                          {tvshowRecommend.recommendedTvShowName}
                        </h1>
                        <p>{tvshowRecommend.recommendedTvShowDate}</p>
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
export default TvShowDetails;
