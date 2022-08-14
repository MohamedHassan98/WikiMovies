import React, { Component } from "react";
import { Container, Grid, Image, Icon, Modal } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderMedia from "react-slick";
import axios from "axios";
import ISO6391 from "iso-639-1";
import NoImage from "../../../assets/NoImage.png";
import Slider from "../../../components/Slider/Slider";
import "./TvShowDetails.css";

class TvShowDetails extends Component {
  state = {
    tvshowDetails: {},
    tvshowSocials: {},
    tvshowCasts: [],
    tvshowMedias: [],
    tvshowRecommends: [],
    clickPlayTrailer: false,
    redirect: null,
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        this.setState({
          tvshowDetails: response.data,
        });
      })
      .catch((_) => this.setState({ redirect: "/page404" }));
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/${this.props.match.params.id}/credits?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          tvshowCasts: response.data.cast.map((tvshowCast) => ({
            key: tvshowCast.id,
            actorName: tvshowCast.name,
            characterName: tvshowCast.character,
            actorImage: tvshowCast.profile_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${tvshowCast.profile_path}`
              : NoImage,
          })),
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/${this.props.match.params.id}/external_ids?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          tvshowSocials: response.data,
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/${this.props.match.params.id}/videos?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          tvshowTrailer: response.data.results[0]
            ? response.data.results[0].key
            : null,
          tvshowTrailerId: response.data.results[0]
            ? response.data.results[0].id
            : null,
          tvshowMedias: response.data.results.map((tvshowMedia) => ({
            key: tvshowMedia.key,
            id: tvshowMedia.id,
          })),
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/${this.props.match.params.id}/recommendations?language=en-US&api_key=${process.env.REACT_APP_API_KEY}&page=1`
      )
      .then((response) => {
        this.setState({
          tvshowRecommends: response.data.results.map((tvshowRecommend) => ({
            key: tvshowRecommend.id,
            recommendedTvShowName: tvshowRecommend.name,
            recommendedTvShowDate: tvshowRecommend.first_air_date,
            recommendedTvShowImage: tvshowRecommend.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${tvshowRecommend.poster_path}`
              : NoImage,
          })),
        });
      });
  }
  render() {
    const {
      tvshowDetails,
      tvshowSocials,
      tvshowTrailer,
      tvshowMedias,
      tvshowTrailerId,
      tvshowCasts,
      tvshowRecommends,
      redirect,
    } = this.state;
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
      <Container className="TvShowDetailsContainerStyle">
        <Grid>
          <Grid.Row
            style={{
              backgroundImage: `linear-gradient(
                                to right,
                                rgba(100, 100, 100, 1),
                                rgba(100, 100, 100, 0.5)
                                ),
                                url("${`${process.env.REACT_APP_ORIGINAL_IMAGE_URL}${tvshowDetails.backdrop_path}`}")`,
              backgroundSize: "100% 100%",
            }}
          >
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={4}
              className="TvShowDetailsLeftCol"
            >
              <Image
                className="TvShowDetailsMainPhotoStyle"
                src={
                  tvshowDetails.poster_path
                    ? `${process.env.REACT_APP_ORIGINAL_IMAGE_URL}${tvshowDetails.poster_path}`
                    : NoImage
                }
                alt="Main Image"
              />
            </Grid.Column>
            <Grid.Column
              className="TvShowDetailsGridColumnInfo TvShowDetailsRightCol"
              mobile={16}
              tablet={16}
              computer={12}
            >
              <h2 className="TvShowDetailsTvShowName">{tvshowDetails.name}</h2>
              <p className="TvShowDetailsTvShowInfoP">
                {tvshowDetails.first_air_date}
              </p>
              {tvshowDetails.genres &&
                tvshowDetails.genres.map((tvshowGenre) => (
                  <span
                    className="TvShowDetailsTvShowInfoSpan"
                    key={tvshowGenre.id}
                  >
                    {tvshowGenre.name + "."}
                  </span>
                ))}
              <span className="TvShowDetailsTvShowInfoSpan">
                {tvshowDetails.seasons && tvshowDetails.seasons.length}{" "}
                Season(s).
              </span>
              <span className="TvShowDetailsTvShowInfoSpan">
                {tvshowDetails.episode_run_time
                  ? `${tvshowDetails.episode_run_time.join(" / ")} Minutes.`
                  : null}
              </span>
              <div className="TvShowDetailsModalDiv">
                {tvshowTrailer ? (
                  <Modal
                    closeIcon
                    trigger={
                      <button className="TvShowDetailsPlayTrailerButton">
                        <Icon name="play" />
                        Play Trailer
                      </button>
                    }
                  >
                    <Modal.Content className="TvShowDetailsModalContent">
                      <iframe
                        className="TvShowDetailsIframeStyle"
                        src={`https://www.youtube.com/embed/${tvshowTrailer}`}
                        title={tvshowTrailerId}
                      ></iframe>
                    </Modal.Content>
                  </Modal>
                ) : null}
              </div>
              {tvshowDetails.overview ? (
                <>
                  <h3 className="TvShowDetailsOverviewHeader">Overview</h3>
                  <p className="TvShowDetailsTvShowInfoP">
                    {tvshowDetails.overview}
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
              className="TvShowDetailsLeftCol"
            >
              <h1 className="TvShowDetailsFullCast">Full Cast</h1>
              {tvshowCasts[0] ? (
                <Slider mainDatas={tvshowCasts} hrefMainUrl={"/person/"} />
              ) : (
                <h2>No Cast crew found</h2>
              )}
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={4}
              className="TvShowDetailsRightCol"
            >
              <div className="TvShowDetailsExternalIconsDiv">
                {tvshowSocials.facebook_id ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/${tvshowSocials.facebook_id}`}
                  >
                    <Icon size="big" name="facebook" />
                  </a>
                ) : null}
                {tvshowSocials.instagram_id ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.instagram.com/${tvshowSocials.instagram_id}`}
                  >
                    <Icon size="big" name="instagram" />
                  </a>
                ) : null}
                {tvshowSocials.twitter_id ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.twitter.com/${tvshowSocials.twitter_id}`}
                  >
                    <Icon size="big" name="twitter" />
                  </a>
                ) : null}
                {tvshowDetails.homepage ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={tvshowDetails.homepage}
                  >
                    <Icon size="big" name="linkify" />
                  </a>
                ) : null}
              </div>
              <div>
                <p className="TvShowDetailsTvShowInfoP">
                  <strong className="TvShowDetailsStrong">Status</strong>
                  {tvshowDetails.status ? tvshowDetails.status : "-"}
                </p>
                <p className="TvShowDetailsTvShowInfoP">
                  <strong className="TvShowDetailsStrong">Network</strong>
                  {tvshowDetails.networks ? (
                    <Image
                      className="TvShowDetailsNetworkImage"
                      alt="Network Logo"
                      src={`${process.env.REACT_APP_BASE_IMAGE_URL}${tvshowDetails.networks[0].logo_path}`}
                    />
                  ) : (
                    "-"
                  )}
                </p>
                <p className="TvShowDetailsTvShowInfoP">
                  <strong className="TvShowDetailsStrong">
                    Original Language
                  </strong>
                  {tvshowDetails.original_language
                    ? ISO6391.getName(tvshowDetails.original_language)
                    : "-"}
                </p>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="TvShowDetailsRow">
            <Grid.Column className="TvShowDetailsColumn">
              <h1>Media</h1>
              {tvshowMedias[0] ? (
                <SliderMedia {...settingss}>
                  {tvshowMedias &&
                    tvshowMedias.map((tvshowMedia) => (
                      <div key={tvshowMedia.key}>
                        <iframe
                          className="TvShowDetailsIframeStyle"
                          src={`https://www.youtube.com/embed/${tvshowMedia.key}`}
                          title={tvshowMedia.id}
                        ></iframe>
                      </div>
                    ))}
                </SliderMedia>
              ) : (
                <h3>No Medias found</h3>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="TvShowDetailsRow">
            <Grid.Column className="TvShowDetailsColumn">
              <h1>Recommendations</h1>
              {tvshowRecommends[0] ? (
                <Slider
                  mainDatas={tvshowRecommends}
                  hrefMainUrl={"/tvshowdetails/"}
                />
              ) : (
                <h2>No Recommendations found</h2>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default TvShowDetails;
