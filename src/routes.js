import React from "react";
const SearchResults = React.lazy(() =>
  import("./containers/SearchResults/SearchResults")
);
const Person = React.lazy(() => import("./containers/Person/Person"));
const PersonDetails = React.lazy(() =>
  import("./containers/Person/PersonDetails/PersonDetails")
);
import DsicoverMovies from "./containers/Movies/DiscoverMovies/DiscoverMovies";
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

const routes = [
  {
    path: "/home",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/searh/:id",
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
];
