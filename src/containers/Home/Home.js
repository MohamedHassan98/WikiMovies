import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toggle } from "react-toggle-component";
import { Container, Image, Form, Button } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Home.css";
import axios from "axios";

class Home extends Component {
  state = {
    searchName: "",
    popularMovies: [],
    popularToggle: false,
    topRatedToggle: false,
    disocverToggle: false,
  };

  getPopularMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=aa8a6567cb9ae791c14c0b267ac92c94&page=1`
      )
      .then((response) => {
        this.setState({
          populars: response.data.results.map((popular) => {
            return {
              key: popular.id,
              name: popular.title,
              releaseDate: popular.release_date,
              image: `https://image.tmdb.org/t/p/w500/` + popular.poster_path,
            };
          }),
        });
      });
  };
  getTopMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          topRateds: response.data.results.map((topRated) => {
            return {
              key: topRated.id,
              name: topRated.title,
              releaseDate: topRated.release_date,
              image: `https://image.tmdb.org/t/p/w500/` + topRated.poster_path,
            };
          }),
        });
      });
  };
  getPopularTV = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=aa8a6567cb9ae791c14c0b267ac92c94&language=en-US&page=1`
      )
      .then((response) => {
        this.setState({
          populars: response.data.results.map((popular) => {
            return {
              key: popular.id,
              name: popular.original_name,
              releaseDate: popular.first_air_date,
              image: `https://image.tmdb.org/t/p/w500/` + popular.poster_path,
            };
          }),
        });
      });
  };
  getTopTV = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=aa8a6567cb9ae791c14c0b267ac92c94`
      )
      .then((response) => {
        this.setState({
          topRateds: response.data.results.map((topRated) => {
            return {
              key: topRated.id,
              name: topRated.original_name,
              releaseDate: topRated.first_air_date,
              image: `https://image.tmdb.org/t/p/w500/` + topRated.poster_path,
            };
          }),
        });
      });
  };

  componentDidMount() {
    this.getPopularMovies();
    this.getTopMovies();
  }
  submitSearchHandler = (values) => {
    const newSearch = { search: values.searchName };
    this.props.history.push(`/search/${newSearch.search}`);
  };

  clickPopularToggle = (e) => {
    this.setState({ popularToggle: e.target.checked });
    if (this.state.popularToggle === false) {
      this.getPopularTV();
    }
    if (this.state.popularToggle === true) {
      this.getPopularMovies();
    }
  };
  clickTopRatedToggle = (e) => {
    this.setState({ topRatedToggle: e.target.checked });
    if (this.state.topRatedToggle === false) {
      this.getTopTV();
    }
    if (this.state.topRatedToggle === true) {
      this.getTopMovies();
    }
  };

  render() {
    const schema = Yup.object().shape({
      searchName: Yup.string().required(),
    });
    const settings = {
      initialSlide: 0,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
    let hrefImage = null;
    if (this.state.popularToggle === false) {
      hrefImage = "/moviedetails/";
    }
    if (this.state.popularToggle === true) {
      hrefImage = "/tvshowdetails/";
    }
    return (
      <Container style={{ marginTop: "59px" }}>
        <section className="HomeSearchImageWrapper">
          <div className="HomeSearchContentWrapper">
            <h1 className="HomeHeaderWelcome">Welcome.</h1>
            <h3 className="HomeSecondHeader">
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.submitSearchHandler(values)}
              initialValues={{
                searchName: "",
              }}
              render={({
                handleSubmit,
                handleChange,
                values,
                touched,
                isInvalid,
                handleBlur,
                errors,
              }) => (
                <Form
                  style={{ marginTop: "40px" }}
                  onSubmit={(event) => {
                    handleSubmit(values);
                  }}
                >
                  <Form.Field>
                    <input
                      className="HomeInputStyle"
                      placeholder="Search for a movie, tv show, person..."
                      name="searchName"
                      value={values.searchName}
                      onChange={handleChange}
                      isInvalid={!!errors.searchName && !!touched.searchName}
                      onBlur={handleBlur}
                    />
                    <Button className="HomeInputButton" type="submit">
                      Submit
                    </Button>
                  </Form.Field>
                </Form>
              )}
            />
          </div>
        </section>
        <h2 style={{ marginBottom: "30px" }}> What's Popular </h2>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
          }}
        >
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
          {this.state.populars &&
            this.state.populars.map((popular) => (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <a href={hrefImage + popular.key}>
                    <Image
                      style={{ width: "70%", borderRadius: "30px" }}
                      src={popular.image}
                    />
                  </a>
                  <h1 style={{ fontSize: "17px" }}>{popular.name}</h1>
                  <p>{popular.releaseDate}</p>
                </div>
              </div>
            ))}
        </Slider>
        <h2 style={{ marginBottom: "30px" }}> What's Top Rated </h2>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
          }}
        >
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
          {this.state.topRateds &&
            this.state.topRateds.map((topRated) => (
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
                    src={topRated.image}
                  />
                  <h1 style={{ fontSize: "17px", textAlign: "center" }}>
                    {topRated.name}
                  </h1>
                  <p>{topRated.releaseDate}</p>
                </div>
              </div>
            ))}
        </Slider>
      </Container>
    );
  }
}

export default Home;
