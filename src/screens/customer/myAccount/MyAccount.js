import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { RowItem } from '../../../components/rowItem'
import { useSelector } from 'react-redux';

let itemList = [
    "Edit Profile",
    "Change Password",
    "Change Email",
    "Log Out"
]
let itemListSecond = [
    "Bookings",
]
export const MyAccount = ({ navigation }) => {
    const currentUser = useSelector(state => state.user.currentUser)

    const itemClick = (item) => {
        if (item == "Edit Profile") {
            navigation.navigate("EditProfile")
        }
        if (item == "Change Password") {
            navigation.navigate("ChangePassword")
        }
        if (item == "Change Email") {
            navigation.navigate("ChangeEmail")
        }
        if (item == "Bookings") {
            navigation.navigate("My Bookings")
        }
        if (item == "Log Out") {
            navigation.navigate("Login")
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuRow}>
                    <View />
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }} >My Account</Text>
                    <View />
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginVertical: 25 }}>
                    <Image source={currentUser.avatar == "null" ? ICONS.profileA : { uri: currentUser.avatar }} style={{ width: CUSTOMWIDTH(22), height: CUSTOMWIDTH(22), borderRadius: CUSTOMWIDTH(11) }} />
                    <View style={{ marginHorizontal: 10 }} >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }} >{currentUser.fullName}</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 13, opacity: 0.8, marginTop: 5 }}>{currentUser.email}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', backgroundColor: '#FFFFFF', marginVertical: 13 }}>
                    {
                        itemList.map((item, index) => {
                            return (
                                <RowItem key={index} label={item} onClick={() => { itemClick(item) }} />
                            )
                        })
                    }
                </View>
                <View style={{ width: '100%', backgroundColor: '#FFFFFF', }}>
                    {
                        itemListSecond.map((item, index) => {
                            return (
                                <RowItem key={index} label={item} onClick={() => itemClick(item)} />
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2B3F54'
    },
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})