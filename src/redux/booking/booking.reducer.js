import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  paymentList: [],
  bookingList: [],
  payments: [],
  specificUserBookings: [],
  allBookings: [],
  pending: [],
  accepted: [],
  completed: [],
  error: {},
  response: {}
}

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_ALL_PAYMENTS:
      return {
        ...state,
        paymentList: action.payload
      }
    case ActionsType.SET_BOOKING_LIST:
      return {
        ...state,
        bookingList: action.payload
      }
    case ActionsType.SET_PAYMENTS:
      return {
        ...state,
        payments: action.payload
      }
    case ActionsType.SET_COMPLETED:
      return {
        ...state,
        completed: action.payload
      }
    case ActionsType.SET_ACCEPTED:
      return {
        ...state,
        accepted: action.payload
      }
    case ActionsType.SET_PEDNING:
      return {
        ...state,
        pending: action.payload
      }
    case ActionsType.SET_SPEC_BOOKING:
      return {
        ...state,
        specificUserBookings: action.payload
      }
    case ActionsType.SET_ALL_BOOKING:
      return {
        ...state,
        allBookings: action.payload
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

export default bookingReducer;
