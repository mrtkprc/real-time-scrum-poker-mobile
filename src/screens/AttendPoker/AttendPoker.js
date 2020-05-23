import React, {useRef} from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_PARTICIPANT_MUTATION} from './queries';
import {useNavigation} from '@react-navigation/native';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import LinearGradient from 'react-native-linear-gradient';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { AdMobBanner } from 'react-native-admob';

const AttendPoker = () => {
    const fullNameRef = useRef();
    const joinPokerRef = useRef();
    const [addParticipant, {loading, error}] = useMutation(CREATE_PARTICIPANT_MUTATION);
    const navigation = useNavigation();


    const formSubmitted = (values) => {
        if(values.fullName.length < 3){
            alert("Please, type 3 characters for full name.")
        }else{
            addParticipant({variables:{nickname: values.fullName, sessionNumber: parseInt(values.sessionNumber)}})
                .then(addedData => {
                    const {data: {createParticipant:{id, isManager, session}}} = addedData;
                    navigation.navigate('PokerTable',{
                        sessionId: session.id,
                        isManager,
                        sessionNumber: session.sessionNumber,
                        participantId: id,
                    })
                })
                .catch(errorParticipant => {
                    console.log("Error at Attend Poker: ", errorParticipant);
                });
        }
    };

    const startPokerPressed = () => {
        navigation.navigate('StartPoker');
    };

    return (
        <Formik onSubmit={formSubmitted} initialValues={{sessionNumber: '', fullName: ''}}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <>
                { loading && <Loading text="Loading Poker Table" />}
                { error && <Error text="Error occurred. Please Check Session Number"/>}
                <LinearGradient colors={['#30cfd0', '#330867']} style={styles.container}>
                    <KeyboardAwareScrollView style={{flex:1}}>
                        <View style={styles.headerTextView}>
                            <Text style={styles.headerText} >Real Time Scrum Poker</Text>
                        </View>
                        <View style={styles.logoView}>
                            <Image source={require('../../../assets/images/ic_launcher.png')} style={styles.logo} />
                        </View>
                        <View style={styles.inputArea}>
                            <Fumi style={styles.inputText}
                                inputStyle={{color:'#000000', fontWeight: 'bold'}}
                                labelStyle={{color:'#0b2d68', fontFamily:'Tahoma'}}
                                label={'Session Number'}
                                value={values.sessionNumber}
                                keyboardType='number-pad'
                                maxLength={6}
                                returnKeyType = { "next" }
                                iconClass={FontAwesomeIcon}
                                iconName={'key'}
                                blurOnSubmit={false}
                                onSubmitEditing={() => fullNameRef.current.focus()}
                                iconColor={'#eab921'}
                                iconSize={24}
                                iconWidth={45}
                                inputPadding={20}
                                onChangeText={handleChange('sessionNumber')}
                            />
                        </View>
                        <View style={styles.inputArea}>
                            <Fumi ref={fullNameRef}
                                  inputStyle={{color:'#000000', fontWeight: 'bold'}}
                                  style={styles.inputText}
                                  value={values.fullName}
                                  labelStyle={{color:'#0b2d68', fontFamily:'Tahoma'}}
                                  label={'Full Name'}
                                  iconClass={FontAwesomeIcon}
                                  iconName={'user'}
                                  iconColor={'#eab921'}
                                  iconSize={24}
                                  iconWidth={45}
                                  inputPadding={20}
                                  onSubmitEditing={() => formSubmitted(values)}
                                  returnKeyType = { "go" }
                                  blurOnSubmit={false}
                                  onChangeText={handleChange('fullName')}
                            />
                        </View>
                        <View style={styles.joinPokerAreaView}>
                            <TouchableOpacity ref={joinPokerRef} onPress={handleSubmit} style={styles.joinPokerArea}>
                                <Text style={styles.joinPokerText}>Join Poker</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.centerView]}>
                            <Text style={{color:'#b4a8a8', marginTop: 10, fontWeight: 'bold'}}>Or</Text>
                        </View>
                        <View style={[styles.centerView]}>
                            <TouchableOpacity onPress={startPokerPressed} style={styles.startPokerArea}>
                                <Text style={styles.startPokerText}> Start A Poker </Text>
                            </TouchableOpacity>
                        </View>
                </KeyboardAwareScrollView>
                <View style={styles.adMobArea}>
                    <AdMobBanner
                        adSize="banner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111"
                        onAdFailedToLoad={error => console.error(error)} />
                </View>
                </LinearGradient>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerTextView:{
        alignItems: 'center',
    },
    headerText:{
        marginTop: 10,
        color: '#6f6c6c',
        fontFamily:'Girassol-Regular',
        fontSize: 30,
    },
    logoView:{
        alignItems: 'center',
    },
    logo:{
        marginVertical: 10,
        width: 128,
        height: 128
    },
    inputArea:{
        flexDirection: 'row',
        marginTop: 5
    },
    inputText:{
        width: '95%',
        marginLeft: 10,
        opacity:0.8,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        fontFamily: 'Roboto'
    },
    joinPokerAreaView:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinPokerArea:{
        width: '95%',
        marginTop:10,
        height:40,
        borderRadius: 20,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0ade04'
    },
    joinPokerText:{
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    centerView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    startPokerArea:{
        marginTop: 1,
        width: '50%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startPokerText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    adMobArea:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});

export default AttendPoker;
