const {
    permissionUrl,
    createPredictionUrl,
    queryPredictionUrl,
    cancelPredictionUrl
} = require('./constant');

require('dotenv').config();

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');


async function getUploadPermission() {
    const apiToken = process.env.SHENMIND_API_TOKEN;
    if (!apiToken) {
        throw new Error("API token not available in environment variables.");
    }

    const headers = {
        'Authorization': `Bearer ${apiToken}`
    };

    try {
        const response = await axios.get(permissionUrl, { headers });
        if (response.status === 200) {
            if(response.data && response.data.data && response.data.data.permission) {
                return response.data.data.permission;
            } else {
                throw new Error("Unexpected response format: " + JSON.stringify(response.data));
            }
        } else {
            throw new Error("Failed to get upload permission: " + response.statusText);
        }
    } catch (error) {
        throw new Error(`Network-related error occurred: ${error.message}`);
    }
}

async function uploadFile(filePath) {
    const permission = await getUploadPermission();

    const url = permission.host;
    const key = permission.directory + filePath.split('/').pop();
    const formData = new FormData();
    formData.append('key', key);
    formData.append('policy', permission.policy);
    formData.append('OSSAccessKeyId', permission.ossAccessKeyId);
    formData.append('signature', permission.signature);
    formData.append('callback', permission.callback);
    formData.append('file', fs.createReadStream(filePath), { filename: filePath.split('/').pop() });

    try {
        const response = await axios.post(url, formData, { headers: formData.getHeaders() });
        if (response.status === 200) {
            return permission.fileID;
        } else {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }
    } catch (error) {
            throw new Error(`Error uploading file: ${error.message}`);
    }
}


async function run(modelID, files, params, waitResult = false) {
  const data = {};
  for (const [key, filePath] of Object.entries(files)) {
    if (filePath.startsWith('http')) {
      data[key] = filePath;
    } else {
      const storageId = await uploadFile(filePath);
      data[key] = storageId;
    }
  }
  
  // run
  const apiToken = process.env.SHENMIND_API_TOKEN;


  const headers = {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  };

  data.modelID = modelID;
  Object.assign(data, params);

  const response = await axios.post(createPredictionUrl, data, { headers });
  
  if (response.status === 200) {
    if (!waitResult) {
      return response.data.data.predictionID;
    } else {
      const predictionID = response.data.data.predictionID;
      while (true) {
        const prediction = await getPredictionOutput(predictionID);
        if (prediction.status === 'succeeded' || prediction.status === 'failed' || prediction.status === 'canceled') {
          prediction.predictionID = predictionID;
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

async function getPredictionOutput(predictionID) {
  const apiToken = process.env.SHENMIND_API_TOKEN;
  const headers = {
    'Authorization': `Bearer ${apiToken}`,
  };
  const params = {
    predictionID
  };
  const response = await axios.get(queryPredictionUrl, { headers, params });

  if (response.status === 200) {
    return response.data.data;
  } else {
    throw new Error(`Fail to get prediction: ${response.data}`);
  }
}

async function cancelPrediction(predictionID) {
  const apiToken = process.env.SHENMIND_API_TOKEN;
  const headers = {
    'Authorization': `Bearer ${apiToken}`,
  };
  const data = {
    predictionID
  };
  const response = await axios.post(cancelPredictionUrl, data, { headers });
  
  if (response.status === 200) {
    return true;
  } else {
    throw new Error(`Fail to cancel prediction: ${response.data}`);
  }
}

module.exports = {
  run,
  getPredictionOutput,
  cancelPrediction
};


