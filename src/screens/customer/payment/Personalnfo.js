/**
 * @format
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from '../../../components/dropDown';
import moment from 'moment';
import { ICONS } from '../../../constant/icons';



export const Personalnfo = props => {
  const bookingData = props.route.params.bookingData
  const [dob, setDOB] = useState(new Date())
  const [ssn, setSSN] = useState('')
  const [city, setCity] = useState('')
  const [stateInfo, setStateInfo] = useState('')
  const [line1, setLine1] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [gender, setGender] = useState('Select')
  const [open, setOpen] = useState(false)

  const getDOB = value => {
    const x = new Date(value).setHours(0, 0, 0, 0);
    const y = new Date().setHours(0, 0, 0, 0);
    if (y < x) {
      alert("Date of birth should be less than current date")
    } else {
      setDOB(value)
    }
  };

  const onContinue = () => {
    const x = new Date(dob).setHours(0, 0, 0, 0);
    const y = new Date().setHours(0, 0, 0, 0);
    if (gender == 'Select') {
      alert("Please select gender")
    } else if (y < x) {
      alert("Date of birth should be less than current date")
    } else if (city == '') {
      alert("City field should not be blank")
    } else if (stateInfo == '') {
      alert("State field should not be blank")
    } else if (line1 == '') {
      alert("Line field should not be blank")
    } else if (postalCode == '') {
      alert("Postal code should not be blank")
    } else if (ssn == '') {
      alert("SSN should not be blank")
    } else {
      let data = {
        bookingId: bookingData.bookingId,
        managerId: bookingData.managerId,
        userId: bookingData.userId,
        gender: gender,
        dob: moment(dob).format(''),
        city: city,
        state: stateInfo,
        line1: line1,
        postal_code: postalCode,
        ssnNumber: ssn,
      }
      props.navigation.navigate('CardDetails', { apiData: data });
    }
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#2B3F54', }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.container} >
        <View style={{ width: '90%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
          </TouchableOpacity>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }} >Payment</Text>
          <View />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%' }} >
          <View style={{ alignSelf: 'center' }} >
            <Text style={styles.subHeading}>
              Tell us a few details about yourself
            </Text>
            <Text style={styles.inputHeading}>Gender</Text>
            <View style={{ width: wp('80'), marginTop: 0 }}>
              <Dropdown
                name={gender}
                data={['Male', 'Female']}
                getValue={setGender.bind(this)}
              />
            </View>
            <Text style={styles.inputHeading}>Date of Birth</Text>
            <TouchableOpacity style={{
              width: wp('80%'),
              height: 46,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#70707026',
              justifyContent: 'center',
              paddingLeft: 10,
              borderRadius: 4
            }} onPress={() => setOpen(true)}>
              <Text style={{
                color: '#000000',
                fontSize: wp('3.5'),

              }} >
                {moment(dob).format("DD / MM / YY")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.inputHeading}>
              City
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setCity(value)}
              placeholder={"City"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={city}
            />
            <Text style={styles.inputHeading}>
              State
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setStateInfo(value)}
              placeholder={"State"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={stateInfo}
            />

            <Text style={styles.inputHeading}>
              Line1
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setLine1(value)}
              placeholder={"Line1"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={line1}
            />

            <Text style={styles.inputHeading}>
              Postal Code
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setPostalCode(value)}
              placeholder={"Postal code"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={postalCode}
              keyboardType='phone-pad'
            />

            <Text style={styles.inputHeading}>
              Last 4 digits of Social Security number
            </Text>
            <TextInput
              maxLength={4}
              style={styles.inputStyle}
              onChangeText={value => setSSN(value)}
              placeholder={"… - … - 8888"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={ssn}
              keyboardType='phone-pad'
            />

            <View style={{ paddingVertical: 20 }} />
            <View style={{ marginBottom: Platform.OS == 'ios' ? 15 : 5 }}>
              <TouchableOpacity onPress={onContinue} style={{ width: '100%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 10 }} >
                <Text style={{ color: '#454136', fontSize: wp(4), fontWeight: 'bold' }} >Continue</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={dob}
              onConfirm={(date) => {
                setOpen(false)
                getDOB(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2B3F54',
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('6.5'),
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  subHeading: {
    width: wp('80'),
    color: '#FFFFFF',
    fontSize: wp('4'),
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  inputHeading: {
    width: wp('80'),
    color: '#FFFFFF',
    fontSize: wp('4'),
    marginTop: Platform.OS == 'android' ? 5 : 10,
    marginBottom: Platform.OS == 'android' ? 5 : 10,
  },
  inputStyle: {
    width: wp('80'),
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#000000',
    fontSize: wp('3.5'),
    paddingLeft: 13,
    marginBottom: 15,
  },
});

