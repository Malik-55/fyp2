import React, { } from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';
import { ICONS } from '../../../constant/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Dashboard } from '../dashboard/Dashboard';
import { ParkingDetail } from '../parkingDetail/ParkingDetail';

import { BookingStats } from '../bookingStats/BookingStats';
import { BookingDetail } from '../bookingDetail/BookingDetail';

import { AddParking } from '../addParking/AddParking';
import { AddParkingLocation } from '../addParking/AddLocation';

import { MyAccount } from '../myAccount/MyAccount';
import { EditProfile } from '../myAccount/EditProfile';
import { ChangePassword } from '../myAccount/ChangePassword';
import { ChangeEmail } from '../myAccount/ChangeEmail';

import { PaymentDashboard } from '../paymentDashboard/PaymentDashboard';






const Stack = createNativeStackNavigator();
function DashboardStack() {

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'DashboardHome'}>
            <Stack.Screen
                name="DashboardHome"
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ParkingDetail"
                component={ParkingDetail}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

function BookingStack() {

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'BookingStats'}>
            <Stack.Screen
                name="BookingStats"
                component={BookingStats}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BookingDetail"
                component={BookingDetail}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

function AddParkingStack() {

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'AddParking'}>
            <Stack.Screen
                name="AddParking"
                component={AddParking}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AddParkingLocation"
                component={AddParkingLocation}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

function AccountStack() {

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'MyAccount'}>
            <Stack.Screen
                name="MyAccount"
                component={MyAccount}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChangeEmail"
                component={ChangeEmail}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();




export function BottomTab() {

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
                    name="Dashboard"
                    component={DashboardStack}
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
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}>Dashboard</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Bookings"
                    component={BookingStack}
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
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}  >Bookings</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Add Parking"
                    component={AddParkingStack}
                    options={{
                        unmountOnBlur: true,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBtnStyle}>
                                <Image
                                    source={focused ? ICONS.addA : ICONS.addI}
                                    style={{ width: 24, height: 24 }}
                                    resizeMode={'contain'}
                                />
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}  >Add Parking</Text>
                            </View>
                        )
                    }}
                />

                <Tab.Screen
                    name="PaymentDashboard"
                    component={PaymentDashboard}
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
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}  >Payment</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="AccountSetting"
                    component={AccountStack}
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
                                <Text numberOfLines={1} style={[styles.labelStyle, { color: focused ? '#FFFFFF' : '#2B3F54' }]}>Account</Text>
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