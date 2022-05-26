import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllParkings } from '../../../redux/parking/parking.action';

let data_backup_array = [];
export const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const allParkings = useSelector(state => state.parking.allParkings)
    const [parkingList, setParkingList] = useState([])

    useEffect(() => {
        dispatch(getAllParkings())
        return () => {
        }
    }, [])
    useEffect(() => {
        setParkingList(allParkings)
        data_backup_array = allParkings;
        return () => {
        }
    }, [allParkings])

    const Search_Method = (item) => {
        var parking_list = data_backup_array;
        const filteredParkings = parking_list
            ? parking_list.filter((filterParking) => {
                return filterParking.data.parkingName
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterParking.data.location.longName
                        .toLowerCase()
                        .includes(item.toLowerCase())

            })
            : [];
        setParkingList(filteredParkings)
    }


    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45, backgroundColor: '#FFFFFF', marginVertical: 15, borderRadius: 5, paddingHorizontal: 5 }}>
                    <Image source={ICONS.searchIcon} style={{ width: 15, height: 15 }} />
                    <TextInput
                        style={{ width: '90%', height: 45, }}
                        placeholder="Search..."
                        onChangeText={(value) => Search_Method(value)}
                    />
                </View>
                <View style={{ width: '90%', marginBottom: 30 }}>
                    {
                        parkingList.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("ParkingDetailC", { detail: item.data, id: item.id })} style={{ width: '100%', height: 100, backgroundColor: '#efcd39', marginTop: 12, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image source={{ uri: item.data.image }} style={{ width: 100, height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
                                    <View style={{ width: '68%', height: 100, marginRight: 6, justifyContent: 'center', marginLeft: 5 }}>
                                        <Text numberOfLines={1} style={{ width: '90%', fontSize: CUSTOMWIDTH(4.5), fontWeight: 'bold', color: '#2B3F54' }} >{item.data.parkingName}</Text>
                                        <Text numberOfLines={2} style={{ width: '90%', fontSize: CUSTOMWIDTH(3.5), color: '#2B3F54', opacity: 0.5 }}>{item.data.location.longName}</Text>
                                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontSize: CUSTOMWIDTH(4.5), color: '#000000', fontWeight: 'bold', marginTop: 7 }}>${item.data.rate}/hour</Text>
                                            <Text style={{ fontSize: 11, opacity: 0.8, color: '#000000' }} ></Text>
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