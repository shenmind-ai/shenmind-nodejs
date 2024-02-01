## ShenMind AI Node.js Client


### Introduction
This project is a Node.js client for the ShenMind AI API, aiming to provide users with a convenient way to access the ShenMind API, explore and utilize AI models, and develop their own applications.


### Installation
You can install the package directly via npm:
```
npm install shenmind
```

### Usage Examples

#### 1. Set Personal API Token
You can retrieve your personal API token from the User [Dashboard](https://mmdatong.com/dashboard?dashboardTab=userinfo) and configure it as follows:
```
 export SHENMIND_API_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

#### 2. Create Prediction
```nodejs
const shenmind = require('shenmind');

async function main() {
  const modelId = 'yP1jM07UrYuQ6xHZ-lqYSQ==';
  const files = {
    'image_path': 'test.png'
  };
  const params = {
    'prompt': 'the product is for sale'
  };

  const prediction = await shenmind.run(modelId, files, params, waitResult = true);
  console.log(prediction);
}

main();

```


#### 3. Query Prediction Output


```nodejs
const shenmind = require('shenmind');

async function main() {
  const predictionId = 'HkzotuoaEy3rcsCLK8WRyQ==';
  const predictionOutput = await shenmind.getPredictionOutput(predictionId);
  console.log(predictionOutput);
}

main();

````

