import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import GetLocation from 'react-native-get-location'
import { ParkingLocation } from '../../../components/parkingLocation'


export const ParkingDetailC = ({ navigation, route }) => {
    const detail = route.params.detail;
    const id = route.params.id;

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    useEffect(() => {
        // GetCurrentLocation()
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

    const bookNowClick = () => {
        let data = {
            detail,
            id
        }
        navigation.navigate("CreateBooking", { detail: data })
    }
    const routeClick = () => {
        let data = {
            detail,
            id
        }
        navigation.navigate("RouteGuidance", { detail: data })
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
                    <TouchableOpacity onPress={routeClick} style={{ width: '50%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: 12, alignSelf: 'center' }} >
                        <Text style={{ color: '#454136', fontSize: 16, fontWeight: 'bold' }} >Track Route</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={bookNowClick} style={{ width: '100%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                        <Text style={{ color: '#454136', fontSize: 16, fontWeight: 'bold' }} >Book Now</Text>
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