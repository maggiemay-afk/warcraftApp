import mounts from '../src/mounts.json';
import fs from 'fs';
import path from 'path';
import axios, { AxiosRequestConfig } from 'axios';

require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const filePath = path.join(__dirname, '..', 'src', 'aiGeneratedNames.json');

const results: any = {
  mounts: []
};

/**
 * 
 */
async function generateMountOptions(){
  let promises: Promise<any>[] = [];

  for (let i = 0; i < mounts.mounts.length; i++) {

    let currentTrueMount = mounts.mounts[i].name
  
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant who generates fictional names for World of Warcraft Mounts. When a user provides you a mount name, generate 3 similar names that are comma separated."},
        {"role": "user", "content": "red drake"},
        {"role": "assistant", "content": "Blazing Drake, Crimson Drake, Flame-Scarred Drake"},
        {"role": "user", "content": currentTrueMount}
      ]
    };
    const requestOptions: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`    
      },
      timeout: 10000
    };
  
    // Make the API call
    const p = axios.post("https://api.openai.com/v1/chat/completions", body, requestOptions)
      .then(response => {
        const data = response.data;
  
        if (data.choices && data.choices.length > 0){
          const falseNames: string = data.choices[0].message.content;
  
          const tempResult = {
            realName: currentTrueMount,
            fakeNames: falseNames.split(", "),
            id: mounts.mounts[i].id
          };
  
          results.mounts[i] = tempResult;
          console.log("Temp Result - ", tempResult);
        } else {
          console.log("No response returned from API");
        }
      })
      .catch(error => {
        console.error("Error mountId: " + mounts.mounts[i].id, error);
      });
    
    // Push async promise to array
    promises.push(p);

    // If there are > 10 promises, lets wait for all 10 to finish
    if (promises.length >= 10) {
      await Promise.allSettled(promises);
      promises = [];
    }
  }
};


generateMountOptions().then(() => {
  fs.writeFile(filePath, JSON.stringify(results, null, 2), {flag: 'w'}, (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');
  });
})
