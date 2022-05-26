
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookingSpecOwner } from '../../../redux/booking/booking.action';


export const BookingStats = ({ navigation }) => {
    const dispatch = useDispatch()
    const allBookings = useSelector(state => state.booking.allBookings)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [pending, setPending] = useState(0)
    const [accepted, setAccepted] = useState(0)
    const [completed, setCompleted] = useState(0)


    useEffect(() => {
        dispatch(getAllBookingSpecOwner(token))
        return () => {
        }
    }, [])
    
    useEffect(() => {
        setStats()
        return () => {
        }
    }, [allBookings])


    const setStats = () => {
        let tempPending = 0;
        let tempOngoing = 0;
        let tempCompleted = 0;
        allBookings.map((item, index) => {
            if (item.data.status == "Pending") {
                tempPending = tempPending + 1
            }
            if (item.data.status == "Ongoing") {
                tempOngoing = tempOngoing + 1
            }
            if (item.data.status == "Completed") {
                tempCompleted = tempCompleted + 1
            }
        });
        setPending(tempPending);
        setAccepted(tempOngoing);
        setCompleted(tempCompleted)
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
                <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: CUSTOMWIDTH(4), color: '#2B3F54' }} >Pending</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: CUSTOMWIDTH(5.5) }} >{pending}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: CUSTOMWIDTH(4), color: '#2B3F54' }} >Ongoing</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: CUSTOMWIDTH(5.5) }} >{accepted}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: CUSTOMWIDTH(4), color: '#2B3F54' }} >Completed</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: CUSTOMWIDTH(5.5) }} >{completed}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', }} >Bookings({allBookings.length})</Text>
                    {
                        allBookings.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("BookingDetail", { detail: item })} style={{ width: '100%', height: 100, backgroundColor: '#efcd39', marginTop: 12, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image source={{ uri: item.data.image }} style={{ width: 100, height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginRight: 5 }} resizeMode="contain" />
                                    <View style={{ width: '68%', height: 100, marginRight: 6, justifyContent: 'center' }}>
                                        <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), fontWeight: 'bold', color: '#2B3F54' }} >{item.data.vehicleNo}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <Image source={ICONS.profileI} style={{ width: 15, height: 15 }} />
                                            <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(3.5), color: '#2B3F54', }}> {item.data.userDetail.fullName}</Text>
                                        </View>
                                        <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(4), color: '#000000', fontWeight: 'bold', marginTop: 7 }}>${item.data.parking.detail.rate}/hour</Text>
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