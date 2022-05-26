
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentList } from '../../../redux/booking/booking.action';
import moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const PaymentListing = ({ navigation }) => {
    const dispatch = useDispatch();
    const paymentList = useSelector(state => state.booking.paymentList);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(getPaymentList());
        return () => {
        }
    }, [])
    useEffect(() => {
        calculateTotal()
        return () => {
        }
    }, [paymentList])

    const calculateTotal = () => {
        let tempAmount = 0
        paymentList.map((item, index) => {
            tempAmount = tempAmount + item.data.ammount
        })
        setTotal(tempAmount)
    }


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
            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
                <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 12, color: '#2B3F54' }} >Available</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }} >${total}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', }} >All transactions({paymentList.length})</Text>
                    {
                        paymentList.map((item, index) => {
                            return (
                                <View key={index} style={{ width: '100%', height: 100, backgroundColor: '#efcd39', marginTop: 12, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image source={ICONS.paymentIcon} style={{ width: 100, height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginRight: 5 }} resizeMode="contain" />
                                    <View style={{ width: '68%', height: 100, marginRight: 6, justifyContent: 'center' }}>
                                        <Text style={{ width: '90%', fontSize: 10, fontWeight: 'bold', color: '#2B3F54' }} >{item.data.bookingId}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <Image source={ICONS.profileI} style={{ width: 15, height: 15 }} />
                                            <Text numberOfLines={1} style={{ width: '90%', fontSize: 14, color: '#2B3F54', }}> {item.data.name}</Text>
                                        </View>
                                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold', marginTop: 7 }}>${item.data.ammount}</Text>
                                            <Text style={{ fontSize: 11, color: '#000000', marginTop: 7 }}>{moment(item.data.date).format("MM/DD/YYYY")}</Text>
                                        </View>
                                    </View>
                                </View>
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