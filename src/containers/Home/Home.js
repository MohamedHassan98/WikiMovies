import React, { Component } from "react";
import { Toggle } from "react-toggle-component";
import { Container, Form, Button } from "semantic-ui-react";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import "./Home.css";

class Home extends Component {
  state = {
    searchName: "",
    popularToggle: false,
    topRatedToggle: false,
    defaultPage: 1,
  };

  getPopularMovies = () => {
    const { defaultPage } = this.state;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/popular?language=en-US&api_key=${process.env.REACT_APP_API_KEY}&page=${defaultPage}`
      )
      .then((response) => {
        this.setState({
          populars: response.data.results.map((popular) => ({
            key: popular.id,
            name: popular.title,
            releaseDate: popular.release_date,
            image: `${process.env.REACT_APP_BASE_IMAGE_URL}/${popular.poster_path}`,
          })),
        });
      });
  };
  getTopMovies = () => {
    const { defaultPage } = this.state;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/top_rated?language=en-US&page=${defaultPage}&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          topRateds: response.data.results.map((topRated) => ({
            key: topRated.id,
            name: topRated.title,
            releaseDate: topRated.release_date,
            image: `${process.env.REACT_APP_BASE_IMAGE_URL}/${topRated.poster_path}`,
          })),
        });
      });
  };
  getPopularTV = () => {
    const { defaultPage } = this.state;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${defaultPage}`
      )
      .then((response) => {
        this.setState({
          populars: response.data.results.map((popular) => ({
            key: popular.id,
            name: popular.name,
            releaseDate: popular.first_air_date,
            image: `${process.env.REACT_APP_BASE_IMAGE_URL}/${popular.poster_path}`,
          })),
        });
      });
  };
  getTopTV = () => {
    const { defaultPage } = this.state;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tv/top_rated?language=en-US&page=${defaultPage}&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          topRateds: response.data.results.map((topRated) => ({
            key: topRated.id,
            name: topRated.name,
            releaseDate: topRated.first_air_date,
            image: `${process.env.REACT_APP_BASE_IMAGE_URL}/${topRated.poster_path}`,
          })),
        });
      });
  };

  componentDidMount() {
    this.getPopularMovies();
    this.getTopMovies();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = this.state.searchName;
    this.props.history.push(`/search/${newSearch}`);
  };
  handleChange = (event) => {
    this.setState({ searchName: event.target.value });
  };

  clickPopularToggle = (event) => {
    const { popularToggle } = this.state;
    this.setState({ popularToggle: event.target.checked });
    if (popularToggle === false) {
      this.getPopularTV();
    }
    if (popularToggle === true) {
      this.getPopularMovies();
    }
  };
  clickTopRatedToggle = (event) => {
    const { topRatedToggle } = this.state;
    this.setState({ topRatedToggle: event.target.checked });
    if (topRatedToggle === false) {
      this.getTopTV();
    }
    if (topRatedToggle === true) {
      this.getTopMovies();
    }
  };

  render() {
    const { popularToggle, populars, topRateds, topRatedToggle, searchName } =
      this.state;
    let hrefImagePopular = null;
    if (popularToggle === false) {
      hrefImagePopular = "/moviedetails/";
    }
    if (popularToggle === true) {
      hrefImagePopular = "/tvshowdetails/";
    }
    let hrefImageTopRated = null;
    if (topRatedToggle === false) {
      hrefImageTopRated = "/moviedetails/";
    }
    if (topRatedToggle === true) {
      hrefImageTopRated = "/tvshowdetails/";
    }
    return (
      <Container className="HomeContainerStyle">
        <section className="HomeSearchImageWrapper">
          <div className="HomeSearchContentWrapper">
            <h1 className="HomeHeaderWelcome">Welcome</h1>
            <h2 className="HomeSecondHeader">
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>
            <Form className="HomeFormStyle" onSubmit={this.handleSubmit}>
              <Form.Field>
                <input
                  className="HomeInputStyle"
                  placeholder="Search for a movie, tv show, person..."
                  name="searchName"
                  onChange={this.handleChange}
                />
                <Button
                  className="HomeInputButton"
                  type="submit"
                  disabled={!searchName}
                >
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </div>
        </section>
        <section className="HomeContentWrapper">
          <h2 className="HomeHeaderStyle"> What's Popular </h2>
          <h3 className="HomeToggleHeader">
            Movies
            <Toggle
              leftBackgroundColor="#3A539B"
              rightBackgroundColor="#5C97BF"
              borderColor="black"
              knobColor="white"
              name="toggle-1"
              onToggle={(e) => this.clickPopularToggle(e)}
            />
            TV
          </h3>
          <Slider mainDatas={populars} hrefMainUrl={hrefImagePopular} />
          <h2 className="HomeHeaderStyle"> What's Top Rated </h2>
          <h3 className="HomeToggleHeader">
            Movies
            <Toggle
              leftBackgroundColor="#3A539B"
              rightBackgroundColor="#5C97BF"
              borderColor="black"
              knobColor="white"
              name="toggle-2"
              onToggle={(e) => this.clickTopRatedToggle(e)}
            />
            TV
          </h3>
          <Slider mainDatas={topRateds} hrefMainUrl={hrefImageTopRated} />
        </section>
      </Container>
    );
  }
}

export default Home;
