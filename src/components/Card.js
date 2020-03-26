import React from 'react';
import  {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
const Card = (props) => {
    const handlePress = (data) => {
        props.cardPressed(data);
    };
    const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
        <TouchableOpacity
            onPress={() => handlePress(props.point)}
            style={[styles.card]}>
                <ImageBackground
                    style={[styles.card,{width: '100%', height: '100%'}]}
                    resizeMode={'stretch'}
                    source={props.isCardSelected ? require('./../assets/card_back_green.png') : require('./../assets/card_back_red.png')}>

                    <Text style={styles.text}>
                        {props.point}
                    </Text>

                </ImageBackground>
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
        borderColor:'gray'
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        width: 50,
        height: 50,
        margin: 0,
        textAlign: 'center',
        textAlignVertical:'center',
        backgroundColor: 'black',
        color: 'white'
    }
});

export default Card;
