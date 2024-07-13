const shenmind = require('./shenmind');

async function main() {

    const modelId = "dqumfm4yl258";
    const files = {
        image: 'https://oss.shenmind.com/c8wt7SutURuK92d1GrNq5w==/th_e3ghz0E3PwJQHKAFGEg==/1709886162958054120/1.png',
    };
    const params = {
        negative_prompt: ' ',
        style: '3D',
        prompt: 'a person'};

    const prediction = await shenmind.run(modelId, files, params, waitResult = false);
    console.log(prediction);
    const output = await shenmind.getPredictionOutput(prediction);
    console.log(output);
    const canceled = await shenmind.cancelPrediction(prediction);
    console.log(canceled);

 
}

// 调用 main 函数
main();
