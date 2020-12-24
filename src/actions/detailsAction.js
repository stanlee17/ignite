import axios from 'axios'
import { gameDetailsURL, gameScreenshotURL } from '../api'

export const loadGameDetails = (id) => async (dispatch) => {
  dispatch({
    type: 'LOADING_DETAILS',
  })

  const gameDetailsData = await axios.get(gameDetailsURL(id))
  const screenshotData = await axios.get(gameScreenshotURL(id))

  dispatch({
    type: 'GET_GAME_DETAILS',
    payload: {
      game: gameDetailsData.data,
      screenshots: screenshotData.data,
    },
  })
}
