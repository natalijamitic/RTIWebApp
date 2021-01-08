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
const middleware = __importStar(require("./middleware"));
const userQueries = __importStar(require("./query/User"));
const projectQueries = __importStar(require("./query/Projects"));
const notificationQueries = __importStar(require("./query/Notification"));
const subjectQueries = __importStar(require("./query/Subject"));
const User_1 = require("./model/User");
const jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = fs.readFileSync('src/assets/keys/private.key');
const multer = require('multer');
var sizeOf = require('image-size');
var fileExtension = require('file-extension');
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect('mongodb://localhost:27017/rti_katedra', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose_1.default.connection;
mongoose_1.default.set('useFindAndModify', false);
/*** PORFILE PICTURE ***/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploaded_files/profile_pictures');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname));
    }
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000 //2MBs
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error
            cb(new Error('Please upload JPG and PNG images only!'));
        }
        //Success
        cb(undefined, true);
    }
});
app.post('/register/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const username = req.body.employeeUsername;
    const file = req.file;
    if (!file) {
        res.status(400).json({ error: "File upload failed." });
        return;
    }
    let oldFileUrl = file.destination + '/' + file.filename;
    const dimensions = sizeOf(oldFileUrl);
    console.log(dimensions.width, dimensions.height);
    if (dimensions.width > 300 || dimensions.height > 300) {
        res.status(400).json({ error: "File can be max 300 x 300 px." });
        return;
    }
    let newFileUrl = file.destination + '/' + username + "." + fileExtension(file.originalname);
    // Rename file
    fs.renameSync(oldFileUrl, newFileUrl);
    var img = fs.readFileSync(newFileUrl);
    var encode_image = Buffer.from(img).toString('base64');
    var finalImg = {
        contentType: file.mimetype,
        image: encode_image
    };
    User_1.Employee.findOneAndUpdate({ username: username }, { profilePicture: finalImg }, (err, result) => {
        if (err) {
            res.status(400).send({
                error: "GRESKA"
            });
        }
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            finalImg: finalImg
        });
    });
});
/************* ROUTES ***************/
connection.once('open', () => {
    //seed();
    console.log('mongo connected');
});
const router = express_1.default.Router();
app.get('/', (request, response) => {
    response.status(200).json({ msg: "OK" });
});
// REGISTER Route
router.route('/register/student').post((request, response) => {
    const user = request.body.user;
    const student = request.body.student;
    userQueries.registerStudent(user, student).then((result) => {
        if (result.status == 0) {
            response.status(200).json({ msg: result.msg });
        }
        else {
            response.status(400).json({ msg: result.msg });
        }
    });
});
router.route('/register/employee').post((request, response) => {
    const user = request.body.user;
    const employee = request.body.employee;
    userQueries.registerEmployee(user, employee).then((result) => {
        if (result.status == 0) {
            response.status(200).json({ msg: result.msg });
        }
        else {
            response.status(400).json({ msg: result.msg });
        }
    });
});
// LOGIN Route
router.route('/login').post((request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    userQueries.loginUser(email, password).then((status) => {
        switch (status) {
            case userQueries.LoginError.WrongPassword: {
                response.status(400).json({
                    status: -1,
                    msg: "Pogresna lozinka."
                });
                break;
            }
            case userQueries.LoginError.WrongUsername: {
                response.status(400).json({
                    status: -2,
                    msg: "Pogresno korisnicko ime."
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
                    user: userQueries.stringifyUser(user),
                    expiresIn: 120
                });
                break;
            }
        }
    }).catch((error) => console.log("Login + " + error));
});
router.route('/login/first').post((request, response) => {
    const oldPass = request.body.oldPass;
    const newPass = request.body.newPass;
    const username = request.body.username;
    userQueries.firstLoginPassChange(username, oldPass, newPass).then((result) => {
        if (result.status == 0) {
            response.status(200).json({ msg: result.msg });
        }
        else {
            response.status(400).json({ msg: result.msg });
        }
    });
});
router.route('/kontakt').get([middleware.list.checkIfLoggedIn, middleware.list.checkIfAdmin], (request, respone) => {
    console.log("Kontakt route.");
    respone.json(true);
});
router.route('/proba').get([middleware.list.checkIfLoggedIn, middleware.list.checkIfAdmin], (request, respone) => {
    console.log("Proba route.");
    respone.json(true);
});
//******* SUBJECT ROUTES       ********/
router.route('/subjects/:dept').get((request, response) => {
    console.log(request.params);
    console.log("Subject route");
    subjectQueries.getSubjectsByDepartment(request.params.dept).then((result) => {
        response.json(result);
    });
});
//******* EMPLOYEES ROUTES     *******/
// GET Employees
router.route('/employees').get((_request, response) => {
    console.log("Employees route");
    userQueries.getAllEmployees().then((result) => {
        response.json(result);
    });
});
// GET Assignments
router.route('/assignments').get((_request, response) => {
    console.log("Assignments route");
    userQueries.getAllAssignments().then((result) => {
        response.json(result);
    });
});
//******* PROJECTS ROUTES     *******/
// GET Offered Projects
router.route('/projects/offered').get((_request, response) => {
    console.log("Offered proj route");
    projectQueries.getOfferedProjects().then((result) => {
        response.json(result);
    });
});
// GET Done Projects
router.route('/projects/done').get((_request, response) => {
    console.log("Done proj route");
    projectQueries.getDoneProjects().then((result) => {
        response.json(result);
    });
});
//******* NOTIFICATION ROUTES *******/
// GET Notifications
router.route('/notifications').get((_request, response) => {
    console.log("Notifications route");
    notificationQueries.getRecentNotifications().then((result) => {
        response.json(result);
    });
});
// GET Notification Types
router.route('/notificationtypes').get((_request, response) => {
    console.log("Notificationtypes route");
    notificationQueries.getNotificationTypes().then((result) => {
        response.json(result);
    });
});
app.use('/', router);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ msg: 'Not logged in' });
    }
});
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map