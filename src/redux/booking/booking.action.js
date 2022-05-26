import ActionsType from "../utils/actions.type"
import firestore from '@react-native-firebase/firestore';
const booking_ref = firestore().collection('bookings');
const payment_ref = firestore().collection('payments');

export const setPaymentList = (value) => ({
  type: ActionsType.SET_ALL_PAYMENTS,
  payload: value
});

export const setBookingList = (value) => ({
  type: ActionsType.SET_BOOKING_LIST,
  payload: value
});

export const setPayments = (value) => ({
  type: ActionsType.SET_PAYMENTS,
  payload: value
});

export const setSpecUserBookings = (value) => ({
  type: ActionsType.SET_SPEC_BOOKING,
  payload: value
});

export const setAllBookings = (value) => ({
  type: ActionsType.SET_ALL_BOOKING,
  payload: value
});

export const setPendings = (value) => ({
  type: ActionsType.SET_PEDNING,
  payload: value
});

export const setAccepted = (value) => ({
  type: ActionsType.SET_ACCEPTED,
  payload: value
});

export const setCompleted = (value) => ({
  type: ActionsType.SET_COMPLETED,
  payload: value
});

export const getSpecParkingBookings = (id) => {
  return dispatch => {
    booking_ref
      .where('parkingId', '==', id)
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setSpecUserBookings(localArray))
      })
  }
}

export const getAllBookingSpecPerson = (userId) => {
  return dispatch => {
    booking_ref
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setAllBookings(localArray))
      })
  }
}
export const getAllBookingSpecOwner = (userId) => {
  return dispatch => {
    booking_ref
      .where('managerId', '==', userId)
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setAllBookings(localArray))
      })
  }
}
export const getAllPayments = (userId) => {
  return dispatch => {
    payment_ref
      .where('managerId', '==', userId)
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setPayments(localArray))
      })
  }
}
export const getAllBookingList = (userId) => {
  return dispatch => {
    booking_ref
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setBookingList(localArray))
      }).catch(e => {
        console.log(e);
      })
  }
}

export const getPaymentList = () => {
  return dispatch => {
    payment_ref
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setPaymentList(localArray))
      })
  }
}













