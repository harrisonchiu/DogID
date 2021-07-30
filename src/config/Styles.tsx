import { StyleSheet } from 'react-native';

import { Colours } from '@config/Colours';


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colours.gray[900],
    },
    screenContainerWithText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colours.lightGreen[500],
    },
    screenContainerText: {
        fontSize: 20,
    },

    camera: {

    },
    cameraTopBar: {
        alignItems: 'center',
        backgroundColor: Colours.gray[900],
    },
    cameraBottomBar: {
        alignItems: 'center',
        backgroundColor: Colours.gray[900],
    },
    buttonsTopPaddingBar: {
        flex: 0.8,
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    captureButtonContainer: {
        alignItems: 'center',
        backgroundColor: Colours.transparent,
    },
    captureButton: {
        height: '100%',
        width: '100%',
        borderRadius: 50,
        backgroundColor: Colours.red[500],
    },

    predictionTopBar: {
        alignItems: 'center',
        backgroundColor: Colours.gray[900],
    },
    predictionContainer: {
        alignItems: 'center',
        backgroundColor: '#f8f6f3',
    },
    predictionScrollView: {
        flex: 1,
        backgroundColor: Colours.transparent,
    },
    predictionScrollViewTopBar: {
        flex: 0.08,
    },
    predictionScrollViewBottomBar: {
        flex: 0.08,
    }
});


export { styles };