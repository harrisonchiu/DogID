import { Buffer } from 'buffer';

import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';

import { Logger } from '@actions/Log';
import { breedNames, loadedModel } from '@actions/LoadAssets';
import Breed from '@components/Breed';


function ClassifyImage(image: any, numberOfPredictions: number): Breed[] {
    const capturedImageToTensor = (rawImageData: string): tf.Tensor4D => {
        // Turns image into tensor for model to use
        // Assumes image is already resized
        const jpg = Buffer.from(rawImageData, 'base64');
        const {
            width,
            height,
            data
        } = jpeg.decode(jpg, { useTArray: true, formatAsRGBA: false });

        return tf.tensor4d(data, [1, height, width, 3], 'float32');
    }

    const formatProbabilities = (probabilities: number[]): number[] => {
        // Converts 0.xxxxxxx probability to xx.xx% format
        const roundDecimalPlaces = 2;

        for (let i = 0; i < probabilities.length; i += 1) {
            probabilities[i] = Math.round(
                probabilities[i] * 100 * (10 ** roundDecimalPlaces)
            ) / (10 ** roundDecimalPlaces);
        }

        return probabilities;
    }

    const getPredictedBreedName = (predictions: tf.Tensor): Breed[] => {
        // Parse information from the output tensor
        const { values, indices } = tf.topk(predictions, numberOfPredictions, true);
        let probabilities = (values.arraySync() as number[][])[0];
        const predictedBreedNameIndices = (indices.arraySync() as number[][])[0];

        probabilities = formatProbabilities(probabilities);

        const predictedBreeds: Breed[] = Array<Breed>(numberOfPredictions);

        // Get all the information of the breed and put the probability metadata in it
        for (let i = 0; i < numberOfPredictions; i += 1) {
            predictedBreeds[i] = new Breed(breedNames[predictedBreedNameIndices[i]]);
            predictedBreeds[i].setProbability(probabilities[i]);
        }

        return predictedBreeds;
    }

    const predictCapturedImage = (): Breed[] => {
        try {
            Logger.info('Started converting image to tensor');
            const imageTensor = capturedImageToTensor(image.base64);
            Logger.info('Finished converting image to tensor');


            Logger.info('Started model image prediction');
            const predictions = loadedModel.predict(imageTensor) as tf.Tensor;
            Logger.info('Finished model image prediction');

            return getPredictedBreedName(predictions);
        } catch (error) {
            Logger.error('Failed to predict image ' + error);
            return [];
        }
    }

    return predictCapturedImage();
}


export default ClassifyImage;