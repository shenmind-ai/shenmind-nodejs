const shenmind = require('./shenmind');

async function main() {
  const modelId = "qz3s9jxgHMIRcw8L_DCYVg==";
  const files = {
    "audio": "test.wav"
  };
  const params = {
    "language": null,
    "translate": false,
  };


  const prediction = await shenmind.run(modelId, files, params, waitResult = true);
  console.log(prediction);

  //const predictionId = 'HkzotuoaEy3rcsCLK8WRyQ==';
  //const predictionOutput = await shenmind.getPredictionOutput(predictionId);
  //console.log(predictionOutput);
}

// 调用 main 函数
main();
