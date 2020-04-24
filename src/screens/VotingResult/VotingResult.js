import React from 'react';
import { View, ScrollView, Text, Button, Dimensions } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@apollo/react-hooks";
import {VOTE_RESULTS_QUERY} from './queries';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PieChartResult from "../StartPoker/PieChartResult";

//bullhorn megafon simgesi için
const VotingResult = ({route}) => {
    const navigation = useNavigation();
    //TODO:MK - route.params.sessionId
    const {loading, error, data} = useQuery(VOTE_RESULTS_QUERY, {
        variables: {"sessionId": "5e971201cd920e37abb12447"},
    });

    if (loading) return <Loading text={"Results is coming."}/>;
    if (error) return <Error text={error} />
    return (
        <ScrollView style={styles.container}>
            <PieChartResult data={data}/>
            <View style={styles.outlierValuesArea}>
                <View style={styles.outlierArea}>
                    <Text>Highest: 13</Text>
                </View>
                <View style={styles.outlierArea}>
                    <Text>Lowest: 0.5</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', margin:5}}>
                <Text>Highest and Lowest Sides</Text>
            </View>
            <View style={styles.outlierParticipantsArea}>
                <View style={styles.outlierParticipantsForHighestArea}>
                    <Text>Highest</Text>
                </View>
                <View style={styles.outlierParticipantsForLowestArea}>
                    <Text>Lowest</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', margin:5}}>
                <Text>Other Participants</Text>
            </View>
            <View style={styles.otherParticipantsArea}>
                <View><Text>Other Participants</Text></View>
            </View>
            <View style={styles.buttonArea}>
                <View style={{flex:1, margin: 5}}><Button title={"Go Back"} onPress={() => navigation.goBack() }/></View>
                <View style={{flex:1, margin: 5}}><Button title={"Go Back"} onPress={() => navigation.goBack() }/></View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container:{
        flex:1,
        backgroundColor: 'yellow'
    },
    outlierValuesArea:{
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    outlierArea:{
        margin: 10
    },
    outlierParticipantsArea:{
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    outlierParticipantsForHighestArea:{
        padding: 5,
        flex:1,
        backgroundColor: 'red'
    },
    outlierParticipantsForLowestArea:{
        padding: 5,
        flex:1,
        backgroundColor: 'blue'
    },
    otherParticipantsArea:{
        paddingLeft: 10,
        marginBottom: 5,
        backgroundColor: 'orange'
    },
    buttonArea:{
        flexDirection: 'row',
        backgroundColor: 'pink'
    }
}

export default VotingResult;
