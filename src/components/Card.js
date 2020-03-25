import React from 'react';
import  {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const Card = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.card]}>
            <Text style={styles.text}>
                {props.point}
            </Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
        borderWidth: 1,
        borderColor:'red'
    },
});

export default Card;
