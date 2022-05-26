import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import BackgroundTimer from "react-native-background-timer";
import Polyline from "@mapbox/polyline";
import moment from "moment";
import GetLocation from 'react-native-get-location'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ICONS } from '../../../constant/icons';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


export const RouteGuidance = ({ navigation, route }) => {
    const { detail, id } = route.params.detail
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    const [loader, setLoader] = useState(false)
    const [coords, setCoords] = useState([])
    const [x, setX] = useState("false")
    const [distance, setDistance] = useState("")
    const [time, setTime] = useState("")
    // parking lat, lng 32.5326731, 74.3675913
    // current   "latitude": 32.3962495, "longitude": 74.6818452,

    useEffect(() => {
        console.log(detail)
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
                console.log(location)
                mergeLot();
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    function mergeLot() {
        let concatLot = 32.3962495 + "," + 74.6818452;
        getDirections(concatLot, [32.5326731, 74.3675913]);
    }

    const getDirections = async (startLoc, destinationLoc) => {
        try {
            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&sensor-false&mode-driving&key=AIzaSyCY8HPmdM0-oEjuON67iWUQmuMDGMXtw4w`
            );
            let respJson = await resp.json();
            setDistance(respJson.routes[0].legs[0].distance.text)
            setTime(respJson.routes[0].legs[0].duration.text)
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            setCoords(coords)
            setLoader(false)
            setX("true")
            return coords;
        } catch (error) {
            setLoader(false)
            setX("error")
            return error;
        }
    }




    const {
        container,
        map
    } = styles
    return (
        <View style={container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={map}
                region={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    longitudeDelta: 0.02,
                    latitudeDelta: 0.02
                }}
            >
                <Circle
                    center={{
                        latitude: 32.3962495,
                        longitude: 74.6818452
                    }}
                    radius={40}
                    strokeColor="rgba(65, 10, 223, 0.7)"
                    fillColor="rgba(65, 10, 223, 0.7)"
                    lineCap="round"
                    lineJoin="round"
                />
                <Circle
                    center={{
                        latitude: 32.5326731,
                        longitude: 74.3675913
                    }}
                    radius={40}
                    strokeColor="rgba(65, 10, 223, 0.3)"
                    fillColor="rgba(65, 10, 223, 0.3)"
                    lineCap="round"
                    lineJoin="round"
                />

                {x == "true" && (
                    <MapView.Polyline
                        coordinates={coords}
                        strokeWidth={2}
                        strokeColor="#707070"
                    />
                )}
            </MapView>
            <View style={{ position: 'absolute', width: '100%', height: 60, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Image source={ICONS.backArrow} style={{ width: 14, height: 14 }} />
                    </TouchableOpacity>

                    <Text style={{ color: '#2B3F54', fontSize: wp(5), fontWeight: 'bold' }} >Route Guidance</Text>
                    <View />
                </View>
            </View>
            <View style={{ position: 'absolute', width: '100%', bottom: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(43, 63, 84,0.2)' }}>
                <View style={{ width: '90%', marginVertical: 20 }}>
                    <View style={{ width: '100%', flexDirection: 'row', }}>
                        <Image source={ICONS.locationGrey} style={{ width: 15, height: 15, marginTop: 5 }} resizeMode="contain" />
                        <Text style={{ width: '90%', color: 'rgba(43, 63, 84,0.8)', fontSize: wp(4), marginLeft: 5, marginBottom: 3 }} >{detail.location.longName}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={ICONS.infogrey} style={{ width: 15, height: 15 }} resizeMode="contain" />
                        <Text style={{ color: 'rgba(43, 63, 84,0.8)', fontSize: wp(4), marginLeft: 5, marginBottom: 3 }} >{distance}, {time} here</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    headingStyle: {
        width: wp('93'),
        color: '#212529',
        fontSize: 15,
        marginTop: 15
    },
    locationRow: {
        width: wp('95'),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
        marginTop: 4
    },
    locationText: {
        fontSize: 15,
        color: '#212529',
        width: wp('63.5'),
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


