"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const seed_1 = __importDefault(require("./seed/seed"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/rti_katedra');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo connected');
});
const router = express_1.default.Router();
app.get('/', (req, res) => {
    seed_1.default();
    res.status(200).json({ msg: "OK" });
});
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map