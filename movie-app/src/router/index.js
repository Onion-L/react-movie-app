import { lazy } from "react";
const HomePage = lazy(() => import("../pages/homePage"));
const PersonPage = lazy(() => import("../pages/personPage"));
const SearchPage = lazy(() => import("../pages/searchPage"));
const FavoriteMoviesPage = lazy(() => import("../pages/favoriteMoviesPage"));
const UpcomingMoviesPage = lazy(() => import("../pages/upcomingMoviesPage"));
const TrendMoviesPage = lazy(() => import("../pages/trendMoviesPage"));
const AddMovieReviewPage = lazy(() => import("../pages/addMovieReviewPage"));
const MovieReviewPage = lazy(() => import("../pages/movieReviewPage"));
const MoviePage = lazy(() => import("../pages/movieDetailsPage"));
const PersonDetailPage = lazy(() => import("../pages/personDetailPage"));
const LoginPage = lazy(() => import("../pages/loginPage"));
const LatestMoviesPage = lazy(() => import("../pages/latestMoviesPage"));
const RegisterPage = lazy(() => import("../pages/registerPage"));

const routes = [
  {
    path: "/",
    component: HomePage,
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/people",
    component: PersonPage,
  },
  {
    path: "/people/:id",
    component: PersonDetailPage,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/movies/now-playing",
    component: LatestMoviesPage,
  },
  {
    path: "/favorites",
    component: FavoriteMoviesPage,
  },
  {
    path: "/movies/upcoming",
    component: UpcomingMoviesPage,
  },
  {
    path: "/movies/trend",
    component: TrendMoviesPage,
  },
  {
    path: "/reviews/form",
    component: AddMovieReviewPage,
  },
  {
    path: "/reviews/:id",
    component: MovieReviewPage,
  },
  {
    path: "/movies/:id",
    component: MoviePage,
  },
  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
