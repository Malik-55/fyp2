import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllParkings } from '../../../redux/parking/parking.action';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';



export const ParkingList = ({ }) => {
    const dispatch = useDispatch()
    const allParkings = useSelector(state => state.parking.allParkings)

    useEffect(() => {
        dispatch(getAllParkings());
        return () => {
        }
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={ICONS.profileA} style={{ width: 45, height: 45, borderRadius: 25 }} />
                        <Text style={{ color: '#FFFFFF', fontSize: wp(4.5), fontWeight: 'bold', marginLeft: 8 }} >Admin</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Image source={ICONS.logout} style={{ width: 20, height: 15 }} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 12 }} >All Parkings({allParkings.length})</Text>
                    {
                        allParkings.map((item, index) => {
                            return (<View key={index} style={{ width: '100%', height: 100, backgroundColor: '#efcd39', marginTop: 12, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image source={{ uri: item.data.image }} style={{ width: 100, height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
                                <View style={{ width: '68%', height: 100, marginRight: 6, justifyContent: 'center', marginLeft: 5 }}>
                                    <Text numberOfLines={1} style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), fontWeight: 'bold', color: '#2B3F54' }} >{item.data.parkingName}</Text>
                                    <Text numberOfLines={2} style={{ width: '90%', fontSize: CUSTOMWIDTH(3.5), color: '#2B3F54', opacity: 0.5 }}>{item.data.location.longName}</Text>
                                    <Text style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), color: '#000000', fontWeight: 'bold', marginTop: 7 }}>${item.data.rate}/hour</Text>
                                </View>
                            </View>
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