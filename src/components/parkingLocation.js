
import React, {
} from 'react';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


export const ParkingLocation = ({ currentLocation }) => {

    const {
        container,
        map
    } = styles

    return (
        <>
            <View style={container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={map}
                    region={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                </MapView>
            </View>
        </>
    );
};





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
        height: 110,
        width: wp('92'),
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


