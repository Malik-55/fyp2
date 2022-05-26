import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { ParkingLocation } from '../../../components/parkingLocation'
import { getSpecParkingBookings } from '../../../redux/booking/booking.action'
import { useSelector, useDispatch } from 'react-redux';


export const ParkingDetail = ({ navigation, route }) => {
    const detail = route.params.detail;
    const id = route.params.id;
    const dispatch = useDispatch()
    const specificUserBookings = useSelector(state => state.booking.specificUserBookings)
    const [pending, setPending] = useState(0)
    const [ongoing, setOngoing] = useState(0)
    const [completed, setCompleted] = useState(0)

    useEffect(() => {
        dispatch(getSpecParkingBookings(id))
        return () => {
        }
    }, [])

    useEffect(() => {
        setStats()
        return () => {
        }
    }, [specificUserBookings])

    const setStats = () => {
        let tempPending = 0;
        let tempOngoing = 0;
        let tempCompleted = 0;
        specificUserBookings.map((item, index) => {
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
        setOngoing(tempOngoing);
        setCompleted(tempCompleted)
    }

    return (
        <ScrollView>
            <View style={styles.container} >
                <ImageBackground source={{ uri: detail.image }} style={{ width: '100%', height: 200 }} >
                    <View style={{ width: '100%', height: 60, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingHorizontal: '5%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image source={ICONS.backwhite} style={{ width: 12, height: 18 }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }} >Detail</Text>
                        <View />
                    </View>
                </ImageBackground>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
                    <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 12, color: '#2B3F54' }} >Pending</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{pending}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 12, color: '#2B3F54' }} >On Going</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{ongoing}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 12, color: '#2B3F54' }} >Completed</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{completed}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', marginVertical: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>{detail.parkingName}</Text>
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Floors: <Text style={{ fontWeight: 'bold' }} >{detail.floors}</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Capacity: <Text style={{ fontWeight: 'bold' }} >{detail.capacity}</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Rate: <Text style={{ fontWeight: 'bold' }} >${detail.rate}</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Timing: <Text style={{ fontWeight: 'bold' }} >09:00AM - 06:00PM</Text></Text>

                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', }}>
                        <Image source={ICONS.location} style={{ width: 14, height: 14 }} resizeMode="contain" />
                        <Text style={{ color: '#FFFFFF', fontSize: 14, marginTop: -4, marginLeft: 5 }} >{detail.location.longName}</Text>
                    </View>
                    <ParkingLocation currentLocation={{ latitude: detail.location.address.lat, longitude: detail.location.address.lng }} />
                    <TouchableOpacity onPress={() => { }} style={{ width: '100%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                        <Text style={{ color: '#454136', fontSize: 16, fontWeight: 'bold' }} >Stop Bookings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2B3F54'
    }
})