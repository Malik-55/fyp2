import {
    StyleSheet, Text, View,
    TouchableOpacity, Image,
    ScrollView, TextInput,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { launchImageLibrary } from 'react-native-image-picker';
import NativeTimePicker from '../../../components/nativeTimePicker';
import CustomDatePicker from '../../../components/customDatePicker';
import moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const bookings_ref = firestore().collection('bookings');
import { useSelector } from 'react-redux';
const timeData = ["1899-12-30T00:00:00", "1899-12-30T01:00:00", "1899-12-30T02:00:00", "1899-12-30T03:00:00", "1899-12-30T04:00:00", "1899-12-30T05:00:00", "1899-12-30T06:00:00", "1899-12-30T07:00:00", "1899-12-30T08:00:00", "1899-12-30T09:00:00", "1899-12-30T10:00:00", "1899-12-30T11:00:00", "1899-12-30T12:00:00",
    "1899-12-30T13:00:00", "1899-12-30T14:00:00", "1899-12-30T15:00:00", "1899-12-30T16:00:00", "1899-12-30T17:00:00", "1899-12-30T18:00:00", "1899-12-30T19:00:00", "1899-12-30T20:00:00", "1899-12-30T21:00:00", "1899-12-30T22:00:00", "1899-12-30T23:00:00"]

const options = {
    title: 'Upload Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export const CreateBooking = ({ navigation, route }) => {
    const { detail, id } = route.params.detail
    const loggedId = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [imageURL, setImageUrl] = useState(null)
    const [vehicleNo, setVehicleNo] = useState('')
    const [modal, setModal] = useState('')
    const [startTime, setStartTime] = useState("1899-12-30T00:00:00");
    const [endTime, setEndTime] = useState("1899-12-30T00:00:00");
    const [startDate, setStartDate] = useState(new Date());
    const [loader, setLoader] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    useEffect(() => {
        return () => {

        }
    }, [])


    const getStartDate = value => {
        const x = new Date(startDate).setHours(0, 0, 0, 0);
        const y = new Date(value).setHours(0, 0, 0, 0);
        if (y < x) {
            alert("Start date should not less than current date")
            setStartDate(new Date());
        } else {
            setStartDate(value);
        }
    };

    const getStartTime = value => {
        setStartTime(value);
    };

    const getEndTime = value => {
        setEndTime(value);
    };

    const Access_Image_From_Phone = async () => {
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log("image picker response")
                console.log(response)
                UploadImage("booking", response.assets[0].uri)
                // setImageUrl(response.assets[0].uri)
            }
        });
    }
    const UploadImage = async (imageName, uploadUri) => {
        setImageUploading(true)
        const uploadTask = storage()
            .ref(`bookings/${imageName}`)
            .putFile(uploadUri)
        uploadTask.on(storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL)
                    setImageUploading(false)
                    // updateUserData(state.logged_id, downloadURL)
                });
            }
        );
    }

    const createBookingClick = () => {
        setLoader(true)
        bookings_ref.add({
            vehicleNo: vehicleNo,
            modal,
            image: imageURL,
            userId: loggedId,
            userDetail: currentUser,
            date: startDate,
            checkin: startTime,
            checkout: endTime,
            parking: {
                detail,
                id
            },
            parkingId: id,
            managerId: detail.userId,
            status: 'Pending'
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert("Record added successfully")
            setLoader(false)
        }).catch(error => {
            console.error("error: ", error);
            setLoader(false)
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuRow}>
                    <Image source={ICONS.profileA} style={{ width: 45, height: 45 }} />
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }} >Vehicle Detail</Text>
                    <TouchableOpacity style={styles.menuBtn} >
                        <Image source={ICONS.menu} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={{ width: '90%', marginBottom: 30, alignItems: 'center' }}>
                    {
                        imageURL == null
                            ?
                            <TouchableOpacity onPress={() => Access_Image_From_Phone()} style={styles.CameraBtn} >
                                {
                                    imageUploading
                                        ?
                                        <ActivityIndicator color={"#efcd39"} />
                                        :
                                        <Image source={ICONS.cameraIcon} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                }

                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => Access_Image_From_Phone()} style={styles.CameraBtn} >
                                <Image source={{ uri: imageURL }} style={{ width: 60, height: 60, borderRadius: 5 }} />
                            </TouchableOpacity>
                    }
                    <Text style={{ color: '#FFFFFF', fontSize: 13, marginTop: 5, marginBottom: 20 }} >Upload Photo</Text>
                    <TextInput
                        style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: wp('3'), marginBottom: 15 }}
                        placeholder="Vehicle Number"
                        onChangeText={(value) => setVehicleNo(value)}
                        value={vehicleNo}
                    />
                    <TextInput
                        style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: wp('3'), marginBottom: 15 }}
                        placeholder="Modal"
                        onChangeText={(value) => setModal(value)}
                        value={modal}
                        keyboardType='number-pad'
                    />
                    <CustomDatePicker
                        value={startDate}
                        getValue={getStartDate.bind(this)}
                    />
                    <View style={{ marginBottom: 15 }} />
                    <View style={{ width: wp('80'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <NativeTimePicker placeHolder={moment(startTime).format('hh:mm A')} data={timeData} value={startTime} getValue={getStartTime.bind(this)} size={"37.5"} />
                        <NativeTimePicker placeHolder={moment(endTime).format('hh:mm A')} data={timeData} value={endTime} getValue={getEndTime.bind(this)} size={"37.5"} />
                    </View>
                    {
                        loader
                            ?
                            <ActivityIndicator color={"#efcd39"} />
                            :
                            <TouchableOpacity onPress={createBookingClick} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                                <Text style={{ color: '#454136', fontSize: wp('4'), fontWeight: 'bold' }} >Save</Text>
                            </TouchableOpacity>
                    }

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2B3F54'
    },
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuBtn: {
        width: 45,
        height: 45,
        backgroundColor: '#efcd39',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CameraBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})