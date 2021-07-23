import { Image } from 'react-native'
import { Buffer } from 'buffer'

import * as tf from '@tensorflow/tfjs'
import { fetch } from '@tensorflow/tfjs-react-native'

import * as jpeg from 'jpeg-js'

import { breedNames, loadedModel } from "@actions/LoadAssets"

const localDogImage = require('../../assets/labrador.jpg')


export default async function ClassifyImage(image: any, numberOfPredictionOutputs: number) {
    const capturedImageToTensor = (rawImageData: string) => {
        const jpg = Buffer.from(rawImageData, 'base64')
        const { width, height, data } = jpeg.decode(jpg, { useTArray: true, formatAsRGBA: false })
        return tf.tensor4d(data, [1, height, width, 3], 'float32')
    }

    const localImageToTensor = (rawImageData: ArrayBuffer) => {
        const { width, height, data } = jpeg.decode(rawImageData, { useTArray: true, formatAsRGBA: false })
        return tf.tensor4d(data, [1, height, width, 3], 'float32')
    }

    const getPredictedBreedName = (predictions: tf.Tensor) => {
        const {values, indices} = tf.topk(predictions, numberOfPredictionOutputs, true)
        const probabilities = (values.arraySync() as number[][])[0]
        const breedNameIndices = (indices.arraySync() as number[][])[0]

        const breeds: Array<string> = new Array(numberOfPredictionOutputs)
        for (let i = 0; i < 5; i += 1) {
            console.log(breedNames[breedNameIndices[i]] + probabilities[i])
            breeds[i] = breedNames[breedNameIndices[i]]
        }

        return breeds
    }

    const predictCapturedImage = async() => {
        try {
            const imageTensor = capturedImageToTensor(image.base64)

            const predictions = loadedModel.predict(imageTensor) as tf.Tensor
            return getPredictedBreedName(predictions)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    const predictLocalImage = async() => {
        try {
            // const model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights))

            const imagePath = Image.resolveAssetSource(localDogImage)
            const response = await fetch(imagePath.uri, {}, { isBinary: true })
            const imageData = await response.arrayBuffer()
            const imageTensor = localImageToTensor(imageData)

            const predictions = loadedModel.predict(imageTensor) as tf.Tensor
            const probabilities = predictions.dataSync()
        } catch (error) {
            console.log(error)
        }
    }

    return predictCapturedImage()
}