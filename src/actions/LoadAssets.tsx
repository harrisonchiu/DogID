import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

import { Logger } from '@actions/Log';
import { BreedNames } from '@config/BreedNames';

const modelJson = require('@assets/Models/efficientnetb1-noisystudent-tfjs/model.json');
const modelWeights: any[] = [
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard1of7.bin'),
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard2of7.bin'),
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard3of7.bin'),
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard4of7.bin'),
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard5of7.bin'),
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard6of7.bin'),
    require('@assets/Models/efficientnetb1-noisystudent-tfjs/group1-shard7of7.bin'),
]

const breedNames: string[] = BreedNames;

const loadTensorflow = async(): Promise<void> => {
    Logger.info('Started loading tensorflow');
    await tf.ready();
    Logger.info('Finished loading tensorflow');
}


// initially undefined
let loadedModel: tf.GraphModel

const loadModel = async(): Promise<void> => {
    loadedModel = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
    );

    Logger.info('Started loading the model');
    try {
        loadedModel.predict(tf.zeros([1, 240, 240, 3]));
    } catch (error) {
        Logger.error('Failed to do first prediction loading the model' + error);
    }
    Logger.info('Finished loading the model');
}

export { breedNames, loadTensorflow, loadModel, loadedModel };