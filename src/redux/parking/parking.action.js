import ActionsType from "../utils/actions.type"
import firestore from '@react-native-firebase/firestore';
const parking_ref = firestore().collection('parkings');


export const setSpecUserPakings = (value) => ({
  type: ActionsType.SET_SPEC_PARKING,
  payload: value
});
export const setAllParkings = (value) => ({
  type: ActionsType.SET_ALL_PARKING,
  payload: value
});

export const getSpecUserParkings = (userId) => {
  return dispatch => {
    parking_ref
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setSpecUserPakings(localArray))
      })
  }
}

export const getAllParkings = () => {
  return dispatch => {
    parking_ref.get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setAllParkings(localArray))
      })
  }
}













