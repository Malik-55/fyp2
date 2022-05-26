import React from 'react'
import { StyleSheet, Image } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { ICONS } from '../constant/icons';



const nativeTimePicker = ({ placeHolder, getValue, size, data }) => {
    return (
        <SelectDropdown
            defaultButtonText={placeHolder}
            dropdownStyle={styles.mainStyle}
            buttonStyle={styles.btnStyle}
            buttonTextStyle={styles.btnTextStyle}
            rowTextStyle={styles.rowText}
            renderDropdownIcon={() => <Image
                source={ICONS.downArrow}
                style={{
                    width: 10,
                    height: 10,
                }}
                resizeMode="contain"
            />}
            data={data}
            onSelect={(selectedItem, index) => {
                getValue(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return moment(selectedItem).format('hh:mm A')
            }}
            rowTextForSelection={(item, index) => {
                return moment(item).format('hh:mm A')
            }}
        />
    )
}

export default nativeTimePicker

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#70707026',
        borderRadius: 5,
    },
    btnStyle: {
        height: 45,
        width: wp(37.5),
        backgroundColor: '#FFFFFF',
        borderColor: '#70707026',
        borderRadius: 5,
        alignItems: 'center',
    },
    btnTextStyle: {
        color: '#000000',
        fontSize: wp('3.5'),
    },
    rowText: {
        color: '#000000',
        fontSize: wp('3.5'),
    }
})
