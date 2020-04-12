import React from 'react';
import {View,Text,StyleSheet, ActivityIndicator} from 'react-native';
const Loading = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={"#d00d0d"} size="large" />
            <Text style={styles.loadingText}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bec4c2',
        height: 40
    },
    loadingText: {
        fontFamily: 'Tahoma, Verdana, Arial, Sans',
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 10,
    }
})

export default Loading;
