const {
    uploadUrl,
    createPredictionUrl,
    queryPredictionUrl,
    cancelPredictionUrl
} = require('./constant');

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');


async function uploadFile(filePath) {
  // upload local file to server
  const file = fs.createReadStream(filePath);
  const formData = new FormData();
  formData.append('file', file);

  const apiToken = process.env.SHENMIND_API_TOKEN;
  const headers = {
    'Authorization': apiToken,
    ...formData.getHeaders()
  };


  const response = await axios.post(uploadUrl, formData, { headers });
  
  if (response.status === 200) {
    return response.data.data; // storage id
  } else {
    throw new Error(`Fail to upload file: ${response.data}`);
  }
}

async function run(modelId, files, params, waitResult = false) {
  const data = {};
  for (const [key, filePath] of Object.entries(files)) {
    const storageId = await uploadFile(filePath);
    data[key] = storageId[0];
  }
  
  // run
  const apiToken = process.env.SHENMIND_API_TOKEN;
  const headers = {
    'Authorization': apiToken,
    'Content-Type': 'application/json'
  };

  data.modelId = modelId;
  Object.assign(data, params);

  const response = await axios.post(createPredictionUrl, data, { headers });
  
  if (response.status === 200) {
    if (!waitResult) {
      return response.data.data.predictionId;
    } else {
      const predictionId = response.data.data.predictionId;
      while (true) {
        const prediction = await getPredictionOutput(predictionId);
        if (prediction.status === 'succeeded') {
          return prediction;
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  } else {
    throw new Error(`Fail to create prediction: ${response.data}`);
  }
}

async function getPredictionOutput(predictionId) {
  const apiToken = process.env.SHENMIND_API_TOKEN;
  const headers = {
    'Authorization': apiToken
  };
  const params = {
    predictionId
  };
  const response = await axios.get(queryPredictionUrl, { headers, params });

  if (response.status === 200) {
    return response.data.data;
  } else {
    throw new Error(`Fail to get prediction: ${response.data}`);
  }
}

async function cancelPrediction(predictionId) {
  const apiToken = process.env.SHENMIND_API_TOKEN;
  const headers = {
    'Authorization': apiToken
  };
  const data = {
    predictionId
  };
  const response = await axios.post(cancelPredictionUrl, data, { headers });
  
  if (response.status === 200) {
    return response.data.data;
  } else {
    throw new Error(`Fail to cancel prediction: ${response.data}`);
  }
}

module.exports = {
  run,
  getPredictionOutput,
  cancelPrediction
};


