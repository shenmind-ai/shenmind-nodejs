## 深迈 API 的 nodejs 客户端


### 简介
本项目是深迈 API 的 nodejs 客户端，以让用户更加方便地使用深迈API，更好地探索和使用AI模型，以及开发自己的应用产品。


### 安装
您可以直接通过 npm 安装：
```
npm install shenmind
```

### 使用样例

#### 1. 设置个人 Api Token

您可以在[个人中心](https://mmdatong.com/dashboard?dashboardTab=userinfo) 查看自己的 Api Token，并进行配置。
```
 export SHENMIND_API_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

#### 2. 创建预测
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


#### 3. 查询预测结果


```nodejs
const shenmind = require('shenmind');

async function main() {
  const predictionId = 'HkzotuoaEy3rcsCLK8WRyQ==';
  const predictionOutput = await shenmind.getPredictionOutput(predictionId);
  console.log(predictionOutput);
}

main();

````

