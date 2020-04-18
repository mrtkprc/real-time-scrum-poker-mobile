import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ListItem = (props) => {
    const oldParticipantColors = {
        textColor: {color: '#423f3f'},
        bgColors: ['#cfd9df', '#e2ebf0']
    };

    const newParticipantColors = {
        textColor: {color: '#a30909'},
        bgColors: ['#43e97b', '#38f9d7']
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
    const textStyle = props.isManager ? [styles.name, {color: "#8b0000"}] : [styles.name, participantColors.textColor];
    return (
        <LinearGradient colors={participantColors.bgColors} style={[styles.container]}>
            <View style={styles.voteStatus}>
                {vote && vote.isGiven && vote.isGiven === 1
                    ?
                        <Image source={require('../../../assets/images/up_vote.png')} />
                    :
                        <></>
                }
            </View>
            <Text style={textStyle}>
                {nickname}
            </Text>
        </LinearGradient>
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
        borderColor: '#424141',
    },
    name: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    voteStatus:{
        justifyContent: 'flex-end',
        width: 20,
        marginLeft: 5,
    }
});
export default ListItem;
