export const fetchData = (endpoint) => {
  return fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchPageData = (endpoint, page) => {
  return fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
