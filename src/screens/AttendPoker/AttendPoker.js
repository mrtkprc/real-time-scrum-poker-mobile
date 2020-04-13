import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_PARTICIPANT_MUTATION} from './queries';
import {useNavigation} from '@react-navigation/native';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import LinearGradient from 'react-native-linear-gradient';
import {Item, Input, Icon} from 'native-base';
const AttendPoker = () => {
    const [addParticipant, {loading, error} ] = useMutation(CREATE_PARTICIPANT_MUTATION);
    const navigation = useNavigation();
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    const formSubmitted = (values) => {
        addParticipant({variables:{nickname: values.fullName, sessionNumber: parseInt(values.sessionNumber)}})
            .then(addedData => {
                const {data: {createParticipant:{id, session}}} = addedData;
                navigation.navigate('PokerTable',{
                    sessionId: session.id,
                    sessionNumber: session.sessionNumber,
                    participantId: id,
                })
            })
            .catch(errorParticipant => {
                console.log("Error at Attend Poker: ", errorParticipant);
            });
    };

    const startPokerPressed = () => {
        navigation.navigate('StartPoker');
    };

    return (
        <Formik onSubmit={formSubmitted} initialValues={{sessionNumber: '123456', fullName: 'ork'}}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <>
                { loading && <Loading text="Loading Poker Table" />}
                { error && <Error/>}
                <LinearGradient colors={['#30cfd0', '#330867']} style={styles.container}>
                    <Text>Real Time Scrum Poker</Text>
                    <Image source={require('./../../assets/logo.png')} style={styles.logo} />
                    <View style={styles.sessionNumberInputArea}>
                        <TextInput style={styles.sessionNumberInput} placeholder='Session Number'/>
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
    logo:{
        marginVertical: 10,
        width: 200,
        height: 200
    },
    sessionNumberInputArea:{
        width: '80%',
    },
    sessionNumberInput:{
        opacity: 0.5,
        borderRadius: 40,
        paddingLeft: 10,
        backgroundColor: 'white'
    }

});

export default AttendPoker;
