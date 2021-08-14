import { Dimensions, PixelRatio } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// Constant scale based on Pixel3 dimensions
const heightScale = screenHeight / 2220;
const widthScale = screenWidth / 1080;


class Normalizer {
    static normalize(size: number, scaleBase: string = 'width'): number {
        const newSize = (scaleBase === 'height') ? size * heightScale : size * widthScale;
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    
    // Used for general horizontal sizes
    static widthPixel(size: number): number {
        return normalize(size, 'width');
    }

    // Used for general vertical sizes
    static heightPixel(size: number): number {
        return normalize(size, 'height');
    };
    
    // Used for font sizes
    static fontPixel(size: number): number {
        return heightPixel(size);
    };
    // Used for vertical margin and padding
    static pixelSizeVertical(size: number): number {
        return heightPixel(size);
    };
    // Used for horizontal margin and padding
    static pixelSizeHorizontal(size: number): number {
        return widthPixel(size);
    };
}


function normalize(size: number, scaleBase: string = 'width'): number {
    const newSize = (scaleBase === 'height') ? size * heightScale : size * widthScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Used for general horizontal sizes
const widthPixel = (size: number): number => {
    return normalize(size, 'width');
};

// Used for general vertical sizes
const heightPixel = (size: number): number => {
    return normalize(size, 'height');
};

// Used for font sizes
const fontPixel = (size: number): number => {
    return heightPixel(size);
};

// Used for vertical margin and padding
const pixelSizeVertical = (size: number): number => {
    return heightPixel(size);
};

// Used for horizontal margin and padding
const pixelSizeHorizontal = (size: number): number => {
    return widthPixel(size);
};

export {
    screenHeight,
    screenWidth,
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
    Normalizer,
};