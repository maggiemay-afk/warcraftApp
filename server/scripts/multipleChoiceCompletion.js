import mounts from '../src/mounts.json' assert { type: "json"};
//const { mounts } = require('../server/src/mounts.json');
//import multipleChoices from '../src/multipleChoices.json';
//const { multipleChoices } = require('../server/src/multipleChoices.json');
import { Configuration, OpenAIApi } from "openai";
//const { Configuration, OpenAIApi } = require('../server/package.json/openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const testMount = mounts.mounts[2].name;

if (!configuration.apiKey) {
  console.log("api key error")
}


const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "system", "content": "You are a helpful assistant who generates fictional names for World of Warcraft Mounts. When a user provides you a mount name, generate 3 similar names that are comma separated."},
    {"role": "user", "content": "red drake"},
    {"role": "assistant", "content": "Blazing Drake, Crimson Drake, Flame-Scarred Drake"},
    {"role": "user", "content": testMount}
  ],
  temperature: 0.6,
});

console.log(response)


// TO DO: script/loop here