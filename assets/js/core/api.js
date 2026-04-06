import { BASE_URL, FIELDS } from "../utils/config.js";

async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Xəta:', error);
    return null;
  }
}

export async function fetchCountries() {
  return await fetchData(`${BASE_URL}/all?fields=${FIELDS}`);
}


export async function fetchCountryByCode(code) {
  const data = await fetchData(`${BASE_URL}/alpha/${code}`);
  return data?.[0];
}

export async function fetchNeighbors(codes) {
  return await fetchData(`${BASE_URL}/alpha?codes=${codes.join(',')}`);
}