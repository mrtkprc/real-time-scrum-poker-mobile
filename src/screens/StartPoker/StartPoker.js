import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ImageBackground, Clipboard } from "react-native";
import { Button } from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-root-toast';
import {CREATE_SCRUM_MASTER_WITH_SESSION_MUTATION} from './queries'
import {useMutation} from "@apollo/react-hooks";
import {useNavigation} from '@react-navigation/native';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { AdMobBanner } from 'react-native-admob';

const StartPoker = (props) => {
    const generateRandomSessionNumber = () => {
        return String(Math.floor(100000 + Math.random() * 900000));
    };
    const [sessionNumber, setSesionNumber] = useState(generateRandomSessionNumber());
    const [description, setDescription] = useState("");
    const [ createSessionMutation, { loading: createSessionMutationLoading, error: createSessionMutationError }] = useMutation(CREATE_SCRUM_MASTER_WITH_SESSION_MUTATION);

    const navigation = useNavigation();

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
        createSessionMutation({variables:{sessionNumber: parseInt(sessionNumber), description}})
            .then(({data:{createScrumMasterWithSession}}) => {
                navigation.navigate('PokerTable', {
                    sessionId: createScrumMasterWithSession.session.id,
                    isManager: createScrumMasterWithSession.isManager,
                    participantId: createScrumMasterWithSession.id,
                    sessionNumber: createScrumMasterWithSession.session.sessionNumber,
                });
            })
            .catch((error)=> {
            setSesionNumber(generateRandomSessionNumber());
        });

    };

    return (
        <ImageBackground source={require('../../../assets/images/start-poker-bg.jpg')} style={{flex:1, width: '100%', height:'100%', resizeMode: "stretch"}}>
            <ImageBackground style={{flex:1, backgroundColor: 'black', opacity: 0.75}}>
                <KeyboardAwareScrollView style={styles.container}>
                    {createSessionMutationLoading && <Loading text={"Loading..."} />}
                    {createSessionMutationError && <Error text={"Error occurred. Please try again."} />}
                    <View style={styles.layoutContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../../assets/images/ic_launcher.png')}/>
                        <Fumi style={styles.sessionNumberTextInput}
                              inputStyle={{color:'black', fontWeight: 'bold', fontSize:28, paddingTop:5}}
                              labelStyle={{color:'#0b2d68', fontFamily:'Tahoma', fontWeight: 'bold'}}
                              value={sessionNumber}
                              label={'Session Number'}
                              editable={false}
                              iconClass={FontAwesomeIcon}
                              iconName={'key'}
                              iconColor={'#ac0238'}/>
                        <View style={styles.sessionButtonsArea}>
                            <TouchableOpacity onPress={copySessionNumber}>
                                <FontAwesomeIcon color={"#eee532"} size={48} name={"copy"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={refreshSessionNumber}>
                                <FontAwesomeIcon color={"#eee532"} size={48} name={"refresh"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={shareSessionNumber}>
                                <FontAwesomeIcon color={"#eee532"} size={48} name={"share-alt"} />
                            </TouchableOpacity>
                        </View>
                        <Button onPress={createSession} style={styles.createSessionButton}>
                            <Image source={require('../../../assets/images/meeting.png')} style={styles.sessionButtonImage}/>
                            <Text style={styles.createSessionButtonText}>Start Scrum Poker</Text>
                        </Button>
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.adMobArea}>
                    <AdMobBanner
                        adSize="banner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111"
                        onAdFailedToLoad={error => console.error(error)}
                    />
                </View>
            </ImageBackground>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
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
        marginTop: 10,
        color: 'black',
        width: '90%',
        borderRadius: 10,
        fontSize:24,
        fontWeight: 'bold'
    },
    sessionButtonsArea:{
        marginTop: 10,
        paddingVertical: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
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
        backgroundColor: '#46dbba'
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
    },
    adMobArea:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
});

export default StartPoker;
