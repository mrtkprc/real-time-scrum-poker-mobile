import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, TextInput, View} from 'react-native';
import {Container, Content, Item, Input, Thumbnail, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import {useLazyQuery, useMutation} from '@apollo/react-hooks';
import {FIND_SESSION_BY_NUMBER_QUERY, CREATE_PARTICIPANT_MUTATION} from './queries';
import {useNavigation} from '@react-navigation/native';

const AttendPoker = () => {
    const [submittedValues, setSubmittedValues] = useState({});
    const [addParticipant,  addParticipantData ] = useMutation(CREATE_PARTICIPANT_MUTATION);
    const [getSessionInformation, {loading, data, error, called}] = useLazyQuery(FIND_SESSION_BY_NUMBER_QUERY);
    const navigation = useNavigation();
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const formSubmitted = (values) => {
        setSubmittedValues(values);
        getSessionInformation({variables: {sessionNumber: parseInt(values.sessionNumber)}});
    };

    if (data && data.findSessionBySessionNumber) {
        if(!addParticipantData.called)
        {
            addParticipant({variables:{nickname: submittedValues.fullName, sessionNumber: parseInt(submittedValues.sessionNumber)}})
                .then(addedParticipantData => {
                    navigation.navigate('PokerTable', {
                        sessionId: data.findSessionBySessionNumber.id,
                        sessionNumber: data.findSessionBySessionNumber.sessionNumber,
                    });
                })
                .catch(errorParticipant => alert(JSON.stringify(errorParticipant)));
        }
    }

    //TODO:MK - addParticipantData.loading&error will be modified for more well UI.
    return (
        <Formik
            onSubmit={formSubmitted}
            initialValues={{sessionNumber: '', fullName: ''}}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <>
                { loading && <View><Text>Loading</Text></View>}
                { error && <View><Text>Error</Text></View>}
                { addParticipantData.loading && <View><Text>Forwarding to PokerTable....</Text></View>}
                { addParticipantData.error && <View><Text>Adding User to session failed.</Text></View>}
                <Container style={styles.container}>
                    <Content>
                        <Thumbnail style={styles.logo} large source={{uri: uri}}/>
                        <Item style={styles.sessionNumberItem} rounded>
                            <TextInput
                                name={"sessionNumber"}
                                value={values.sessionNumber}
                                onChangeText={handleChange('sessionNumber')}
                                maxLength={6}
                                style={styles.sessionNumberInput}
                                keyboardType='number-pad'
                                placeholder='Session Number'/>
                        </Item>
                        <Item style={styles.fullNameItem} regular>
                            <Icon style={{marginLeft: 10}} size={48} color='#06E399' active name='user'/>
                            <Input
                                name={"fullName"}
                                value={values.fullName}
                                onChangeText={handleChange('fullName')}
                                style={styles.fullNameInput}
                                placeholder='Full Name'/>
                        </Item>
                    </Content>
                    <Content>
                        <Button onPress={handleSubmit} style={styles.createSessionButton} iconLeft success full>
                            <Icon type="FontAwesome" size={32} color='white' name='user'/>
                            <Text style={styles.createSessionButtonText}>Create Session</Text>
                        </Button>
                    </Content>
                    <TouchableOpacity style={styles.startAPokerButton}>
                        <Text style={{color: 'yellow', fontSize: 18, fontWeight: 'bold'}}>Start A Poker</Text>
                    </TouchableOpacity>
                </Container>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        backgroundColor: "#06BEE3",
    },
    headerTitle: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sessionNumberItem: {
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    },
    sessionNumberInput: {
        textAlign: 'center',
        fontSize: 24,
    },
    fullNameItem: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        borderColor: '#06BEE3',
        borderWidth: 3
    },
    fullNameInput: {
        textAlign: 'center',
        fontSize: 24,
        marginLeft: -40
    },
    createSessionButton: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#06BEE3',
        marginBottom: 10
    },
    createSessionButtonText: {
        fontSize: 22,
    },
    startAPokerButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        backgroundColor: "#333",
        height: 50,
        textAlign: 'center',
        paddingBottom: 10,
    }
});

export default AttendPoker;
