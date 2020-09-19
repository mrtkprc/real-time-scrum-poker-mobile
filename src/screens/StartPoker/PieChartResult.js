import React from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import {PieChart} from "react-native-chart-kit";
import {detectPieChartColors, compareVote} from "../../helpers/VoteResultHelper";

const PieChartResult = ({data}) => {
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    }
    const composeChartData = ({voteResults}) => {
        const sortedVotes = voteResults && voteResults.sort(compareVote);
        const returningData = sortedVotes.map((voteResult) => {
            let {vote, total} = voteResult;
            const isSpTextAdded = !(vote === "Inf" || vote === "Q" || vote === "C");
            vote = !isSpTextAdded && vote === "C" ? "Coffee" : vote;
            const detectedColor = detectPieChartColors(vote);
            return {
                total,
                name: "("+(isSpTextAdded ? "SP-"+vote : vote)+")",
                legendFontColor: detectedColor,
                color: detectedColor,
                legendFontSize: 16
            }
        })
        return returningData;
    };
    return (
        <View>
            <PieChart
                data={composeChartData(data)}
                width={screenWidth}
                height={260}
                chartConfig={chartConfig}
                accessor="total"
                backgroundColor={"#e2eff5"}
                paddingLeft="15"
                absolute/>
        </View>

    );
};

export default PieChartResult;
