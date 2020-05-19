const votes = ["0","0.5","1","3","5","8","13","20","40","100","Q","Inf","Coffee"];
export function detectPieChartColors(givenVote) {
    const defaultLegendFontSize = "#000000";
    const defaultColor = "#000000";
    let selectedColor = "#000000";
    const detectedColors = {
        legendFontSize: defaultLegendFontSize,
        color: defaultColor
    };
    if(givenVote === "0"){
        selectedColor = "#d57575";
    }else if(givenVote === "0.5"){
        selectedColor = "#474747";
    }else if(givenVote === "1"){
        selectedColor = "#0ae3e3";
    }else if(givenVote === "3"){
        selectedColor = "#6d6d00";
    }else if(givenVote === "5"){
        selectedColor = "#12aa12";
    }else if(givenVote === "8"){
        selectedColor = "#097474";
    }else if(givenVote === "13"){
        selectedColor = "#0d0da5";
    }else if(givenVote === "20"){
        selectedColor = "#760776";
    }else if(givenVote === "40"){
        selectedColor = "#bd1343";
    }else if(givenVote === "100"){
        selectedColor = "#ef0e0e";
    }else if(givenVote === "Q"){
        selectedColor = "#017ed5";
    }else if(givenVote === "Inf"){
        selectedColor = "#100f0f";
    }else if(givenVote === "C"){
        selectedColor = "#663800";
    }

    return selectedColor;
}
function convertWeightedValue (value) {
    if (value === "C") return -1.0;
    if (value === "Inf") return 1000;
    if (value === "Q") return 10000;
    return parseFloat(value);
}
export function compareVote(a, b){
    const x = convertWeightedValue(a.vote);
    const y = convertWeightedValue(b.vote);
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}
export function findOutlierValues(data) {
    let lowestValue = "1000";
    let highestValue = "0";
    let isCoffeeShown = false;
    return new Promise((resolve, reject)=>{
        if(data.length > 0){
            data.forEach(({participant:{nickname,vote}}) => {
                let value = vote && vote.vote;
                if(value === "Q") return;
                if(value === "C") {
                    isCoffeeShown = true;
                    return;
                }
                if(value === "Inf"){
                    value = 1000;
                }else{
                    value = parseInt(value);
                }
                if(value < lowestValue)
                    lowestValue = value;
                if(highestValue < value)
                    highestValue = value;
            })
            const outlierValues = [];
            outlierValues.push(lowestValue);
            outlierValues.push(highestValue);
            outlierValues.push(isCoffeeShown);
            resolve(outlierValues);
        }
        reject("Error in finding outlier values");
    })
}
export function findOutlierParticipantVotes(data, lowestValue, highestValue){
    let searchingValueForLowest = lowestValue;
    let searchingValueForHighest = highestValue;
    if(highestValue === 1000)
        searchingValueForHighest = "Inf";

    const result = [];
    const resultForLowest = [];
    const resultForHighest = [];

    return new Promise((resolve, reject)=>{
        if(data.length > 0){
            data.forEach(({participant:{nickname,vote}}) => {
                if(vote.isGiven === 1 && vote.vote === String(searchingValueForLowest)){
                    resultForLowest.push({
                        id: vote.id,
                        nickname:nickname,
                        vote: vote.vote
                    })
                }

                if(vote.isGiven === 1 && vote.vote === String(searchingValueForHighest)){
                    resultForHighest.push({
                        id: vote.id,
                        nickname:nickname,
                        vote: vote.vote
                    })
                }
            })
            result.push(resultForLowest);
            result.push(resultForHighest);
            resolve(result);
        }
        reject("Error in findOutlierParticipantVotes");
    })
}
