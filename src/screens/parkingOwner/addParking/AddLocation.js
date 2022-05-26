import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ICONS } from '../../../constant/icons'
import PlacesSearchBar from '../../../components/findAddress'
import firestore from '@react-native-firebase/firestore';
const parking_ref = firestore().collection('parkings');
import { useSelector } from 'react-redux';

export const AddParkingLocation = ({ navigation, route }) => {
    const parkingDetail = route.params.detail
    const loggedId = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [address, setAddress] = useState("")
    const [shortName, setShortName] = useState("")
    const [longName, setLongName] = useState("")
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        return () => {
        }
    }, [])

    const getAddress = (data, details) => {
        setAddress(details.geometry.location)
        setLongName(data.description)
        setShortName(details.address_components[0].short_name)
    }

    const saveParkingClick = () => {
        setLoader(true)
        parking_ref.add({
            parkingName: parkingDetail.parkingName,
            floors: parkingDetail.floors,
            capacity: parkingDetail.capacity,
            rate: parkingDetail.rate,
            image: parkingDetail.image,
            location: {
                address,
                shortName,
                longName
            },
            userId: loggedId,
            userDetail: currentUser
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert("Record added successfully")
            setLoader(false)
        }).catch(error => {
            console.error("error: ", error);
            setLoader(false)
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuRow}>
                    <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
                    <Text style={{ color: '#FFFFFF', fontSize: 16, marginLeft: 8 }} >Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: wp('100'), alignItems: 'center', zIndex: -6 }} >
                <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                    <Text style={styles.headingStyle} >Location information</Text>
                    <Text style={styles.subheadingStyle} >Please tell us where your service is located</Text>
                </View>
                <View style={{ height: 20 }} />
                <View style={{ width: wp('80'), alignItems: 'center' }} >
                    <Text style={styles.labelStyle} >Parking location</Text>
                    <Text style={styles.sublabelStyle} >Please tell us where your Parking is located</Text>
                </View>
                <PlacesSearchBar handler={getAddress.bind(this)} />
                <View style={{ height: hp('40'), }} />
                {
                    loader
                        ?
                        <ActivityIndicator />
                        :

                        <TouchableOpacity onPress={saveParkingClick} style={{ width: '80%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }} >
                            <Text style={{ color: '#454136', fontSize: wp(4), fontWeight: 'bold' }} >Save Parking</Text>
                        </TouchableOpacity>
                }

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
        width: '80%',
        height: 70,
        alignItems: 'center',
    },
    menuBtn: {
        width: 45,
        height: 45,
        backgroundColor: '#efcd39',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#FFFFFF',
        fontSize: wp('6.5'),
    },
    subheadingStyle: {
        width: wp('80'),
        color: '#fff',
        fontSize: wp('3.2'),
        marginTop: 6
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelStyle: {
        width: '100%',
        color: '#FFFFFF',
        fontSize: wp('4'),
        marginBottom: 6
    },
    sublabelStyle: {
        width: '100%',
        color: '#fff',
        fontSize: wp('3'),
        marginBottom: 12
    },
    btncontainer: {
        width: wp('80'),
        height: hp('7'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#61B2D4',
        marginBottom: 8,
        backgroundColor: '#FFFFFF'
    },
    btnlabelStyle: {
        color: "#61B2D4",
        fontSize: wp('3'),
        marginLeft: 7
    }
})
