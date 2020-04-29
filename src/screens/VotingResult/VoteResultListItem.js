import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const VoteResultListItem = (props) => {
    return (
        <LinearGradient colors={props.colors} style={[styles.container]}>
            <Text style={styles.nickname}>
                {props.nickname}
            </Text>
            <Text style={styles.vote}>
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
    nickname: {
        flex: 1,
        justifyContent: 'flex-start',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    vote:{
        fontSize: 18,
        justifyContent: 'flex-end',
        paddingRight:5
    }
});

export default VoteResultListItem;
