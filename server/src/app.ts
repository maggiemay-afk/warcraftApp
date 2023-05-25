import express, { Application, Request, Response } from 'express';
import axios, {isCancel, AxiosError} from 'axios';
import mounts from './mounts.json';
require('dotenv').config();


const app: Application = express();
const port: number = 3001;
let token: string;

const getToken = async (): Promise<string> => { //async function that returns a Promise of type string
    console.log("token is falsey");

    const response = await axios.post("https://oauth.battle.net/token", new URLSearchParams({
        'grant_type': 'client_credentials'
    }), 
    {
        auth: {
            username: process.env.WOW_CLIENT_ID!,
            password: process.env.WOW_CLIENT_SECRET!
        }

    }).catch((error) => {
        console.log(error);
        throw error;
    }); 
    
    console.log(response); //api POST response

    token = response.data.access_token;
    console.log(token) //check variable is set

    return token;

}

app.get('/', (req: Request, res: Response) => {
    res.send('welcome home');
})

app.get('/new-mount', async (req: Request, res: Response) => {
    console.log('In new-mount');
    
    if (!token) {
        token = await getToken();
    }

    console.log("token is truthy");

    const response = await axios.get('https://us.api.blizzard.com/data/wow/token/', {
        params: {
            'namespace': 'dynamic-us'
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).catch(function (error) {
        console.log(error);
        throw error;
    });

    console.log(response); //api GET response

})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
})