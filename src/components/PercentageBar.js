import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

const PercentageBar = (props) => {
    return (
        <View style={styles.container}>
            <Progress.Bar
                borderWidth={2}
                unfilledColor={"#b1adad"}
                borderColor={"#ffffff"}
                color={"#559c21"}
                width={null}
                progress={0.0}
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
