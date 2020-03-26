import React from 'react';
import  {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
const Card = (props) => {
    const handlePress = (data) => {
        props.cardPressed(data);
    };
    let imagePicture = "";
    switch (props.point) {
        case "Q":
            imagePicture = require('./../assets/Q.png');
            break;
        case "C":
            imagePicture = require('./../assets/C.png');
            break;
        case "Inf":
            imagePicture = require('./../assets/Inf.png');
            break;
        default:
            imagePicture = require('./../assets/Q.png');
            break;

    }
    return (
        <TouchableOpacity
            onPress={() => handlePress(props.point)}
            style={[styles.card, {backgroundColor: props.isCardSelected ? '#9bd1a8': '#feffdb' }]}>
            {
                props.isImage
                ?
                    <Image source={imagePicture}/>
                :
                    <Text style={styles.text}>{props.point}</Text>
            }

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
        fontSize: 26,
        fontWeight: 'bold',
        width: 50,
        height: 50,
        margin: 0,
        textAlign: 'center',
        textAlignVertical:'center',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 24
    }
});

export default Card;
