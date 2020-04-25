import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const VoteResultListItem = (props) => {
    return (
        <LinearGradient colors={["#fff000","#ffffff"]} style={[styles.container]}>
            <Text>
                {props.nickname}
            </Text>
            <Text>
                {props.vote}
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 30,
        borderBottomWidth: 1,
        borderColor: '#424141',
    },
    name: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    voteStatus:{
        justifyContent: 'flex-end',
        width: 20,
        marginLeft: 5,
    }
});

export default VoteResultListItem;
