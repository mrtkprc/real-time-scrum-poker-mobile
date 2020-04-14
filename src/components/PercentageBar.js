import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

const PercentageBar = (props) => {
    return (
        <View style={styles.container}>
            <Progress.Bar
                borderRadius={40}
                borderWidth={2}
                unfilledColor={"#b1adad"}
                borderColor={"#ffffff"}
                color={"#157efa"}
                width={null}
                progress={0.7}
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
