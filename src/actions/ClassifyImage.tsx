import { Buffer } from 'buffer'

import * as tf from '@tensorflow/tfjs'
import * as jpeg from 'jpeg-js'

import { Time } from '@actions/Log'
import { breedNames, loadedModel } from '@actions/LoadAssets'


function ClassifyImage(image: any, numberOfTopPredictions: number, roundDecimalPlaces: (boolean | number)): [string[], number[]] {
    const capturedImageToTensor = (rawImageData: string): tf.Tensor4D => {
        // Turns image into tensor for model to use
        // Assumes image is already resized
        const jpg = Buffer.from(rawImageData, 'base64')
        const {
            width,
            height,
            data
        } = jpeg.decode(jpg, { useTArray: true, formatAsRGBA: false })

        return tf.tensor4d(data, [1, height, width, 3], 'float32')
    }

    const formatProbabilities = (probabilities: number[]): number[] => {
        // Converts 0.xxxxxxx probability to xx.x{roundProbability}% format
        if (typeof roundDecimalPlaces === 'number' || roundDecimalPlaces === true) {
            if (roundDecimalPlaces === true) {
                // if 'true', default to 2 decimal places
                roundDecimalPlaces = 2
            }

            for (let i = 0; i < probabilities.length; i += 1) {
                probabilities[i] = Math.round(
                    probabilities[i] * 100 * (10 ** roundDecimalPlaces)
                ) / (10 ** roundDecimalPlaces);
            }

            return probabilities
        } else {
            // if 'false'
            return probabilities
        }
    }

    const getPredictedBreedName = (predictions: tf.Tensor): [string[], number[]] => {
        // Parse information from the output tensor
        const { values, indices } = tf.topk(predictions, numberOfTopPredictions, true)
        let probabilities = (values.arraySync() as number[][])[0]
        const breedNameIndices = (indices.arraySync() as number[][])[0]

        probabilities = formatProbabilities(probabilities)

        // Output prediction is a sorted nested array with the first being the top prediction
        // [[top1BreedName, ..., top5BreedName], [top1Probability, ..., top5Probability]]
        const breeds: [string[], number[]] = [
            new Array<string>(numberOfTopPredictions),
            probabilities
        ]

        for (let i = 0; i < numberOfTopPredictions; i += 1) {
            breeds[0][i] = breedNames[breedNameIndices[i]]
        }

        return breeds
    }

    const predictCapturedImage = (): [string[], number[]] => {
        try {
            console.log(Time() + '[INFO] Started converting image to tensor')
            const imageTensor = capturedImageToTensor(image.base64)
            console.log(Time() + '[INFO] Finished converting image to tensor')

            console.log(Time() + '[INFO] Started model image prediction')
            const predictions = loadedModel.predict(imageTensor) as tf.Tensor
            console.log(Time() + '[INFO] Finished model image prediction')

            return getPredictedBreedName(predictions)
        } catch (error) {
            console.log(Time() + '[ERROR] Failed to predict image' + error)
            return [[], []]
        }
    }

    return predictCapturedImage()
}


export default ClassifyImage;