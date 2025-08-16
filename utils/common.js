import axios from "axios";

export const request = async ({ url, params = {} }) => {
  const options = {
    method: "GET",
    url: `https://imdb8.p.rapidapi.com/${url}`,
    params: {
      ...params,
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };

  const data = await axios.request(options);
  return data;
};

export const getIdFromKey = (str = "") => {
  if (!str) return "";
  // Если строка уже просто nconst
  if (/^nm\d+$/.test(str)) return str;

  // Если формат "/name/nm0000123/"
  const parts = str.split("/");
  return parts.find((p) => /^nm\d+$/.test(p)) || "";
};


export const convertDuration = (total) => {
  const minutes = total % 60;
  const hours = Math.floor(total / 60);

  return `${hours}h ${minutes}m`;
};

export const getRandom = (max) => Math.floor(Math.random() * max);