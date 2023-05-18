import express, { Application, Request, Response } from 'express'
import axios, {isCancel, AxiosError} from 'axios';

const app: Application = express()
const port: number = 3001
let token: string;

app.get('/toto', (req: Request, res: Response) => {
    res.send('Hello toto')
})

app.get('/new-mount', (req: Request, res: Response) => {
    
    if (token === null) {
        axios.post("https://oauth.battle.net/token", new URLSearchParams({
            'grant_type': 'client_credentials'
        }), 
        {
            auth: {
                username: 'client_id',
                password: 'client_secret'
            }
        })
    }
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})