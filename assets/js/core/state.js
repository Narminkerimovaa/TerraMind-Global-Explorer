import { storage } from "../utils/storage"

export const state = {
  countries: [],
  filtered: [],
  currentCountry:null,
  currentPage:1,
  currentRegion:'all',
  currentSort:'name',
  user:storage.get('user'),
  favorites:storage.get('favorites') ?? []
}