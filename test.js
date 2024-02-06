const shenmind = require('./shenmind');

async function main() {
  const modelId = 'yP1jM07UrYuQ6xHZ-lqYSQ=='
  const files = {
    'image_path': 'https://mmdatong.com/api/public/storage/getFile?filepath=c8wt7SutURuK92d1GrNq5w%3D%3D%2Fth_e3ghz0E3PwJQHKAFGEg%3D%3D%2F1706696941478847286%2Fbottle.jpg'
  };
  const params = {
    'prompt': "bottle on table for Christmas"
  };

  const prediction = await shenmind.run(modelId, files, params, waitResult = true);
  console.log(prediction);

  //const predictionId = 'HkzotuoaEy3rcsCLK8WRyQ==';
  //const predictionOutput = await shenmind.getPredictionOutput(predictionId);
  //console.log(predictionOutput);
}

// 调用 main 函数
main();
