import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
    const { nickname, vote } = props.item;
    return (
        <View style={[styles.container, participantColors.bgColor]}>
            <Text style={[styles.name, participantColors.textColor]}>
                {nickname}
            </Text>
            <Text style={styles.voteStatus}>
                {vote && vote.isGiven === 1 ? "Yes" : "No"}
            </Text>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#f1f1f1',
    },
    name: {
        flex: 3,
        fontSize: 24,
        marginLeft: 15,
    },
    voteStatus: {
        flex: 1,
        fontSize: 24,
        marginRight: 10,
        textAlign: 'right',
    }

});
export default ListItem;
