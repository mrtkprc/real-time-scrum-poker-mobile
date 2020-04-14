import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
const Error = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textColor}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
   container:{
       width: '100%',
       backgroundColor: '#ff0000',
   },
   textColor:{
       color: '#ffffff',
       fontSize: 16,
       fontWeight: 'bold',
       textAlign: 'center'
   }
});

export default Error;
