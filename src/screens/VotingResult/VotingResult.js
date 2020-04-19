import React from 'react';
import { View, Text, Button } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const VotingResult = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Voting Result</Text>
            <Button title={"Go Back"} onPress={() => navigation.goBack() }/>
        </View>
    );
};

export default VotingResult;
