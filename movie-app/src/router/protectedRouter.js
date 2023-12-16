import FavoriteMoviesPage from "../pages/favoriteMoviesPage";

const protectedRouter = [
  {
    path: "/favorites",
    component: FavoriteMoviesPage,
  },
];

export default protectedRouter;
