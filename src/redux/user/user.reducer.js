import ActionsType from "./../utils/actions.type"
const INITIAL_STATE = {
  allManagers: [],
  currentUser: null,
  token: null,
  password: null,
  userType: null,
  error: {},
  response: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionsType.SET_ALL_MANAGERS:
      return {
        ...state,
        allManagers: action.payload
      }
    case ActionsType.SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case ActionsType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case ActionsType.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case ActionsType.SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload
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

export default userReducer
