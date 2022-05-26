import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICONS } from '../../../constant/icons'
import { CUSTOMWIDTH } from '../../../constant/layout'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const user_ref = firestore().collection('users');
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/user/user.action';


const options = {
    title: 'Upload Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch()
    const loggedId = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [imageUploading, setImageUploading] = useState(false)
    const [fullName, setFullName] = useState(currentUser.fullName)
    const [loader, setLoader] = useState(false)


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
                UploadImage("profile", response.assets[0].uri)
            }
        });
    }
    const UploadImage = async (imageName, uploadUri) => {
        setImageUploading(true)
        const uploadTask = storage()
            .ref(`profiles/${imageName}`)
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
                    setImageUploading(false)
                    updatePhoto(downloadURL)
                    // updateUserData(state.logged_id, downloadURL)
                });
            }
        );
    }

    const updatePhoto = (url) => {
        user_ref.doc(loggedId).update("avatar", url);
        let data = {
            avatar: url,
            email: currentUser.email,
            fullName: currentUser.fullName,
            user: currentUser.user
        };
        dispatch(setCurrentUser(data));
    }

    const updateName = () => {
        setLoader(true)
        user_ref.doc(loggedId).update("fullName", fullName);
        let data = {
            avatar: currentUser.avatar,
            email: currentUser.email,
            fullName: fullName,
            user: currentUser.user
        };
        dispatch(setCurrentUser(data));
        setLoader(false)
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#2B3F54' }} >
            <View style={{ width: '100%', height: 60, alignItems: 'center', }} >
                <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ICONS.backwhite} style={{ width: 8, height: 12 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF', fontSize: CUSTOMWIDTH(5), fontWeight: 'bold' }} >Edit Profile</Text>
                    <View />
                </View>
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginVertical:30 }}>
                {
                    currentUser.avatar == "null"
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
                            <Image source={{ uri: currentUser.avatar }} style={{ width: 60, height: 60, borderRadius: 5 }} />
                        </TouchableOpacity>
                }
                <Text style={{ color: '#FFFFFF', fontSize: 13, marginTop: 5, marginBottom: 20 }} >Edit Photo</Text>
                <TextInput
                    style={{ width: '90%', height: 45, backgroundColor: '#FFFFFF', borderRadius: 5, color: '#454136', fontSize: CUSTOMWIDTH(3.5), marginBottom: 15 }}
                    placeholder="Full Name"
                    onChangeText={(value) => setFullName(value)}
                    value={fullName}
                />
                {
                    loader
                        ?
                        <View onPress={updateName} style={{ width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }} >
                            <ActivityIndicator color={"#efcd39"} size="small" />
                        </View>
                        :
                        <TouchableOpacity onPress={updateName} style={{ width: '90%', backgroundColor: '#efcd39', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: 20 }} >
                            <Text style={{ color: '#454136', fontSize: CUSTOMWIDTH(4), fontWeight: 'bold' }} >Save</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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