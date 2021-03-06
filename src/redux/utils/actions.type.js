const ActionsType = {
  // user
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_USER_DETAIL: "SET_USER_DETAIL",
  SET_TOKEN: "SET_TOKEN",
  SET_PASSWORD: 'SET_PASSWORD',
  SET_ALL_MANAGERS: 'SET_ALL_MANAGERS',

  //loader
  SET_LOADER: "SET_LOADER",

  //parking
  SET_SPEC_PARKING: 'SET_SPEC_PARKING',
  SET_ALL_PARKING: 'SET_ALL_PARKING',


  //booking
  SET_SPEC_BOOKING: 'SET_SPEC_BOOKING',
  SET_ALL_BOOKING: 'SET_ALL_BOOKING',
  SET_PEDNING: 'SET_PEDNING',
  SET_ACCEPTED: 'SET_ACCEPTED',
  SET_COMPLETED: 'SET_COMPLETED',
  SET_PAYMENTS: 'SET_PAYMENTS',
  SET_ALL_PAYMENTS: 'SET_ALL_PAYMENTS',
  SET_BOOKING_LIST: 'SET_BOOKING_LIST',

  //error wala section
  API_ERROR: "API_ERROR",
  API_SUCCESS: "API_SUCCESS"
}

export default ActionsType
