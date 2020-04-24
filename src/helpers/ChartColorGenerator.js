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
