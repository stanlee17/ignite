const initialState = {
  game: { platforms: [] },
  screenshots: { results: [] },
  isLoading: true,
}

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GAME_DETAILS':
      return {
        ...state,
        game: action.payload.game,
        screenshots: action.payload.screenshots,
        isLoading: false,
      }
    case 'LOADING_DETAILS':
      return {
        ...state,
        isLoading: true,
      }
    default:
      return { ...state }
  }
}

export default detailsReducer
