/**
 * @format
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ICONS } from '../../../constant/icons';
import firestore from '@react-native-firebase/firestore';
import { getAllBookingSpecOwner } from '../../../redux/booking/booking.action';
const payments_ref = firestore().collection('payments');
const bookings_ref = firestore().collection('bookings');


export const CardDetails = props => {
  const apiData = props.route.params.apiData
  const dispatch = useDispatch()
  const [isBank, setIsBank] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState(new Date())
  const [open, setOpen] = useState(false)
  const currentUser = useSelector(state => state.user.currentUser);
  const token = useSelector(state => state.user.token)


  useEffect(() => {
    return () => {
    }
  }, [])

  const onContinue = async () => {
    let cardLength = cardNo.replace(/\s+/g, '');
    if (cardNo == '' || cardLength.length < 16) {
      alert("Please enter valid card number")
    } else if (cvc == '' || cvc.length < 3) {
      alert("Please enter valid cvc number")
    } else {
      setLoader(true)
      payments_ref.add({
        cvc: cvc,
        exp_month: moment(expiry).format('MM'),
        exp_year: moment(expiry).format('YYYY'),
        name: currentUser.fullName,
        cardNumber: cardNo.replace(/\s+/g, ''),
        currency: 'usd',
        ammount: 5,
        date: new Date(),
        bookingId: apiData.bookingId,
        managerId: apiData.managerId,
        userId: apiData.userId,
      })
      changeStatus()
      setTimeout(() => {
        setCardNo('')
        setCvc('')
        setLoader(false)
        alert("Amount Paied successfully!")
        props.navigation.navigate("My Bookings", { screen: "MyBooking" });
      }, 400);
    }
  }

  const changeStatus = () => {
    bookings_ref.doc(apiData.bookingId).update("status", "Completed");
    dispatch(getAllBookingSpecOwner(token))
  }

  const getCard = (value) => {
    let final = value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
    setCardNo(final)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '90%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
        </TouchableOpacity>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }} >Card Details</Text>
        <View />
      </View>
      {
        loader
          ?
          <ActivityIndicator />
          :
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: 0.5, marginBottom: 15, alignSelf: 'center' }}>
              <Text style={styles.subHeading}>
                Tell us how you'd like to pay.
              </Text>
              <View style={styles.buttonWrapper}>

                <TouchableOpacity
                  style={styles.buttonChecked}
                  onPress={() => {
                    setIsBank(false);
                  }}>
                  <Image source={ICONS.cardIcon} style={styles.buttonIcon} resizeMode='contain' />
                  <Text style={styles.buttonText}>Debit Card</Text>
                  {
                    !isBank
                      ?
                      <Image source={ICONS.greenTick} style={styles.buttonCheckMark} />
                      :
                      null
                  }
                </TouchableOpacity>
              </View>
              <View style={{ height: 12 }} />
              <Text style={styles.inputHeading}>Card Number</Text>
              <TextInput
                maxLength={19}
                style={styles.inputStyle}
                onChangeText={value => { getCard(value) }}
                placeholder={"4000 0566 5566 5556"}
                placeholderTextColor="rgba(112, 112, 112, 0.5)"
                value={cardNo}
                keyboardType='phone-pad'
              />
              <Text style={styles.inputHeading}>CVC</Text>
              <TextInput
                maxLength={3}
                style={styles.inputStyle}
                onChangeText={value => { setCvc(value) }}
                placeholder={"123"}
                placeholderTextColor="rgba(112, 112, 112, 0.5)"
                value={cvc}
                keyboardType='phone-pad'
              />

              <Text style={styles.inputHeading}>Expiry Date</Text>
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
                  {moment(expiry).format("MM/YY")}
                </Text>
              </TouchableOpacity>
              <View style={{ padding: 1 }} />
              <View style={{ paddingVertical: 20 }} />
              <TouchableOpacity onPress={onContinue} style={{ width: wp('80%'), backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 10 }} >
                <Text style={{ color: '#454136', fontSize: wp(4), fontWeight: 'bold' }} >Continue</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={expiry}
              onConfirm={(date) => {
                setOpen(false)
                setExpiry(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </ScrollView>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: Platform.OS == 'android' ? 10 : 18,
  },
  inputSubHeading: {
    width: wp('80'),
    color: '#FFFFFF',
    fontSize: wp('3.5'),
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    width: wp('38'),
    height: 60,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  buttonChecked: {
    width: wp('38'),
    height: 60,
    borderRadius: 2,
    borderWidth: 0,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontSize: wp('3.5'),
  },
  buttonCheckMark: {
    width: wp('4'),
    height: wp('4'),
    borderRadius: wp('5'),
    backgroundColor: '#65c51f',
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 5,
    top: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkMarkText: {
    color: 'white',
  },
  buttonIcon: {
    width: 22,
    height: 22,
    marginRight: 6
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
    marginTop: 5
  },
});


{/* <CardField
                  postalCodeEnabled={true}
                  placeholder={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                    fontSize: 10,
                    borderRadius: 4
                  }}
                  style={{
                    height: 50,
                    marginVertical: 20,
                  }}
                  onCardChange={(cardDetails) => {
                    setCardDetail(cardDetails)
                  }}
                  onFocus={(focusedField) => {
                  }}
                /> */}
{/* <CreditCardInput
                  requiresPostalCode={true}
                  requiresName={true}
                  cardScale={0.94}
                  onChange={_onChange}
                  cardFontFamily={FONTS.SFMedium}
                  labelStyle={{ fontSize: wp('2.3'), color: '#000000', fontFamily: FONTS.SFMedium }}
                  inputStyle={{ fontSize: wp('5'), color: '#000000', fontFamily: FONTS.SFRegular }}
                  placeholderColor="#707070"
                /> */}
