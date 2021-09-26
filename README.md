<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/harrisonchiu/dogid-app">
    <img src="docs/dogid-logo.png" alt="Logo" width="128" height="128">
  </a>

  <h1 align="center">DogID Mobile App</h1>

  <h3 align="center">
    React Native app that identifies different dog breeds
    <br />
    <br />
    <a href="https://github.com/harrisonchiu/dogid-model">DogID Model (Neural Network Model)</a>
    ·
    <a href="https://github.com/harrisonchiu/dogid-api">DogID API (Backend API)</a>
  </h3>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-dogid-api">About DogID App</a>
      <ul>
        <li><a href="#dogid-mobile-app-built-with">Mobile App Built With</a></li>
      </ul>
      <ul>
        <li><a href="#restful-api-backend-built-with">API Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#set-up-locally">Set Up Locally</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About DogID App

A full stack mobile app that identifies dog breeds and gives a summary of the breed
using our [convolutional neural network (https://github.com/harrisonchiu/dogid-model)](https://github.com/harrisonchiu/dogid-model).

The app allows users to take a photo with their camera which will identify the breed of
the dog in that photo. A summary of the breed is also given to the user which includes:
- Origin and history
- Breed group
- Physical description
- Usual temperament
- Average lifespan, weight, height, friendliness, energy level, and grooming needs

DogID allows users to voluntarily send data to a public PostgreSQL database through our
Node.js and Express RESTful [API (https://github.com/harrisonchiu/dogid-api)](https://github.com/harrisonchiu/dogid-api).

Only the image data in base64 string format and the user inputted label is sent.
Check the code, it is open-sourced; our code itself does not send any other information
(although you would also have to trust the dependencies which can be found in `yarn.lock`).

### DogID Mobile App Built With
- TypeScript
- React Native

### RESTful API Backend Built With
- Node.js
- Express.js framework
- PostgreSQL
- Heroku


## Demo

https://user-images.githubusercontent.com/32177072/134792987-5ffacbaa-79e0-4017-b298-7d045b5058f4.mp4


<!-- GETTING STARTED -->
## Set Up Locally

To get a local copy up and running follow these simple steps.

1. Clone the repo
    ```sh
    git clone https://github.com/harrisonchiu/dogid-app.git
    ```
2. Install NPM packages
    ```sh
    yarn install
    ```
3. Build
    ```sh
    npm build
    ```
    OR if expo installed
    ```sh
    expo start
    ```


<!-- ROADMAP -->
## Roadmap
- [x] Camera options
    - Zoom, flash, ratios, front camera, save image
- [ ] Details screen of dog
    - Can search for other dogs
    - Save user searches locally
- [x] Finish UI
- [ ] Option to use locally saved image
- [ ] Detect when image probably does not contain a dog
- [ ] API to optionally send images or other data if prediction is incorrect/correct, to increase dataset
- [ ] API to run big model on server
- [ ] Object detection
    - Detects on captured picture
    - Detects on captured video
    - Detects on local saved picture and video
    - Detects on streamed camera data

See the [open issues](https://github.com/harrisonchiu/dogid-app/issues) for a list of proposed features (and known issues).
