import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export const RowItem = ({ label, onClick }) => {

    return (
        <TouchableOpacity onPress={() => onClick()} style={styles.container} >
            <View style={styles.labelRow} >
                <Text style={styles.labelStyle} >{label}</Text>
                <Icon name={"chevron-right"} size={15} color={"#2B3F54"} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: '#2B3F54',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    labelRow: { width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    labelStyle: {
        color: '#2B3F54',
        fontSize: 14
    }

})
