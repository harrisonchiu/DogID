# DogID

## Feel free to edit/add to this

### Coding Style
Follow Airbnb's React Style Guide:\
https://github.com/airbnb/javascript/tree/master/react

Follow Google's TypeScript and JavaScript Style Guide:\
https://google.github.io/styleguide/tsguide.html\
https://google.github.io/styleguide/jsguide.html

Follow in order of precedence: Airbnb's React/JSX, Google's TypeScript, Google's JavaScript

Use `K&R (One True Brace Style variant)`.

Exceptions to Google's and Airbnb's Style Guide:
- No abbreviations except for `id`, `params` (for parameters)

### TODO
- [x] Camera options
    - Zoom, flash, ratios, front camera, save image
- [ ] Details screen of dog
    - Can search for other dogs
    - Save user searches locally
- [ ] Finish UI
- [ ] Option to use locally saved image
- [ ] Detect when image probably does not contain a dog
- [ ] API to optionally send images or other data if prediction is incorrect/correct, to increase dataset
- [ ] API to run big model on server
- [ ] Object detection
    - Detects on captured picture
    - Detects on captured video
    - Detects on local saved picture and video
    - Detects on streamed camera data