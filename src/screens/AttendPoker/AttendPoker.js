import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Container, Content, Item, Input, Thumbnail, Button, Text,  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import {useQuery} from '@apollo/react-hooks';
import {POKEMONS_QUERY} from './queries';

const AttendPoker = () => {
    //const {error, loading, data} = useQuery(POKEMONS_QUERY);

    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    return (
        <Formik
            onSubmit={values => alert(JSON.stringify(values))}
            initialValues={{ sessionNumber: '', fullName:'' }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <Container style={styles.container}>
                    <Content>
                        <Thumbnail style={styles.logo} large source={{uri: uri}} />
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
                            <Icon style={{marginLeft: 10}} size={48} color='#06E399' active name='user' />
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
                            <Icon type="FontAwesome" size={32} color='white' name='user' />
                            <Text style={styles.createSessionButtonText}>Create Session</Text>
                        </Button>
                    </Content>
                    <TouchableOpacity style={styles.startAPokerButton}>
                        <Text style={{color: 'yellow', fontSize: 18, fontWeight: 'bold'}}>Start A Poker</Text>
                    </TouchableOpacity>
                </Container>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column'
    },
    header:{
        backgroundColor: "#06BEE3",
    },
    headerTitle:{
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sessionNumberItem:{
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    },
    sessionNumberInput:{
        textAlign: 'center',
        fontSize: 24,
    },
    fullNameItem:{
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        borderColor: '#06BEE3',
        borderWidth: 3
    },
    fullNameInput:{
        textAlign: 'center',
        fontSize: 24,
        marginLeft: -40
    },
    createSessionButton:{
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#06BEE3',
        marginBottom: 10
    },
    createSessionButtonText:{
        fontSize: 22,
    },
    startAPokerButton:{
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
