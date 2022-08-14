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
import "./App.css";
/*

TASK(Feature) : Add loader in every page
TASK (Feature) : Add to favourites for Movies & TV Shows details (Fix routing so that user can navigate the website without the need to login)

*/
const isAuth = () => localStorage.getItem("token");
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          <>
            <div id={"navbar"}>
              <Navbar />
            </div>
            <Component {...props} />
            <ScrollButton
              behavior={"smooth"}
              buttonBackgroundColor={"rgba(92, 151, 191, 0.73)"}
              iconType={"arrow-up"}
              style={{ fontSize: "14px" }}
              targetId={"navbar"}
            />
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
            }}
          />
        )
      }
    />
  );
};

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
        <Switch>
          <Route
            path="/"
            basename="/"
            exact
            render={(props) =>
              isAuth() ? (
                <Redirect to={{ pathname: "/home" }} />
              ) : (
                <Redirect to={{ pathname: "/signin" }} />
              )
            }
          />
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                private={route.private}
                render={(props) => {
                  return route.private === false ? (
                    <route.component {...props} />
                  ) : (
                    <PrivateRoute component={route.component} />
                  );
                }}
              />
            ) : null;
          })}
          <Route
            exact
            path="/signin"
            name="Sign In"
            render={() => (isAuth() ? <Redirect to="/" /> : <Signin />)}
          />
          <Route
            exact
            path="/signup"
            name="Sign Up"
            render={() => (isAuth() ? <Redirect to="/" /> : <Signup />)}
          />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
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
