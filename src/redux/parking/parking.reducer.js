import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  specificUserParkings: [],
  allParkings: [],
  error: {},
  response: {}
}

const parkingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_SPEC_PARKING:
      return {
        ...state,
        specificUserParkings: action.payload
      }
    case ActionsType.SET_ALL_PARKING:
      return {
        ...state,
        allParkings: action.payload
      }
    case ActionsType.API_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ActionsType.API_SUCCESS:
      return {
        ...state,
        response: action.payload
      }
    default:
      return state
  }
}

export default parkingReducer;
