import { StyleSheet } from 'react-native';

import { StyleColours } from '@config/Colours';


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: StyleColours.screenBackground,
    },
    screenContainerWithText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: StyleColours.screenBackgroundWithText,
    },
    screenContainerText: {
        fontSize: 20,
    },

    camera: {

    },
    cameraTopBar: {
        alignItems: "center",
        backgroundColor: StyleColours.cameraTopBar,
    },
    cameraBottomBar: {
        alignItems: "center",
        backgroundColor: StyleColours.cameraBottomBar,
    },
    captureButtonContainer: {
        alignItems: "center",
        backgroundColor: StyleColours.captureButtonContainer,
    },
    captureButton: {
        height: "100%",
        width: "100%",
        borderRadius: 50,
        backgroundColor: StyleColours.captureButton,
    },

    predictionScrollView: {
        flex: 1,
        backgroundColor: StyleColours.predictionScrollViewBackground,
    },
    predictionScrollViewTopBar: {
        flex: 0.15,
    },
    predictionScrollViewBottomBar: {
        flex: 0.15
    }
});


export { styles };