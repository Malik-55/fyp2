
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2d2d2d",
        alignItems: 'center'
    },
    headerStyle: {
        width: '100%',
        height: hp('16'),
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 12
    },
    btnLabelStyle: {
        color: "#FFFFFF",
        fontSize: wp('3.5'),
    },
    logoStyle: {
        width: 87,
        height: 67
    },
    infoStyle: {
        width: wp("80"),
        color: "#FFFFFF",
        fontSize: wp('3.5'),
        textAlign: 'center',
        marginTop: 15
    },
    headingText: {
        width: wp("80"),
        color: "#FFFFFF",
        fontSize: wp('7'),
        textAlign: 'center',
    },
    box: {
        height: hp('2.5%')
    },

})

export default styles;