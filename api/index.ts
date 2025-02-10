import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/users";
import expressWs from "express-ws";
import {WebSocket} from 'ws';

const app = express();
const port = 8000;
const router = express.Router();

app.use(cors());
app.use(express.json());
expressWs(app);

app.use('/users', userRouter);

interface UserMessage {
    username: string;
    message: string;
}
interface Message {
    type: string;
    payload: UserMessage;
}

const activeUsers: WebSocket[] = [];
let messages: UserMessage[] = [];

router.ws('/chat', (ws, req) => {
    activeUsers.push(ws);

    ws.on('message', (message) => {
        try {
            const decodedMessage = JSON.parse(message.toString()) as Message;

            if (decodedMessage.type === 'SEND_MESSAGE') {
                messages.push(decodedMessage.payload);

                activeUsers.forEach(clientWS => {
                    clientWS.send(JSON.stringify({
                        type: 'NEW_MESSAGE',
                        payload: decodedMessage.payload,
                    }));
                });
            }
        } catch (e) {
            ws.send(JSON.stringify({error: "Invalid message format"}));
        }
    })

    ws.on('close', () => {
        const index = activeUsers.indexOf(ws);
        activeUsers.splice(index, 1);
    });
});

app.use(router);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));