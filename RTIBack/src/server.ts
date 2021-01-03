import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';

import seed from './seed/seed';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rti_katedra');
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo connected');
})

const router = express.Router();

app.get('/', (req, res) => {
    seed();
    res.status(200).json({msg: "OK"});
});

app.listen(4000, () => console.log(`Express server running on port 4000`));


