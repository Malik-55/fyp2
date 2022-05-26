import React, { } from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';
import { ICONS } from '../../../constant/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdminDashboard } from '../dashboard/AdminDashboard';
import { AllParkings } from '../parkings/AllParkings';
import { AllBookings } from '../bookings/AllBookings';
import { ParkingList } from '../parkings/ParkingList';
import { BookingList } from '../bookings/BookingList';
import { PaymentListing } from '../payments/PaymentListing';


const Demi = () => {
    return (
        <Text>Demi</Text>
    )
}

const AdminDashboardStack = () => {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'DashboardHome'}>
            <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AllParkings"
                component={AllParkings}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AllBookings"
                component={AllBookings}
                options={{
                    headerShown: false,
                }}
            />
            
        </Stack.Navigator>
    );
}

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

export function AdminBottomTab() {

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarInactiveBackgroundColor: '#efcd39',
                    tabBarActiveBackgroundColor: '#2B3F54',
                    tabBarStyle: {
                        backgroundColor: '#2B3F54',
                        borderTopWidth: 0
                    }
                }} >
                <Tab.Screen
                    name="AdminDashboard"
                    component={AdminDashboardStack}
                    options={{
                        unmountOnBlur: true,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBtnStyle}>
                                <Image
                                    source={focused ? ICONS.profileA : ICONS.profileI}
                                    style={{ width: 24, height: 24 }}
                                    resizeMode={'contain'}
                                />
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}>Managers</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Parkings"
                    component={ParkingList}
                    options={{
                        unmountOnBlur: true,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBtnStyle}>
                                <Image
                                    source={focused ? ICONS.dashboardA : ICONS.dashboardI}
                                    style={{ width: 24, height: 24 }}
                                    resizeMode={'contain'}
                                />
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}  >Parkings</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Bookings"
                    component={BookingList}
                    options={{
                        unmountOnBlur: true,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBtnStyle}>
                                <Image
                                    source={focused ? ICONS.bookingA : ICONS.bookingI}
                                    style={{ width: 24, height: 24 }}
                                    resizeMode={'contain'}
                                />
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}>Bookings</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Transections"
                    component={PaymentListing}
                    options={{
                        unmountOnBlur: true,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBtnStyle}>
                                <Image
                                    source={focused ? ICONS.paymentA : ICONS.paymentI}
                                    style={{ width: 24, height: 24 }}
                                    resizeMode={'contain'}
                                />
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}>Transections</Text>
                            </View>
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    );
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000A2',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    tabBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 3,
    },
    tabMainStyle: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        elevation: 0,
        backgroundColor: '#efcd39',
        borderRadius: 1,
        height: Platform.OS == "android" ? 70 : 90,
        margin: 1,
        shadowColor: '#000000A2',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    labelStyle: {
        fontSize: 9,
    },
    addAccountContainer: {
        width: wp('100%'),
        alignItems: 'center',
        backgroundColor: "#efcd39",
        borderRadius: 5,
        bottom: -17,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: 12
    },
    headingStyle: {
        width: wp('90'),
        fontSize: wp('3.5'),
        marginBottom: 6
    },
    formRow: {
        width: wp('90'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerDate: {
        width: wp('43%'),
        height: 40,
        borderWidth: 1,
        borderColor: '#C2C7CF',
        borderRadius: 4,
        marginBottom: 12,
        padding: 4,
        paddingLeft: 10
    }
})