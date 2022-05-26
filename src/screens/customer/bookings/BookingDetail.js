import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import GetLocation from 'react-native-get-location'
import { ParkingLocation } from '../../../components/parkingLocation'
import firestore from '@react-native-firebase/firestore';
import { getAllBookingSpecOwner } from '../../../redux/booking/booking.action'
const bookings_ref = firestore().collection('bookings');
import { useSelector, useDispatch } from 'react-redux';


export const BookingDetailC = ({ navigation, route }) => {
    const { data, id } = route.params.detail
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    useEffect(() => {
        GetCurrentLocation()
        return () => {
        }
    }, [])

    const GetCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                setCurrentLocation(location)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    const changeStatus = (status) => {
        bookings_ref.doc(id).update("status", status);
        dispatch(getAllBookingSpecOwner(token))
    }

    const checkoutClicked = () => {
        let tempData = {
            bookingId: id,
            managerId: data.managerId,
            userId: data.userId
        }
        navigation.navigate("Personalnfo", { bookingData: tempData })
    }

    return (
        <ScrollView>
            <View style={styles.container} >
                <ImageBackground source={{ uri: data.image }} style={{ width: '100%', height: 200 }} >
                    <View style={{ width: '100%', height: 60, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingHorizontal: '5%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image source={ICONS.backwhite} style={{ width: 12, height: 18 }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }} >Detail</Text>
                        <View style={{ width: 50, height: 18, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 8, color: '#2B3F54' }} >{data.status}</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={{ width: '90%', alignSelf: 'center', marginVertical: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, opacity: 0.8 }}>Vehicle:</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>{data.modal}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 14, marginBottom: 10 }}>{data.vehicleNo}</Text>

                    <Text style={{ color: '#FFFFFF', fontSize: 10, opacity: 0.8 }}>Parking Owner:</Text>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }} >
                        <Image source={ICONS.profileA} style={{ width: 15, height: 15 }} />
                        <Text style={{ fontSize: 14, color: '#FFFFFF', }}> {data.parking.detail.userDetail.fullName}</Text>
                    </View>
                    <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Contact: <Text style={{ fontWeight: 'bold' }} >{data.parking.detail.userDetail.email}</Text></Text>

                    <View style={{ width: '100%', marginVertical: 12 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 10, opacity: 0.8 }}>Parking:</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{data.parking.detail.parkingName}</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14, }} >Floors: <Text style={{ fontWeight: 'bold', }} >{data.parking.detail.floors}</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Track: <Text style={{ fontWeight: 'bold' }} >{data.parking.detail.capacity}</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Rate: <Text style={{ fontWeight: 'bold' }} >${data.parking.detail.rate}</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Check In: <Text style={{ fontWeight: 'bold' }} >09:00 AM</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Check Out: <Text style={{ fontWeight: 'bold' }} >06:00 PM</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Total Hours: <Text style={{ fontWeight: 'bold' }} >9</Text></Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 14 }} >Total Price: <Text style={{ fontWeight: 'bold' }} >$54</Text></Text>
                    </View>

                    <Text style={{ color: '#FFFFFF', fontSize: 10, marginBottom: 5, opacity: 0.8 }}>Location:</Text>
                    <View style={{ width: '100%', flexDirection: 'row', }}>
                        <Image source={ICONS.location} style={{ width: 14, height: 14 }} resizeMode="contain" />
                        <Text style={{ color: '#FFFFFF', fontSize: 14, marginTop: -4, marginLeft: 5 }} >{data.parking.detail.location.longName}</Text>
                    </View>

                    <ParkingLocation currentLocation={{
                        latitude: data.parking.detail.location.address.lat,
                        longitude: data.parking.detail.location.address.lng,
                    }} />
                    {
                        data.status == "Ongoing" && <TouchableOpacity onPress={checkoutClicked} style={{ width: '100%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                            <Text style={{ color: '#454136', fontSize: 16, fontWeight: 'bold' }} >Check Out</Text>
                        </TouchableOpacity>
                    }
                    {
                        data.status == "Pending" && <TouchableOpacity onPress={() => { changeStatus("Canceled") }} style={{ width: '100%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                            <Text style={{ color: '#454136', fontSize: 16, fontWeight: 'bold' }} >Cancel Booking</Text>
                        </TouchableOpacity>
                    }

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