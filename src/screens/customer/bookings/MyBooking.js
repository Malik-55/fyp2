
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookingSpecPerson } from '../../../redux/booking/booking.action';


export const MyBooking = ({ navigation }) => {
    const dispatch = useDispatch()
    const allBookings = useSelector(state => state.booking.allBookings)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)

    useEffect(() => {
        dispatch(getAllBookingSpecPerson(token))
        return () => {
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuRow}>
                    <Image source={currentUser.avatar == "null" ? ICONS.profileA : { uri: currentUser.avatar }} style={{ width: 45, height: 45, borderRadius: 25 }} />
                    <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")} style={styles.menuBtn} >
                        <Image source={ICONS.menu} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', }} >Bookings({allBookings.length})</Text>
                    {
                        allBookings.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("BookingDetailC", { detail: item })} style={{ width: '100%', height: 108, backgroundColor: '#efcd39', marginTop: 12, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image source={{ uri: item.data.image }} style={{ width: 100, height: 108, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginRight: 5 }} resizeMode="contain" />
                                    <View style={{ width: '68%', height: 100, marginRight: 6, justifyContent: 'center' }}>
                                        <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), fontWeight: 'bold', color: '#2B3F54' }} >{item.data.vehicleNo}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <Text numberOfLines={1} style={{ width: '90%', fontSize: CUSTOMWIDTH(3.5), color: '#2B3F54', fontWeight: '700' }}>{item.data.parking.detail.parkingName}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }} >
                                            <Image source={ICONS.locationGrey} style={{ width: 15, height: 15, marginTop: 4 }} resizeMode="contain" />
                                            <Text numberOfLines={2} style={{ width: '90%', fontSize: CUSTOMWIDTH(3.5), color: '#2B3F54', marginLeft: 3 }}>{item.data.parking.detail.location.longName}</Text>
                                        </View>
                                        <View style={{width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                            <Text style={{  fontSize: CUSTOMWIDTH(4), color: '#000000', fontWeight: 'bold', marginTop: 7 }}>${item.data.parking.detail.rate}/hour</Text>
                                            <View style={{ width: 50, height: 18, backgroundColor:'#2B3F54', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                                                <Text style={{fontSize:8, color:'#FFFFFF'}} >{item.data.status}</Text>
                                            </View>
                                        </View>
                                        
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }


                </View>
            </ScrollView>
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
    menuBtn: {
        width: 45,
        height: 45,
        backgroundColor: '#efcd39',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})