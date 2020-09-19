import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
const NotificationArea = ({notificationText}) => {
    return (
        <LinearGradient colors={['#cfd9df', '#e2ebf0']} style={styles.notificationArea}>
            <ScrollView>
                <Text>{notificationText}</Text>
            </ScrollView>
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    notificationArea:{
        width:'100%',
        height: 50,
        paddingLeft: 5,
        paddingTop: 5
    },
});

export default NotificationArea;
