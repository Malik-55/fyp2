import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { ICONS } from '../../constant/icons'


export const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login")
    }, 700);
    return () => {

    }
  }, [])



  return (
    <View style={styles.container}>
      <Image source={ICONS.splash_icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  }
})

