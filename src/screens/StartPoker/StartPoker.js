import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Button, Icon } from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const StartPoker = (props) => {
    const [sessionNumber, setSesionNumber] = useState("111222");
    const [description, setDescription] = useState();
    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('./../../assets/logo.png')}/>
                <TextInput
                    style={styles.sessionNumberTextInput}
                    editable={false}
                    value={sessionNumber}/>
                <View style={styles.sessionButtonsArea}>
                    <Image source={require('./../../assets/copy.png')} style={styles.sessionButtonImage}/>
                    <Image source={require('./../../assets/refresh.png')} style={styles.sessionButtonImage}/>
                    <Image source={require('./../../assets/share.png')} style={styles.sessionButtonImage}/>
                </View>
                <TextInput
                    style={styles.descriptionText}
                    placeHolder="Session Description"
                    onChangeText={text => setDescription(text)}
                    value={description}/>
                <Button style={styles.createSessionButton}>
                    <Image source={require('./../../assets/meeting.png')} style={styles.sessionButtonImage}/>
                    <Text style={styles.createSessionButtonText}>Create Session</Text>
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};


const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    }
});

export default StartPoker;
