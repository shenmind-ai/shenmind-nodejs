const shenmind = require('./shenmind');


modelId = 'yP1jM07UrYuQ6xHZ-lqYSQ==';

files = {
    'image_path': 'test.png'
};
params = {
    'prompt': 'the product is for sale'
}; 

// prediction =  shenmind.run(
//     modelId, 
//     files, 
//     params,
//     waitResult = true
// );

// console.log(prediction);


predictionId = 'HkzotuoaEy3rcsCLK8WRyQ==';
shenmind.getPredictionOutput(predictionId).then((prediction) => {
    console.log(prediction);
});

