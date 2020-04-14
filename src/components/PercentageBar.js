import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

const PercentageBar = (props) => {
    let totalParticipantCount = 0;
    let committedVoteCount = 0;
    const reducer = function (accumulator, item) {
        const value = item.vote !== null && item.vote.isGiven === 1 ? 1 : 0;
        return accumulator + value;
    };
    if(props.participantList)
    {
        totalParticipantCount = props.participantList.length;
        committedVoteCount = props.participantList.reduce(reducer, 0);
    }

    const progressBarPercentage = totalParticipantCount !== 0 ? Math.ceil((committedVoteCount/totalParticipantCount)*100)/100 :0

    return (

        <View style={styles.container}>
            <Progress.Bar
                borderRadius={40}
                borderWidth={2}
                unfilledColor={"#b1adad"}
                borderColor={"#ffffff"}
                color={"#157efa"}
                width={null}
                progress={progressBarPercentage}
                height={25}  />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop:2,
        paddingHorizontal: 3,
    }
})


export default PercentageBar;
