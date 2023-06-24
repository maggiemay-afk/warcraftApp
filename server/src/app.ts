import express, { Application, Request, Response } from 'express';
import axios, {isCancel, AxiosError} from 'axios';
import mounts from './mounts.json';
require('dotenv').config();


const app: Application = express();
const port: number = 3001;
let token: string;
let creatureID: number;
let mountImage: string;
const totalMounts: number = mounts.mounts.length;


function getRandomMountId(): number {
    let index = Math.floor(Math.random() * totalMounts);
    console.log(mounts.mounts[index].id);
    return mounts.mounts[index].id;
}


const getToken = async (): Promise<string> => { //async function that returns a Promise of type string
    console.log("token is falsey");

    const authResponse = await axios.post("https://oauth.battle.net/token", new URLSearchParams({
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
    
    //console.log(authResponse); //api POST response

    token = authResponse.data.access_token;
    //console.log(token) //check variable is set

    return token;

}

app.get('/', (req: Request, res: Response) => {
    res.send("Total Mounts: " + totalMounts);
    //res.send('welcome home');
})

app.get('/new-mount', async (req: Request, res: Response) => {
    console.log('In new-mount');
    
    if (!token) {
        token = await getToken();
    }

    console.log("token is truthy");

    //Get mount details by mount id
    //Should return creature id
    const mountDetailResponse = await axios.get('https://us.api.blizzard.com/data/wow/mount/' + getRandomMountId(), {
        params: {
            'namespace': 'static-us',
            ':region': 'us',
            'locale': 'en_US'
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).catch(function (error) {
        console.log(error);
        throw error;
    });

    //console.log(mountDetailResponse);

    creatureID = mountDetailResponse.data.creature_displays[0].id

    console.log("Creature ID is");
    console.log(creatureID);


    //Get creature display by creature id
    const creatureResponse = await axios.get('https://us.api.blizzard.com/data/wow/media/creature-display/' + creatureID, {
        params: {
            'namespace': 'static-us',
            ':region': 'us',
            'locale': 'en_US'
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).catch(function (error) {
        console.log(error);
        throw error;
    });

    //console.log(creatureResponse);

    mountImage = creatureResponse.data.assets[0].value
    console.log(mountImage);

    res.send(mountImage);

})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
})