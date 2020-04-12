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
    return (
        <LinearGradient colors={participantColors.bgColors} style={[styles.container]}>
            <Text style={[styles.name, participantColors.textColor]}>
                {nickname}
            </Text>
            <View style={styles.voteStatus}>
                {vote && vote.isGiven && vote.isGiven === 1
                    ?
                        <Image style={styles.voteStatus} source={require('./../../assets/up_vote.png')} />
                    :
                        <></>
                }
            </View>
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
        marginLeft: 5,
    },
    voteStatus:{
        justifyContent: 'flex-end'
    }
});
export default ListItem;
