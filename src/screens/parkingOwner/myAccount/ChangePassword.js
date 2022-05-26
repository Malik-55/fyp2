import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { CUSTOMWIDTH } from '../../../constant/layout';
import { ICONS } from '../../../constant/icons';



export const ChangePassword = ({navigation}) => {
    const [loader, setLoader] = useState(false)
    const [old, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const changePassword = () => {
        if (old == '') {
            alert('old password field should not be blank');
        } else if (newPass == '') {
            alert('New password field should not be blank');
        } else {
            setLoader(true)
            reauthenticate(old).then(() => {
                var user = auth().currentUser;;
                user.updatePassword(newPass).then((res) => {
                    setOldPass('');
                    setNewPass('');
                    setLoader(false)
                    alert('Password changed successfully');
                }).catch((error) => { alert(error) });
            }).catch((error) => { alert(error) });
        }
    }

    const reauthenticate = () => {
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(user.email, old);
        return user.reauthenticateWithCredential(cred);
    }




    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#2B3F54' }} >
            <View style={{ width: '100%', height: 60, alignItems: 'center', }} >
                <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(5), fontWeight: 'bold' }} >Change Password</Text>
                    <View />
                </View>
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginVertical: 30 }}>
                <TextInput
                    style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                    placeholder="Old Password"
                    onChangeText={(value) => setOldPass(value)}
                    value={old}
                />
                <TextInput
                    style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                    placeholder="New Password"
                    onChangeText={(value) => setNewPass(value)}
                    value={newPass}
                />
                {
                    loader
                        ?
                        <View style={{ width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }} >
                            <ActivityIndicator color={"#efcd39"} size="small" />
                        </View>
                        :
                        <TouchableOpacity onPress={changePassword} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 20 }} >
                            <Text style={{ color: '#454136', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Change</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

})