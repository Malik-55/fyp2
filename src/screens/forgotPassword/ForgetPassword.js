import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { ICONS } from '../../constant/icons'
import { CUSTOMWIDTH } from '../../constant/layout'
import styles from './styles'

export const ForgetPassword = (props) => {
    const [email, setEmail] = useState('')

    const buttonClicked = () => {
        if (email == '') {
            alert("Please enter your email")
        } else {
            setEmail('')
            alert("Please visit your email to reset password")
        }
    }

    const {
        container, headerStyle, backBtn, btnLabelStyle, logoStyle, infoStyle,
        headingText, box,
    } = styles

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} >
            <View style={container}>
                <View style={headerStyle}>
                    <TouchableOpacity style={backBtn} onPress={() => props.navigation.goBack()} >
                        <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
                        <Text style={btnLabelStyle} >  Back</Text>
                    </TouchableOpacity>
                </View>
                <Image source={ICONS.pinkyLogo} style={logoStyle} />
                <View style={box} />
                <View style={box} />
                <Text style={headingText} >Forgot Password?</Text>
                <Text style={infoStyle} >Don't worry! it happens. Please enter the email address associated with your account. We will send you an email with instructions to reset your password.</Text>

                <View style={box} />
                <View style={box} />
                <TextInput
                    style={{ width: '90%', height: 45, backgroundColor: '#efcd39', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                />
                <View style={box} />
                <TouchableOpacity onPress={buttonClicked} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                    <Text style={{ color: '#454136', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Send Instructions</Text>
                </TouchableOpacity>
                <View style={box} />
            </View>
        </ScrollView>
    )
}



