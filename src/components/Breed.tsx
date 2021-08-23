import { BreedPictures } from '@components/BreedPictures';

const data: BreedInformationType = require('@components/BreedInformation.json')

// Json data structure
interface BreedInformationType {
    [index: string]: {
        coat: string[];
        group: string;
        origin: string;
        description: string;
        lifespan: [number, number];
        height: [number, number];
        weight: [number, number];
        friendliness: number;
        energy: number;
        groomingNeeds: number;
    }
}


class Breed {
    private name: string;
    private picture: any;

    private coat: string[];
    private group: string;
    private origin: string;
    private description: string;

    private lifespan: [number, number];  // lifespan range in years
    private height: [number, number];  // height range in kg
    private weight: [number, number];  // weight range in cm

    // Ratings out of 5 (1 to 5), 5 being the most, 1 being the least
    private friendliness: number;
    private energy: number;
    private groomingNeeds: number;

    private probability: number;

    constructor(breedName: string) {
        this.name = breedName;
        this.picture = BreedPictures[this.name];
    
        this.coat = data[this.name].coat;
        this.group = data[this.name].group;
        this.origin = data[this.name].origin;
        this.description = data[this.name].description;
    
        this.lifespan = data[this.name].lifespan;
        this.height = data[this.name].height;
        this.weight = data[this.name].weight;
    
        this.friendliness = data[this.name].friendliness;
        this.energy = data[this.name].energy;
        this.groomingNeeds = data[this.name].groomingNeeds;

        this.probability = -1;
    }

    getName = (): string => {
        return this.name;
    }

    getPicture = (): any => {
        return this.picture;
    }

    getCoat = (): string[] => {
        return this.coat;
    }

    getGroup = (): string => {
        return this.group;
    }

    getOrigin = (): string => {
        return this.origin;
    }

    getDescription = (): string => {
        return this.description;
    }

    getLifespan = (): [number, number] => {
        return this.lifespan;
    }

    getLifespanString = (): string => {
        return `${this.lifespan[0]} - ${this.lifespan[1]}`
    }

    getHeight = (): [number, number] => {
        return this.height;
    }

    getHeightString = (): string => {
        return `${this.height[0]} - ${this.height[1]}`
    }

    getWeight = (): [number, number] => {
        return this.weight;
    }

    getWeightString = (): string => {
        return `${this.weight[0]} - ${this.weight[1]}`
    }

    getFriendliness = (): number => {
        return this.friendliness;
    }

    getEnergy = (): number => {
        return this.energy;
    }

    getGroomingNeeds = (): number => {
        return this.groomingNeeds;
    }

    getProbability = (): number => {
        return this.probability;
    }

    setProbability = (probability: number): void => {
        this.probability = probability;
    }
}

export default Breed;