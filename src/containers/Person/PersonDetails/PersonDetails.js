import React, { Component } from "react";
import { Container, Image, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import ReadMoreAndLess from "react-read-more-less";
import NoImage from "../../../assets/NoImage.png";
import Slider from "../../../components/Slider/Slider";
import "./PersonDetails.css";

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
        `${process.env.REACT_APP_BASE_URL}/person/${this.props.match.params.id}?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
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
            ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${response.data.profile_path}`
            : NoImage,
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/person/${this.props.match.params.id}/combined_credits?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          knownCredits: response.data.cast,
          allCredits: response.data.cast.map((allCredit) => ({
            key: allCredit.id,
            creditName: allCredit.title ? allCredit.title : allCredit.name,
            creditReleaseDate: allCredit.release_date
              ? allCredit.release_date
              : allCredit.first_air_date,
            creditUrl: allCredit.title ? "/moviedetails/" : "/tvshowdetails/",
            creditPicture: allCredit.poster_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${allCredit.poster_path}`
              : NoImage,
          })),
        });
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/person/${this.props.match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          actorImages: response.data.profiles.map((actorImage) => ({
            image: actorImage.file_path
              ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${actorImage.file_path}`
              : NoImage,
          })),
        });
      });
  }

  render() {
    const {
      gender,
      profilePicture,
      knownForDepartment,
      placeOfBirth,
      name,
      biography,
      allCredits,
      actorImages,
      knownCredits,
      alsoKnownAs,
    } = this.state;

    let genderMaleFemale = null;
    if (gender === 1) {
      genderMaleFemale = "Female";
    } else {
      genderMaleFemale = "Male";
    }
    return (
      <Container className="PersonDetailsContainer">
        <Grid>
          <Grid.Row divided>
            <Grid.Column width={4}>
              <Image
                className="PersonDetailsProfileImage"
                src={profilePicture}
              />
              <div className="PersonDetailsInfoDiv">
                <h2 className="PersonDetailsPersonalInfoHeader">
                  Personal Info
                </h2>
                <p className="PersonDetailsInfoP">
                  <strong className="PersonDetailsInfoStrong">Known for</strong>
                  {knownForDepartment}
                </p>
                <p className="PersonDetailsInfoP">
                  <strong className="PersonDetailsInfoStrong">
                    Known Credits
                  </strong>
                  {knownCredits && knownCredits.length}
                </p>
                <p className="PersonDetailsInfoP">
                  <strong className="PersonDetailsInfoStrong">Gender</strong>
                  {genderMaleFemale}
                </p>
                <p className="PersonDetailsInfoP">
                  <strong className="PersonDetailsInfoStrong">
                    Place of Birth
                  </strong>
                  {placeOfBirth === null ? "-" : placeOfBirth}
                </p>
                <p className="PersonDetailsInfoP">
                  <strong className="PersonDetailsInfoStrong">
                    Also Known As
                  </strong>
                  {alsoKnownAs ? (
                    alsoKnownAs.map(function (object, i) {
                      return <p>{object.toString().split(",")}</p>;
                    })
                  ) : (
                    <p>-</p>
                  )}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <>
                <h1 className="PersonDetailsName">
                  <strong>{name}</strong>
                </h1>
                <h3 className="PersonDetailsSubHeader">Biography</h3>
                {biography ? (
                  <ReadMoreAndLess
                    ref={this.ReadMore}
                    className="read-more-content"
                    charLimit={250}
                    readMoreText="Read more"
                    readLessText="Read less"
                  >
                    {biography}
                  </ReadMoreAndLess>
                ) : (
                  `We don't have a biography for ${name}.`
                )}
                <h3 className="PersonDetailsSubHeader">Known For</h3>
                <Slider mainDatas={allCredits} />
                <h3 className="PersonDetailsSubHeader">Images</h3>
                <Grid divided="vertically">
                  <Grid.Row>
                    {actorImages &&
                      actorImages.map((actorImage) => (
                        <Grid.Column width={4}>
                          <Card>
                            <Image src={actorImage.image} />
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
