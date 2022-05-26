
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPayments } from '../../../redux/booking/booking.action';
import moment from 'moment';


export const PaymentDashboard = ({ navigation }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser);
    const token = useSelector(state => state.user.token);
    const payments = useSelector(state => state.booking.payments);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        dispatch(getAllPayments(token));
        console.log(payments)
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
                <TouchableOpacity style={{ width: '30%', height: 100, backgroundColor: '#efcd39', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 12, color: '#2B3F54' }} >Available</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }} >${total}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', }} >Recent transactions({payments.length})</Text>
                    {
                        payments.map((item, index) => {
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