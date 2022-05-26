import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { useSelector, useDispatch } from 'react-redux';
import { getSpecUserParkings } from '../../../redux/parking/parking.action';
import { getAllBookingSpecOwner, getAllPayments } from '../../../redux/booking/booking.action';


export const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch()
    const parkingList = useSelector(state => state.parking.specificUserParkings)
    const allBookings = useSelector(state => state.booking.allBookings)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const payments = useSelector(state => state.booking.payments);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        dispatch(getSpecUserParkings(token))
        dispatch(getAllBookingSpecOwner(token))
        dispatch(getAllPayments(token))
        return () => {
        }
    }, [])

    useEffect(() => {
        calculateTotal()
        return () => {
        }
    }, [payments])

    const calculateTotal = () => {
        let tempAmount = 0
        payments.map((item, index) => {
            tempAmount = tempAmount + item.data.ammount
        })
        setTotal(tempAmount)
    }


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
            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
                <View style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Image source={ICONS.parkingIcon} style={{ width: 35, height: 35, marginBottom: 12 }} resizeMode="contain" />
                    <Text style={{ fontSize: CUSTOMWIDTH(3), color: '#2B3F54' }} >Parkings: <Text style={{ fontWeight: 'bold', fontSize: CUSTOMWIDTH(4) }} >{parkingList.length}</Text></Text>
                </View>
                <View style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Image source={ICONS.bookingI} style={{ width: 35, height: 35, marginBottom: 12 }} resizeMode="contain" />
                    <Text style={{ fontSize: CUSTOMWIDTH(3), color: '#2B3F54' }} >Bookings: <Text style={{ fontWeight: 'bold', fontSize: CUSTOMWIDTH(4) }} >{allBookings.length}</Text></Text>
                </View>
                <View style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Image source={ICONS.paymentI} style={{ width: 35, height: 35, marginBottom: 12 }} resizeMode="contain" />
                    <Text style={{ fontSize: CUSTOMWIDTH(3), color: '#2B3F54' }} >Payments: <Text style={{ fontWeight: 'bold', fontSize: CUSTOMWIDTH(4) }} >${total}</Text></Text>
                </View>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', }} >Parkings({parkingList.length})</Text>
                    {
                        parkingList.map((item, index) => {
                            return (<TouchableOpacity key={index} onPress={() => navigation.navigate("ParkingDetail", { detail: item.data, id: item.id })} style={{ width: '100%', height: 100, backgroundColor: '#efcd39', marginTop: 12, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image source={{ uri: item.data.image }} style={{ width: 100, height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
                                <View style={{ width: '68%', height: 100, marginRight: 6, justifyContent: 'center', marginLeft: 5 }}>
                                    <Text numberOfLines={1} style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), fontWeight: 'bold', color: '#2B3F54' }} >{item.data.parkingName}</Text>
                                    <Text numberOfLines={2} style={{ width: '90%', fontSize: CUSTOMWIDTH(3.5), color: '#2B3F54', opacity: 0.5 }}>{item.data.location.longName}</Text>
                                    <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), color: '#000000', fontWeight: 'bold', marginTop: 7 }}>${item.data.rate}/hour</Text>
                                </View>
                            </TouchableOpacity>
                            )
                        }
                        )
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