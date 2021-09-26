const aboutDogId = `
DogID was developed by 2 students from McMaster University.
It was heavily inspired by FlowerID (https://github.com/tonylizj/FlowerID-App).

This project was started so we can have fun learning more about neural networks, the process of training models, how to develop a mobile app, and what backend is. Thus, we never intended this to be an accurate predictor of dog breeds nor be a dog breed encyclopedia that has accurate breed information.
Information about dog breeds from all parts of the DogID project (dogid-model, dogid-app, dogid-api) should not be taken seriously.

The DogID model was trained on the Tsinghua dog dataset (https://cg.cs.tsinghua.edu.cn/ThuDogs/) which contained 130 different breeds. Our model and app only supports those 130 breeds because that is the data we trained it on.
There are plans to add more breeds from different datasets as well as an object detection model.
We trained many different models (see https://github.com/harrisonchiu/dogid-model); we used pretrained models and we created our own model from scratch.

This app was created with TypeScript, React Native, and Tensorflow JS.

The API (dogid-api) was created with Node.js and Express. It was intended to allow users to send images with the "correct" labels in the case where the model predicted the breed incorrectly. We wanted to allow users to voluntarily expand the dog breed dataset which would help our DogID model's training, or any academic who is doing research in machine learning (publicly available dog breed datasets are currently quite dissapointing in the number of images).

Be careful when using the API! Anyone is allowed to add any type of data. It was intended for image base64 strings, but it is also possible dangerous code could be encoded in the base64 strings.
We do NOT condone this type of behaviour. We are also NOT responsible for any damages nor any wrong doings for any interactions with the database or APIs.

Thank you for using DogID!

DogID Model Github: github.com/harrisonchiu/dogid-model
DogID App Github: github.com/harrisonchiu/dogid-app
DogID API Github: github.com/harrisonchiu/dogid-api
`

export default aboutDogId;