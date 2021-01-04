"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs = __importStar(require("fs"));
const seed_1 = __importDefault(require("./seed/seed"));
const userQueries = __importStar(require("./query/User"));
const middleware = __importStar(require("./middleware"));
const jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = fs.readFileSync('src/assets/keys/private.key');
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/rti_katedra', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    seed_1.default();
    console.log('mongo connected');
});
const router = express_1.default.Router();
app.get('/', (request, response) => {
    response.status(200).json({ msg: "OK" });
});
router.route('/login').post((request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    userQueries.loginUser(email, password).then(status => {
        switch (status) {
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
//# sourceMappingURL=server.js.map