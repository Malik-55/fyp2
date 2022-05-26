import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, ScrollView,
    TextInput, ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';


const options = {
    title: 'Upload Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export const AddParking = ({ navigation }) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [imageURL, setImageUrl] = useState(null)
    const [parkingName, setParkingName] = useState('')
    const [floors, setFloors] = useState('')
    const [rate, setRtae] = useState('')
    const [capacity, setCapacity] = useState('')
    const [imageUploading, setImageUploading] = useState(false)

    useEffect(() => {

        return () => {

        }
    }, [])


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
                UploadImage("parking", response.assets[0].uri)
            }
        });
    }

    const UploadImage = async (imageName, uploadUri) => {
        setImageUploading(true)
        const uploadTask = storage()
            .ref(`parkings/${imageName}`)
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
    const onNextClick = () => {
        if (imageURL == null) {
            alert('Please upload parking image')
        } else if (parkingName == '') {
            alert('Please enter parking name')
        } else if (floors == '') {
            alert('Please enter number of floors')
        } else if (capacity == '') {
            alert('Please enter number of Slots')
        } else if (rate == '') {
            alert('Please enter rate per hour')
        } else {
            let data = {
                parkingName,
                floors,
                capacity,
                rate,
                image: imageURL
            }
            navigation.navigate("AddParkingLocation", { detail: data })
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuRow}>
                    <Image source={currentUser.avatar == "null" ? ICONS.profileA : { uri: currentUser.avatar }} style={{ width: 45, height: 45, borderRadius: 25 }} />
                    <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")} style={styles.menuBtn} >
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
                                        <ActivityIndicator color={"red"} size="small" />
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
                        style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: 15, marginBottom: 15 }}
                        placeholder="Parking Name"
                        onChangeText={(value) => setParkingName(value)}
                        value={parkingName}
                    />
                    <TextInput
                        style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: 15, marginBottom: 15 }}
                        placeholder="No of floors"
                        onChangeText={(value) => setFloors(value)}
                        value={floors}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: 15, marginBottom: 15 }}
                        placeholder="Capacity"
                        onChangeText={(value) => setCapacity(value)}
                        value={capacity}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: 15, marginBottom: 15 }}
                        placeholder="Rate"
                        onChangeText={(value) => setRtae(value)}
                        value={rate}
                        keyboardType='number-pad'
                    />
                    <TouchableOpacity onPress={onNextClick} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 35 }} >
                        <Text style={{ color: '#454136', fontSize: 16, fontWeight: 'bold' }} >Next</Text>
                    </TouchableOpacity>
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