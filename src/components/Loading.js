import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
const Loading = (props) => {
    return (
        <View style={styles.container}>
            <Text>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

export default Loading;
