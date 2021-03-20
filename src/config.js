export default {
  API_ENDPOINT:
    process.env.NODE_ENV === "production"
      ? "https://thawing-savannah-14597.herokuapp.com/api"
      : "http://localhost:8000/api",
  TOKEN_KEY: "trello-clone-auth-token",
};
