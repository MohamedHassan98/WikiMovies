import React, { Component } from "react";
import ScrollButton from "react-scroll-button";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./containers/store/actions/index";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import Home from "./containers/Home/Home";
import Navbar from "./containers/Home/Navbar";
import SearchResults from "./containers/SearchResults/SearchResults";
import Person from "./containers/Person/Person";
import PersonDetails from "./containers/Person/PersonDetails/PersonDetails";
import PopularMovies from "./containers/Movies/PopularMovies/PopularMovies";
import NowPlayingMovies from "./containers/Movies/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "./containers/Movies/UpcomingMovies/UpcomingMovies";
import TopRatedMovies from "./containers/Movies/TopRatedMovies/TopRatedMovies";
import DiscoverTvShows from "./containers/TvShows/DiscoverTvShows/DiscoverTvShows";
import PopularTvShows from "./containers/TvShows/PopularTvShows/PopularTvShows";
import AiringTodayTvShows from "./containers/TvShows/AiringTodayTvShows/AiringTodayTvShows";
import OnTvTvShows from "./containers/TvShows/OnTvTvShows/OnTvTvShows";
import TopRatedTvShows from "./containers/TvShows/TopRatedTvShows/TopRatedTvShows";
import MovieDetails from "./containers/Movies/MovieDetails/MovieDetails";
import DiscoverMovies from "./containers/Movies/DiscoverMovies/DiscoverMovies";
import TvShowDetails from "./containers/TvShows/TvShowDetails/TvShowDetails";
import Page404 from "./containers/Page404/Page404";
import Favorites from "./containers/Favorites/Favorites";
import "./App.css";
/*

TASK(Feature) : Add loader in every page
TASK (Refactor) : Add Hooks as much as possible
TASK (Refactor) : Minimize the code as much as possible

*/
const isAuth = () => localStorage.getItem("token");
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    const routes = [
      {
        path: "/home",
        exact: true,
        name: "Home",
        component: Home,
      },
      {
        path: "/search/:id",
        exact: true,
        name: "Search Results",
        component: SearchResults,
      },
      {
        path: "/person",
        exact: true,
        name: "Person",
        component: Person,
      },
      {
        path: "/person/:id",
        exact: true,
        name: "Person Details",
        component: PersonDetails,
      },
      {
        path: "/movies",
        exact: true,
        name: "Discover Movies",
        component: DiscoverMovies,
      },
      {
        path: "/popularmovies",
        exact: true,

        name: "Popular Movies",
        component: PopularMovies,
      },
      {
        path: "/nowplayingmovies",
        exact: true,
        name: "Now Playing Movies",
        component: NowPlayingMovies,
      },
      {
        path: `/upcomingmovies`,
        exact: true,
        name: "Upcoming Movies",
        component: UpcomingMovies,
      },
      {
        path: "/topratedmovies",
        exact: true,
        name: "Top Rated Movies",
        component: TopRatedMovies,
      },
      {
        path: "/topratedmovies",
        exact: true,
        name: "Top Rated Movies",
        component: TopRatedMovies,
      },
      {
        path: "/moviedetails/:id",
        exact: true,
        name: "Movie Details",
        component: MovieDetails,
      },
      {
        path: "/tvshows",
        exact: true,
        name: "Discover Tv Shows",
        component: DiscoverTvShows,
      },
      {
        path: "/populartvshows",
        exact: true,
        name: "Popular Tv Shows",
        component: PopularTvShows,
      },
      {
        path: "/airingtodaytvshows",
        exact: true,
        name: "Airing Today Tv Shows",
        component: AiringTodayTvShows,
      },
      {
        path: "/ontheairtvshows",
        exact: true,
        name: "On The Air Tv Shows",
        component: OnTvTvShows,
      },
      {
        path: "/topratedtvshows",
        exact: true,
        name: "Top Rated Tv Shows",
        component: TopRatedTvShows,
      },
      {
        path: "/tvshowdetails/:id",
        exact: true,
        name: "Tv Show Details",
        component: TvShowDetails,
      },
      {
        path: "/page404",
        exact: true,
        name: "404 Page",
        component: Page404,
      },
    ];

    return (
      <div style={{ height: "100%" }}>
        <div id={"navbar"}>
          <Navbar />
        </div>
        <Switch>
          {routes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              exact={route.exact}
              name={route.name}
              component={route.component}
            />
          ))}
          {isAuth() ? (
            <Route path="/favorites" exact={true} component={Favorites} />
          ) : (
            <>
              <Route path="/signin" exact={true} component={Signin} />
              <Route path="/signup" exact={true} component={Signup} />
            </>
          )}
          <Route
            path="*"
            basename="/"
            exact
            render={() => <Redirect to={{ pathname: "/home" }} />}
          />
        </Switch>
        <ScrollButton
          behavior={"smooth"}
          buttonBackgroundColor={"rgba(92, 151, 191, 0.73)"}
          iconType={"arrow-up"}
          style={{ fontSize: "14px" }}
          targetId={"navbar"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
