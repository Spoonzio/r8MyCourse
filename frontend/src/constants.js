export const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
export const baseUrl = isDevelopment
  ? process.env.REACT_APP_API_URL
  : process.env.REACT_APP_API_URL_PRODUCTION;