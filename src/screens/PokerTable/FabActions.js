import React, { useState } from 'react';
import {Button, Fab, Icon} from "native-base";
import {View} from "react-native";

const FabActions = (props) => {
    const [isFabActive, setIsFabActive] = useState(false);
    return (
        <View style={{display:'flex'}}>
            <Fab
                active={isFabActive}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => setIsFabActive(!isFabActive)}>
                <Icon name="settings" />
                <Button>
                    <Icon name="stopwatch" />
                </Button>
                <Button style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="warning" />
                </Button>
            </Fab>
        </View>
    );
};

export default FabActions;
