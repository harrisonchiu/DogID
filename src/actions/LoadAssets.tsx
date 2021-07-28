import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

import { Time } from '@actions/Log';

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

const breedNames: string[] = [
    'Afghan Hound',
    'African Hunting Dog',
    'Airedale',
    'American Staffordshire Terrier',
    'Appenzeller',
    'Australian Shepherd',
    'Australian Terrier',
    'Bedlington Terrier',
    'Bernese Mountain Dog',
    'Bichon Frise',
    'Black Sable',
    'Blenheim Spaniel',
    'Border Collie',
    'Border Terrier',
    'Boston Bull',
    'Bouvier des Flandres',
    'Brabancon Griffo',
    'Brittany Spaniel',
    'Cane Carso',
    'Cardigan',
    'Chesapeake Bay Retriever',
    'Chihuahua',
    'Chinese Crested Dog',
    'Dandie Dinmont',
    'Doberman',
    'English Foxhound',
    'English Setter',
    'English Springer',
    'EntleBucher',
    'Eskimo Dog',
    'Fila Braziliero',
    'French Bulldog',
    'German Shepherd',
    'German Short Haired Pointer',
    'Gordon Setter',
    'Great Dane',
    'Great Pyrenees',
    'Greater Swiss Mountain Dog',
    'Ibizan Hound',
    'Irish Setter',
    'Irish Terrier',
    'Irish Water Spaniel',
    'Irish Wolfhound',
    'Italian Greyhound',
    'Japanese Spitzes',
    'Japanese Spaniel',
    'Kerry Blue Terrier',
    'Labrador Retriever',
    'Lakeland Terrier',
    'Leonberg',
    'Lhasa',
    'Maltese Dog',
    'Mexican Hairless',
    'Newfoundland',
    'Norfolk Terrier',
    'Norwegian Elkhound',
    'Norwich Terrier',
    'Old English Sheepdog',
    'Pekinese',
    'Pembroke',
    'Pomeranian',
    'Rhodesian Ridgeback',
    'Rottweiler',
    'Saint Bernard',
    'Saluki',
    'Samoyed',
    'Scotch Terrier',
    'Scottish Deerhound',
    'Sealyham Terrier',
    'Shetland Sheepdog',
    'Shiba Dog',
    'Shih Tzu',
    'Siberian Husky',
    'Staffordshire Bullterrier',
    'Sussex Spaniel',
    'Tibetan Mastiff',
    'Tibetan Terrier',
    'Walker Hound',
    'Weimaraner',
    'Welsh Springer Spaniel',
    'West Highland White Terrier',
    'Yorkshire Terrier',
    'Affenpinscher',
    'Basenji',
    'Basset',
    'Beagle',
    'Black and Tan Coonhound',
    'Bloodhound',
    'Bluetick',
    'Borzoi',
    'Boxer',
    'Briard',
    'Bull Mastiff',
    'Cairn',
    'Chinese Rural Dog',
    'Chow',
    'Clumber',
    'Cocker Spaniel',
    'Collie',
    'Curly Coated Retriever',
    'Dhole',
    'Dingo',
    'Flat Coated Retriever',
    'Giant Schnauzer',
    'Golden Retriever',
    'Groenendael',
    'Keeshond',
    'Kelpie',
    'Komondor',
    'Kuvasz',
    'Malamute',
    'Malinois',
    'Miniature Pinscher',
    'Miniature Poodle',
    'Miniature Schnauzer',
    'Otterhound',
    'Papillon',
    'Pug',
    'Redbone',
    'Schipperke',
    'Silky Terrier',
    'Soft Coated Wheaten Terrier',
    'Standard Poodle',
    'Standard Schnauzer',
    'Teddy',
    'Toy Poodle',
    'Toy Terrier',
    'Vizsla',
    'Whippet',
    'Wire Haired Fox Terrier',
]


const loadTensorflow = async(): Promise<void> => {
    console.log(Time() + '[INFO] Started loading tensorflow')
    await tf.ready()
    console.log(Time() + '[INFO] Finished loading tensorflow')
}


// initially undefined
let loadedModel: tf.GraphModel

const loadModel = async(): Promise<void> => {
    loadedModel = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
    );

    console.log(Time() + '[INFO] Started loading the model')
    try {
        loadedModel.predict(tf.zeros([1, 240, 240, 3]));
    } catch (error) {
        console.log(Time() + '[ERROR] Failed to do first prediction' + error);
    }
    console.log(Time() + '[INFO] Finished loading the model')
}

export { breedNames, loadTensorflow, loadModel, loadedModel };