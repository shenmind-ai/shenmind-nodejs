const shenmind = require('shenmind');

async function main() {
  const modelId = 'yP1jM07UrYuQ6xHZ-lqYSQ==';
  const files = {
    'image_path': 'test.png'
  };
  const params = {
    'prompt': 'the product is for sale'
  };

//   const prediction = await shenmind.run(modelId, files, params, waitResult = true);
//   console.log(prediction);

  const predictionId = 'HkzotuoaEy3rcsCLK8WRyQ==';
  const predictionOutput = await shenmind.getPredictionOutput(predictionId);
  console.log(predictionOutput);
}

// 调用 main 函数
main();