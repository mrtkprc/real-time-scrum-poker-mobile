import React, {useState} from 'react';
import {Button, Fab, Icon} from "native-base";
import {Alert, View} from "react-native";
import {useMutation} from "@apollo/react-hooks";
import { FORWARD_TEAM_TO_DEFINITE_SCREEN_MUTATION } from "./queries";

const FabActions = ({sessionId}) => {
    const [isFabActive, setIsFabActive] = useState(false);
    const [forwardTeamToResultScreen] = useMutation(FORWARD_TEAM_TO_DEFINITE_SCREEN_MUTATION);

    const _startNewVoting = () => {
        Alert.alert("Are you sure?", "Current voting will be over and start new voting?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes, Start New Voting.",
                onPress: () => {
                    setIsFabActive(false);
                }
            }
        ], {cancelable: true});
        return true;
    }
    const _endUpVotingAndForwardResult = () => {
        Alert.alert("Are you willing really to see results?", "Voting will be ended up and your team will be forwarded to result screen?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes, We can see results.",
                onPress: () => {
                    forwardTeamToResultScreen({
                        variables:{
                            sessionId,
                            screenName: 'VotingResult',
                            delayDuration: 3
                        }
                    }).then(data => {
                        setIsFabActive(false);
                    }).catch(error => console.log(error));

                }
            }
        ], {cancelable: true});
        return true;
    }
    return (
        <View style={{display: 'flex'}}>
            <Fab
                active={isFabActive}
                direction="up"
                containerStyle={{}}
                style={{backgroundColor: '#5067FF'}}
                position="bottomRight"
                onPress={() => setIsFabActive(!isFabActive)}>
                <Icon name="settings"/>
                <Button onPress={_startNewVoting}>
                    <Icon type={"Foundation"} name="refresh"/>
                </Button>
                <Button onPress={_endUpVotingAndForwardResult} style={{backgroundColor: '#DD5144'}}>
                    <Icon type={"FontAwesome5"} name="stopwatch"/>
                </Button>
            </Fab>
        </View>
    );
};

export default FabActions;
