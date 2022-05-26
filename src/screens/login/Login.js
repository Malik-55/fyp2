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
import { CUSTOMHEIGHT, CUSTOMWIDTH } from '../../constant/layout'
import { ICONS } from '../../constant/icons'
import { userLogin } from '../../redux/user/user.action'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action'


export const Login = ({ navigation }) => {
    const loader = useSelector(state => state.loader.loader)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [email, setEmail] = useState('admin@admin.com')
    // const [password, setPassword] = useState('123456')
    // const [email, setEmail] = useState('customer@test.com')
    // const [password, setPassword] = useState('123456')


    const loginUser = () => {
        if (email === "") {
            alert('Email field should not be blank');
        } else if (password === "") {
            alert('Password field should not be blank');
        } else {
            dispatch(setLoader(true));
            if (email == "admin@admin.com" && password == '123456') {
                navigation.navigate("AdminBottomTab")
                dispatch(setLoader(false));
            } else {
                let data = {
                    email: email,
                    password: password
                };
                dispatch(userLogin(data, navigation));
            }
            clearData();
        }
    }
    const clearData = () => {
        setEmail('');
        setPassword('')
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
                        <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(6), color: '#454136', fontWeight: 'bold' }} >Login</Text>
                    </View>
                    <View style={styles.bottomSection}>
                        <TextInput
                            style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                            placeholder="Email"
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                        />
                        <TextInput
                            style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                            placeholder="Password"
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")} style={{ alignSelf: 'flex-end', paddingRight: '5%' }} >
                            <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Forgot Password?</Text>
                        </TouchableOpacity>
                        {
                            loader
                                ?
                                <View style={{ width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                                    <ActivityIndicator color={'#efcd39'} size="small" />
                                </View>
                                :
                                <TouchableOpacity onPress={loginUser} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                                    <Text style={{ color: '#454136', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Log In</Text>
                                </TouchableOpacity>
                        }
                        <View style={{ height: CUSTOMHEIGHT(15) }} />
                        <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(3.5), }} >Don't have an account? <Text onPress={() => { navigation.navigate("Signup") }} style={{ fontWeight: 'bold' }}> Create Account</Text></Text>
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