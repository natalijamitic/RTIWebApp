import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';
import * as fs from "fs"
import seed from './seed/seed';
import * as userQueries from './query/User';
import * as middleware from './middleware'

const jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = fs.readFileSync('src/assets/keys/private.key');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rti_katedra', {useNewUrlParser:true,useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    seed();
    console.log('mongo connected');
})

const router = express.Router();

app.get('/', (request, response) => {
    response.status(200).json({ msg: "OK" });
});

router.route('/login').post((request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    userQueries.loginUser(email, password).then( status => {

        switch(status) {
            case userQueries.LoginError.WrongPassword: {
                response.status(400).json({
                    status: -1,
                    msg: "Wrong password entered."
                });
                break;
            }
            case userQueries.LoginError.WrongUsername: {
                response.status(400).json({
                    status: -2,
                    msg: "Wrong username entered."
                });
                break;
            }
            default: {
                const user = status;
                const token = jwt.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    subject: userQueries.stringifyUser(user)
                });

                response.status(200).json({
                    status: 0,
                    msg: "Successfully logged in.",
                    idToken: token,
                    expiresIn: 120
                });
                break;
            }
        }
    }).catch(error => console.log("OBDE + " + error));

});

router.route('/proba').get([middleware.list.checkIfLoggedIn, middleware.list.checkIfAdmin], (request, respone) => {
    console.log("Proba route.");
    respone.json(true);
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));


