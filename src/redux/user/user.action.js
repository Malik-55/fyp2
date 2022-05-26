import ActionsType from "./../utils/actions.type"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setLoader } from "../loader/loader.action";
const user_ref = firestore().collection('users');

export const setAllManagers = (value) => ({
  type: ActionsType.SET_ALL_MANAGERS,
  payload: value
});

export const setPassword = (value) => ({
  type: ActionsType.SET_PASSWORD,
  payload: value
});

export const setCurrentUser = (user) => ({
  type: ActionsType.SET_CURRENT_USER,
  payload: user
});

export const setAuthToken = (token) => ({
  type: ActionsType.SET_TOKEN,
  payload: token
});

export const createAccount = (data, navigation) => {
  return dispatch => {
    const { email, password } = data
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("user is created successfully!");
        auth().signInWithEmailAndPassword(email, password)
          .then((res) => {
            console.log("User login successfully!")
            let id = res.user._user.uid;
            dispatch(setPassword(password))
            dispatch(setCurrentUser(data));
            dispatch(setAuthToken(id));
            dispatch(updateUserData(id, data, navigation));
          }).catch(error => {
            dispatch(setLoader(false))
            console.log("Login error: ", error)
          });
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is invalid!')
        }
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!')
        }
        alert(error.code);
        console.error(error);
        dispatch(setLoader(false))
      })
  }
}

export const updateUserData = (id, data, navigation) => {
  return dispatch => {
    const { fullName, email, avatar, user } = data
    user_ref.doc(id).set({
      fullName: fullName,
      email: email,
      avatar: avatar,
      user: user
    }).then((res) => {
      navigation.navigate("Login");
      dispatch(setLoader(false))
    }).catch(error => {
      console.error("error: ", error);
      dispatch(setLoader(false))
    })
  }
}

export const userLogin = (data, navigation) => {
  return dispatch => {
    const { email, password, } = data
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        user_ref.doc(res.user._user.uid).get().then(querySnapshot => {
          console.log("userLogin: ", querySnapshot)
          let tempData = querySnapshot.data()
          dispatch(setPassword(password))
          dispatch(setCurrentUser(querySnapshot.data()));
          dispatch(setAuthToken(querySnapshot.id));
          if (tempData.user == 'Parking Owner') {
            navigation.navigate("BottomTab");
          } else {
            navigation.navigate("CustomerBottomTab");
          }
          dispatch(setLoader(false))
        });
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        alert(error.code)
        console.error(error);
        dispatch(setLoader(false))
      });
  };
}

export const getAllManagers = () => {
  return dispatch => {
    user_ref
      .where('user', '==', "Parking Owner")
      .get()
      .then(querySnapshot => {
        let localArray = []
        querySnapshot.forEach(documentSnapshot => {
          localArray.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        dispatch(setAllManagers(localArray))
      })
  }
}











