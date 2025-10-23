import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; 

const safeGet = async (url) => {
  try {
    const res = await axios.get(url, { timeout: 10000 });
    return res.data;
  } catch (err) {
    console.error('API error:', url, err.message || err);
    return []; 
  }
};

export const getMatchesPerYear = async () => safeGet(`${BASE_URL}/matches_per_year/`);
export const getTeamWins = async () => safeGet(`${BASE_URL}/matches_won_all_teams/`);
export const getExtraRuns = async (year) => safeGet(`${BASE_URL}/extra_runs/${year}/`);
export const getTopEconomicalBowlers = async (year) => safeGet(`${BASE_URL}/top_economical_bowlers/${year}/`);
export const getMatchesVsWins = async (year) => safeGet(`${BASE_URL}/matches_played_won/${year}/`);
