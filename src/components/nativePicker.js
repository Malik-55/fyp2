import React from 'react'
import { StyleSheet, Image } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ICONS } from '../constant/icons';


const nativePicker = ({ placeHolder, getValue, size, data, textLeft }) => {
    return (
        <SelectDropdown
            defaultButtonText={placeHolder}
            dropdownStyle={styles.mainStyle}
            buttonStyle={styles.btnStyle}
            buttonTextStyle={styles.btnTextStyle}
            rowTextStyle={styles.rowText}
            renderDropdownIcon={() => <Image
                source={ICONS.down_arrow}
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
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    )
}

export default nativePicker

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#70707026',
        borderRadius: 5
    },
    btnStyle: {
        height: 46,
        backgroundColor: '#efcd39',
        borderColor: '#70707026',
        borderRadius: 5,
        width: '90%',
        marginBottom:16
    },
    btnTextStyle: {
        color: '#000000',
        fontSize: wp('3.5'),
        textAlign: 'center'
    },
    rowText: {
        color: '#000000',
        fontSize: wp('3.5'),
    }
})
