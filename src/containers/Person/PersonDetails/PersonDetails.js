import React, { Component } from "react";
import { Container, Image, Grid, Card } from "semantic-ui-react";
import Slider from "react-slick";
import axios from "axios";
import NoImage from "../../../assets/NoImage.png";
import ReadMoreAndLess from "react-read-more-less";

/*

TASK: FIX THE KNOWN FOR SECTION
TASK: ADD KNOWN CREDITS NUMBER
TASK: ADD KNOWN AS DATA

*/

class PersonDetails extends Component {
  state = {
    birthday: null,
    knownForDepartment: null,
    deathDay: null,
    name: null,
    alsoKnownAs: null,
    gender: null,
    biography: null,
    placeOfBirth: null,
    profilePicture: null,
    knownCredits: null,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.props.match.params.id}?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          birthday: response.data.birthday,
          knownForDepartment: response.data.known_for_department,
          deathDay: response.data.deathday,
          name: response.data.name,
          alsoKnownAs: response.data.also_known_as,
          gender: response.data.gender,
          biography: response.data.biography,
          placeOfBirth: response.data.place_of_birth,
          profilePicture: response.data.profile_path
            ? `https://image.tmdb.org/t/p/w500` + response.data.profile_path
            : NoImage,
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          knownCredits: response.data.cast,
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.props.match.params.id}/combined_credits?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          allCredits: response.data.cast.map((allCredit) => {
            return {
              key: allCredit.id,
              creditName: allCredit.original_title
                ? allCredit.original_title
                : allCredit.original_name,
              creditPicture: allCredit.poster_path
                ? `https://image.tmdb.org/t/p/w500` + allCredit.poster_path
                : NoImage,
            };
          }),
        });
      });
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.props.match.params.id}/images?api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          actorImages: response.data.profiles.map((actorImage) => {
            return {
              image: actorImage.file_path
                ? `https://image.tmdb.org/t/p/w500` + actorImage.file_path
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
    let genderMaleFemale = null;
    if (this.state.gender === 1) {
      genderMaleFemale = "Female";
    } else {
      genderMaleFemale = "Male";
    }
    return (
      <Container style={{ marginTop: "150px" }}>
        <Grid>
          <Grid.Row divided>
            <Grid.Column width={4}>
              <Image
                style={{ borderRadius: "30px" }}
                src={this.state.profilePicture}
              />
              <div style={{ marginTop: "30px" }}>
                <h2
                  style={{
                    fontWeight: "900",
                    fontSize: "1.3em",
                    marginBottom: "8px",
                  }}
                >
                  Personal Info
                </h2>
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.1em",
                  }}
                >
                  <strong style={{ display: "block" }}>Known for</strong>
                  {this.state.knownForDepartment}
                </p>
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.1em",
                  }}
                >
                  <strong style={{ display: "block" }}>Known Credits</strong>
                  To be updated
                </p>
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.1em",
                  }}
                >
                  <strong style={{ display: "block" }}>Gender</strong>
                  {genderMaleFemale}
                </p>
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.1em",
                  }}
                >
                  <strong style={{ display: "block" }}>Place of Birth</strong>
                  {this.state.placeOfBirth === null
                    ? "-"
                    : this.state.placeOfBirth}
                </p>
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.1em",
                  }}
                >
                  <strong style={{ display: "block" }}>Also Known As</strong>-
                </p>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <>
                <h1 style={{ fontSize: "2.2em" }}>
                  <strong>{this.state.name}</strong>
                </h1>
                <h3 style={{ marginTop: "30px" }}>Biography</h3>
                {this.state.biography ? (
                  <ReadMoreAndLess
                    ref={this.ReadMore}
                    className="read-more-content"
                    charLimit={250}
                    readMoreText="Read more"
                    readLessText="Read less"
                  >
                    {this.state.biography}
                  </ReadMoreAndLess>
                ) : (
                  `We don't have a biography for ${this.state.name}.`
                )}
                <h3 style={{ marginTop: "30px", marginBottom: "30px" }}>
                  Known For
                </h3>
                <Slider {...settings}>
                  {this.state.allCredits &&
                    this.state.allCredits.map((allCredit) => (
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
                            src={allCredit.creditPicture}
                          />
                          <h1 style={{ fontSize: "17px", textAlign: "center" }}>
                            {allCredit.creditName}
                          </h1>
                        </div>
                      </div>
                    ))}
                </Slider>
                <h3 style={{ marginTop: "30px", marginBottom: "30px" }}>
                  Images
                </h3>
                <Grid divided="vertically">
                  <Grid.Row>
                    {this.state.actorImages &&
                      this.state.actorImages.map((actorImage) => (
                        <Grid.Column width={4}>
                          <Card>
                            <Image style={{}} src={actorImage.image} />
                          </Card>
                        </Grid.Column>
                      ))}
                  </Grid.Row>
                </Grid>
              </>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default PersonDetails;
