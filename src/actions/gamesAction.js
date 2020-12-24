import axios from 'axios'
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
} from '../api'

export const loadGames = () => async (dispatch) => {
  const popularGamesData = await axios.get(popularGamesURL())
  const newGamesData = await axios.get(newGamesURL())
  const upcomingGamesData = await axios.get(upcomingGamesURL())

  dispatch({
    type: 'FETCH_GAMES',
    payload: {
      popular: popularGamesData.data.results,
      newGames: newGamesData.data.results,
      upcoming: upcomingGamesData.data.results,
    },
  })
}

export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchGameURL(game_name))

  dispatch({
    type: 'FETCH_SEARCHED',
    payload: {
      searched: searchGames.data.results,
    },
  })
}
