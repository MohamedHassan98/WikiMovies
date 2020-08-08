import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toggle } from "react-toggle-component";
import { Container, Image, Form, Button } from "semantic-ui-react";
import axios from "axios";
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
            name: popular.original_name,
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
            name: topRated.original_name,
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

  clickPopularToggle = (e) => {
    const { popularToggle } = this.state;
    this.setState({ popularToggle: e.target.checked });
    if (popularToggle === false) {
      this.getPopularTV();
    }
    if (popularToggle === true) {
      this.getPopularMovies();
    }
  };
  clickTopRatedToggle = (e) => {
    const { topRatedToggle } = this.state;
    this.setState({ topRatedToggle: e.target.checked });
    if (topRatedToggle === false) {
      this.getTopTV();
    }
    if (topRatedToggle === true) {
      this.getTopMovies();
    }
  };

  render() {
    const { popularToggle, populars, topRateds } = this.state;
    const settings = {
      initialSlide: 0,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
    let hrefImage = null;
    if (popularToggle === false) {
      hrefImage = "/moviedetails/";
    }
    if (popularToggle === true) {
      hrefImage = "/tvshowdetails/";
    }
    return (
      <Container className="HomeContainerStyle">
        <section className="HomeSearchImageWrapper">
          <div className="HomeSearchContentWrapper">
            <h1 className="HomeHeaderWelcome">Welcome</h1>
            <h3 className="HomeSecondHeader">
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
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
                  disabled={!this.state.searchName}
                >
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </div>
        </section>
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
        <Slider {...settings}>
          {populars &&
            populars.map((popular) => (
              <div>
                <a href={`${hrefImage}${popular.key}`}>
                  <div className="SliderDiv">
                    <Image className="SliderImage" src={popular.image} />
                    <h1 className="SliderHeader">{popular.name}</h1>
                    <p>{popular.releaseDate}</p>
                  </div>
                </a>
              </div>
            ))}
        </Slider>
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
        <Slider {...settings}>
          {topRateds &&
            topRateds.map((topRated) => (
              <div>
                <a href={`${hrefImage}${topRated.key}`}>
                  <div className="SliderDiv">
                    <Image className="SliderImage" src={topRated.image} />
                    <h1 className="SliderHeader">{topRated.name}</h1>
                    <p>{topRated.releaseDate}</p>
                  </div>
                </a>
              </div>
            ))}
        </Slider>
      </Container>
    );
  }
}

export default Home;
