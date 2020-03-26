import React from 'react';
import  {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const Card = (props) => {
    const handlePress = (data) => {
        props.cardPressed(data);
    };

    return (
        <TouchableOpacity
            onPress={() => handlePress(props.point)}
            style={[styles.card,{backgroundColor: props.isCardSelected ? 'green': 'white'}]}>

                <Text style={styles.text}>
                    {props.point}
                </Text>

        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
        borderWidth: 1,
        borderColor:'red'
    },
});

export default Card;
