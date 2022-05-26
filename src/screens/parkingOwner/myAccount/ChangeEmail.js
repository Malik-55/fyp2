import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'
import React, { useState, } from 'react'
import auth from '@react-native-firebase/auth';
import { CUSTOMWIDTH } from '../../../constant/layout';
import { ICONS } from '../../../constant/icons';
import firestore from '@react-native-firebase/firestore';
const users_ref = firestore().collection('users');
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/user/user.action';


export const ChangeEmail = ({ navigation }) => {
    const dispatch = useDispatch()
    const loggedId = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const changeEmail = () => {
        setLoader(true)
        reauthenticate().then(() => {
            var user = auth().currentUser;;
            user.updateEmail(email).then((res) => {
                updateEmailData();
                alert('Email changed successfully');
            }).catch((error) => { alert(error) });
        }).catch((error) => { alert(error) });
    }

    const updateEmailData = async () => {
        users_ref.doc(loggedId)
            .update({
                email: email,
            })
            .then(() => {
                dispatch(setCurrentUser({
                    avatar: currentUser.avatar,
                    email: email,
                    fullName: currentUser.fullName,
                    user: currentUser.user
                }))
                setEmail('')
                setPassword('')
                setLoader(false)
            }).catch(e => {
                setLoader(false)
            })
    }

    const reauthenticate = () => {
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }





    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#2B3F54' }} >
            <View style={{ width: '100%', height: 60, alignItems: 'center', }} >
                <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(5), fontWeight: 'bold' }} >Change Email</Text>
                    <View />
                </View>
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginVertical: 30 }}>
                <TextInput
                    style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                />
                <TextInput
                    style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                    placeholder="Password"
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                />
                {
                    loader
                        ?
                        <View style={{ width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }} >
                            <ActivityIndicator color={"#efcd39"} size="small" />
                        </View>
                        :
                        <TouchableOpacity onPress={changeEmail} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 20 }} >
                            <Text style={{ color: '#454136', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Change</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

})