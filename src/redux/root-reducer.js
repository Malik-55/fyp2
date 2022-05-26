import { combineReducers } from "redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import userReducer from "./user/user.reducer"
import loaderReducer from "./loader/loader.reducer"
import parkingReducer from "./parking/parking.reducer"
import bookingReducer from "./booking/booking.reducer"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  parking: parkingReducer,
  booking: bookingReducer
})

export default persistReducer(persistConfig, rootReducer)
