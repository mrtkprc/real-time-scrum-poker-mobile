import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ListItem = (props) => {
    const oldParticipantColors = {
        bgColor: {backgroundColor: 'gray'},
        textColor: {color: 'black'}
    };

    const newParticipantColors = {
        bgColor: {backgroundColor: 'green'},
        textColor: {color: 'white'}
    };

    const [participantColors, setParticipantColors] = useState(oldParticipantColors);

    const [isNewParticipant, setIsNewParticipant] = useState(props.isNewParticipant);

    if (isNewParticipant) {
        setParticipantColors(newParticipantColors);

        setIsNewParticipant(false);

        setTimeout(() => {
            setParticipantColors(oldParticipantColors);
        }, 1000);
    }

    return (
        <View style={[styles.container, participantColors.bgColor]}>
            <Text style={[styles.name, participantColors.textColor]}>
                {props.item.nickname}
            </Text>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: 40,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#f1f1f1',
    },
    name: {
        fontSize: 24,
        marginLeft: 15,
    },
});
export default ListItem;
