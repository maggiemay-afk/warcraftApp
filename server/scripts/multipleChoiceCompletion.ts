import mounts from '../src/mounts.json';
//const { mounts } = require('../src/mounts.json');
//import multipleChoices from '../src/multipleChoices.json';
//const { multipleChoices } = require('../server/src/multipleChoices.json');
//import { Configuration, OpenAIApi } from "openai";
//const { Configuration, OpenAIApi } = require('../server/package.json/openai');

const apiKey = "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";

// TODO: Update to use length of mounts json array
for (let i = 0; i < 3; i++) {

  let currentMount = mounts.mounts[i].name

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`    
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant who generates fictional names for World of Warcraft Mounts. When a user provides you a mount name, generate 3 similar names that are comma separated."},
        {"role": "user", "content": "red drake"},
        {"role": "assistant", "content": "Blazing Drake, Crimson Drake, Flame-Scarred Drake"},
        {"role": "user", "content": currentMount}
      ]
    })
  };

  // Make the API call
  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.json())
    .then(data => {

      if (data.choices && data.choices.length > 0){
        // TODO: Save to file
        console.log("Provided Name: ", mounts.mounts[i].name, "Generated text:", data.choices[0].message.content);
      } else {
        console.log("No response returned from API");
      }
      
    })
    .catch(error => {
      console.error("Error:", error);
    });
  
} // end for loop



