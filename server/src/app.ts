import express, { Application, Request, Response } from 'express';
import axios, {isCancel, AxiosError} from 'axios';
//import mounts from './mounts.json';
import mounts from './aiGeneratedNames.json';
import cors from 'cors';
require('dotenv').config();

const app: Application = express();
const port: number = 3001;
let token: string;
const totalMounts: number = mounts.mounts.length;

app.use(cors());

function getRandomMountIndex(): number {
    return Math.floor(Math.random() * totalMounts);
}

function getMountNames(index: number): string[] {
    let names: string[] = [];

    names.push(mounts.mounts[index].realName);
    names = names.concat(mounts.mounts[index].fakeNames);
    names = names.sort(() => Math.random() - 0.5);
    return names;

}

class BlizzardAPIError extends Error {
    status: number;
    data: object;

    constructor(message: string, status: number, data: object) {
      super(message);
      this.name = "BlizzardAPIError";
      this.status = status;
      this.data = data; 
    }
}


const getToken = async (): Promise<string> => { //async function that returns a Promise of type string

    const authResponse = await axios.post("https://oauth.battle.net/token", new URLSearchParams({
        'grant_type': 'client_credentials'
    }), 
    {
        auth: {
            username: process.env.WOW_CLIENT_ID!,
            password: process.env.WOW_CLIENT_SECRET!
        }

    }).then(function (response) {
        if(response.status != 200 || !response.data) {
            throw new BlizzardAPIError("Invalid Auth Response", response.status, response.data);
        }

        return response;
    }).catch((error) => {
        console.log(error);
        throw error;
    }); 

    token = authResponse.data.access_token;
    return token;

}

app.get('/', (req: Request, res: Response) => {
    res.send("Home page - Total Mounts: " + totalMounts);
})

app.get('/new-mount', async (req: Request, res: Response) => {
    
    if (!token) {
        token = await getToken();
    }

    //Get mount details by mount id
    //Should return creature id
    let mountIndex = getRandomMountIndex();
    const mountId = mounts.mounts[mountIndex].id;

    const mountDetailResponse = await axios.get('https://us.api.blizzard.com/data/wow/mount/' + mountId, {
        params: {
            'namespace': 'static-us',
            ':region': 'us',
            'locale': 'en_US'
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if(response.status != 200 || !response.data) {
            throw new BlizzardAPIError("Invalid mount details response", response.status, response.data);
        }

        return response;
    }).catch(function (error) {
        console.log(error);
        throw error;
    });

    if (mountDetailResponse.data.creature_displays.length === 0) {
        throw new BlizzardAPIError("missing creature display", mountDetailResponse.status, mountDetailResponse.data);
    }

    // Get creature display by creature id
    const creatureResponse = await axios.get(mountDetailResponse.data.creature_displays[0].key.href, {
        params: {
            'namespace': 'static-us',
            ':region': 'us',
            'locale': 'en_US'
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if(response.status != 200 || !response.data) {
            throw new BlizzardAPIError("Invalid creature response", response.status, response.data);
        }

        return response;
    }).catch(function (error) {
        console.log(error);
        throw error;
    });


    if (creatureResponse.data.assets.length === 0) {
        throw new BlizzardAPIError("missing creature assets", creatureResponse.status, creatureResponse.data);
    }
    
    const mountImage = creatureResponse.data.assets[0].value
    let names = getMountNames(mountIndex);
    
    const response: Object = {
        'image': mountImage,
        'names': names
    }

    console.log(response)
    res.send(response);

})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
})