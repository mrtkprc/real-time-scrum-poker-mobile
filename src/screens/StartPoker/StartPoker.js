import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, Image, Clipboard } from "react-native";
import { Button, Icon } from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-root-toast';

const StartPoker = (props) => {
    const generateRandomSessionNumber = () => {
        return String(Math.floor(100000 + Math.random() * 900000));
    };
    const [sessionNumber, setSesionNumber] = useState(generateRandomSessionNumber());
    const [description, setDescription] = useState("");

    const copySessionNumber = async () => {
        await Clipboard.setString(sessionNumber);
        Toast.show("Copied", {duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM});
    };

    const refreshSessionNumber = () => {
        setSesionNumber(generateRandomSessionNumber());
    };

    const shareSessionNumber = () => {

    };

    const createSession = () => {

    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.layoutContainer}>
                <Image
                    style={styles.logo}
                    source={require('./../../assets/logo.png')}/>
                <TextInput
                    style={styles.sessionNumberTextInput}
                    editable={false}
                    value={sessionNumber}/>
                <View style={styles.sessionButtonsArea}>
                    <TouchableOpacity onPress={copySessionNumber}>
                        <Image source={require('./../../assets/copy.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={refreshSessionNumber}>
                        <Image source={require('./../../assets/refresh.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareSessionNumber}>
                        <Image source={require('./../../assets/share.png')}/>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.descriptionText}
                    placeHolder="Session Description"
                    onChangeText={text => setDescription(text)}
                    value={description}/>
                <Button onPress={createSession} style={styles.createSessionButton}>
                    <Image source={require('./../../assets/meeting.png')} style={styles.sessionButtonImage}/>
                    <Text style={styles.createSessionButtonText}>Create Session</Text>
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#dedede'
    },
    layoutContainer:{
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo:{
        marginTop: 20,
        width: 128,
        height: 128
    },
    sessionNumberTextInput:{
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        width: '80%',
        height: 60,
        borderWidth: 1,
        textAlign:'center',
        borderRadius: 20
    },
    sessionButtonsArea:{
        marginTop: 10,
        paddingVertical: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    descriptionText:{
        marginTop: 20,
        paddingLeft: 10,
        borderWidth: 1,
        width: '90%',
        borderRadius: 20
    },
    createSessionButton:{
        marginTop: 30,
        width: '90%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
    createSessionButtonText:{
        paddingLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Verdana'
    },
    createSessionImage:{
        width: 32,
        height: 32
    },
    advertisementArea:{
        flex:1,
        height: '100%',
        backgroundColor: 'magenta',
        justifyContent: 'flex-start',
        alignItems:'flex-start'
    }
});

export default StartPoker;
