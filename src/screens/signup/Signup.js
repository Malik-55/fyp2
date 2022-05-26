import {
    StyleSheet, Text, View,
    Image, TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'
import { createAccount, } from "../../redux/user/user.action";
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMHEIGHT, CUSTOMWIDTH } from '../../constant/layout'
import { ICONS } from '../../constant/icons'
import { CheckBox } from '../../components/checkboxBox'
import NativePicker from '../../components/nativePicker'
import { setLoader } from '../../redux/loader/loader.action';


const userType = ["Parking Owner", "Customer"]

export const Signup = ({ navigation }) => {
    const loader = useSelector(state => state.loader.loader)
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPassword, setConfirmPassword] = useState('')
    const [terms, setTerms] = useState(false);
    const [typeUser, setUserType] = useState(null);

    const getUserType = value => {
        setUserType(value);
    };

    const userSignup = () => {
        if (fullName === "") {
            alert('Name field should not be blank');
        } else if (email === "") {
            alert('Email field should not be blank');
        } else if (typeUser === null) {
            alert('Should select user type');
        } else if (password === "") {
            alert('Password field should not be blank');
        } else if (confrimPassword !== password) {
            alert('Confirm password field does not match');
        } else {
            dispatch(setLoader(true))
            let data = {
                fullName: fullName,
                email: email,
                password: password,
                avatar: "null",
                user: typeUser
            }
            dispatch(createAccount(data, navigation))
            clearData()
        }
    }

    const clearData = () => {
        setFullName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'height' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.topSection}>
                        <Image source={ICONS.car_logo} style={{ width: CUSTOMWIDTH(70), height: CUSTOMHEIGHT(25) }} />
                        <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(6), color: '#454136', fontWeight: 'bold' }} >Create Account</Text>
                    </View>
                    <View style={styles.bottomSection}>
                        <TextInput
                            style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                            placeholder="Full Name"
                            onChangeText={(value) => setFullName(value)}
                            value={fullName}
                        />
                        <TextInput
                            style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                            placeholder="Email"
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                        />
                        <NativePicker placeHolder="Select" data={userType} getValue={getUserType.bind(this)} size={"85%"} />
                        <TextInput
                            style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                            placeholder="Password"
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                            secureTextEntry
                        />
                        <TextInput
                            style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                            placeholder="Confirm Password"
                            onChangeText={(value) => setConfirmPassword(value)}
                            value={confrimPassword}
                            secureTextEntry
                        />
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => setTerms(!terms)}
                                style={{
                                    flexDirection: 'row',
                                    width: '50%',
                                    alignItems: 'center',
                                }}>
                                <View style={{ width: '5%', marginRight: 12 }}>
                                    <CheckBox value={terms} getValue={setTerms.bind(this)} />
                                </View>
                                <View style={{ width: '93%' }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }}>Terms & Conditions</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            loader
                                ?
                                <ActivityIndicator />
                                :
                                <TouchableOpacity onPress={userSignup} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                                    <Text style={{ color: '#454136', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Sign Up</Text>
                                </TouchableOpacity>
                        }
                        <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(3.5), }} >Already have an account? <Text onPress={() => { navigation.navigate("Login") }} style={{ fontWeight: 'bold' }}> Login</Text></Text>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#2d2d2d',
        alignItems: 'center'
    },
    topSection: {
        width: '100%',
        height: CUSTOMHEIGHT(35),
        backgroundColor: '#efcd39',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSection: {
        width: '100%',
        height: CUSTOMHEIGHT(75),
        paddingVertical: 20,
        alignItems: 'center',
    }
})