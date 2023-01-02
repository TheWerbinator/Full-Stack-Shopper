export const API_URL = `https://api.chec.io/v1`;

const KEY = import.meta.env.VITE_COMMERCE_API_KEY;

export const OPTIONS = {
  headers: {
    "X-Authorization": KEY,
  },
};