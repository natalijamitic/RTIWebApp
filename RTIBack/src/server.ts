import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import seed from './seed/seed';
import * as fs from "fs"
import * as middleware from './middleware'
import * as userQueries from './query/User';
import * as projectQueries from './query/Projects';
import * as notificationQueries from './query/Notification';
import * as subjectQueries from './query/Subject';
import { Employee } from './model/User';

const jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = fs.readFileSync('src/assets/keys/private.key');

const multer = require('multer');
var sizeOf = require('image-size')
var fileExtension = require('file-extension');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/rti_katedra', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

mongoose.set('useFindAndModify', false);


/*** PORFILE PICTURE ***/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploaded_files/profile_pictures');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
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
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success
        cb(undefined, true)
    }
});

app.post('/register/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const username = req.body.employeeUsername;
    const file = req.file;

    if (!file) {
        res.status(400).json({error: "File upload failed."})
        return;
    }

    let oldFileUrl = file.destination + '/' + file.filename;

    const dimensions = sizeOf(oldFileUrl)
    console.log(dimensions.width, dimensions.height)
    if (dimensions.width > 300 || dimensions.height > 300) {
        res.status(400).json({error: "File can be max 300 x 300 px."})
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

    Employee.findOneAndUpdate({username: username}, {profilePicture: finalImg}, (err, result) => {
        if (err) {
            res.status(400).send({
                error: "GRESKA"
            })
        }
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            finalImg: finalImg
        })
    })



})


/************* ROUTES ***************/

connection.once('open', () => {
    //seed();
    console.log('mongo connected');
})

const router = express.Router();

app.get('/', (request, response) => {
    response.status(200).json({ msg: "OK" });
});

// REGISTER Route
router.route('/register/student').post((request, response) => {
    const user = request.body.user;
    const student = request.body.student;
    userQueries.registerStudent(user, student).then((result: any) => {
        if (result.status == 0) {
            response.status(200).json({ msg: result.msg });
        } else {
            response.status(400).json({ msg: result.msg })
        }
    });
});
router.route('/register/employee').post((request, response) => {
    const user = request.body.user;
    const employee = request.body.employee;
    userQueries.registerEmployee(user, employee).then((result: any) => {
        if (result.status == 0) {
            response.status(200).json({ msg: result.msg });
        } else {
            response.status(400).json({ msg: result.msg })
        }
    });
})

// LOGIN Route
router.route('/login').post((request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    userQueries.loginUser(email, password).then((status: any) => {

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
    }).catch((error: string) => console.log("Login + " + error));

});

router.route('/login/first').post((request, response) => {
    const oldPass = request.body.oldPass;
    const newPass = request.body.newPass;
    const username = request.body.username;

    userQueries.firstLoginPassChange(username, oldPass, newPass).then((result: any) => {
        if (result.status == 0) {
            response.status(200).json({ msg: result.msg });
        } else {
            response.status(400).json({ msg: result.msg })
        }
    });
})

router.route('/kontakt').get([middleware.list.checkIfLoggedIn, middleware.list.checkIfAdmin], (request: any, respone: any) => {
    console.log("Kontakt route.");
    respone.json(true);
});

router.route('/proba').get([middleware.list.checkIfLoggedIn, middleware.list.checkIfAdmin], (request: any, respone: any) => {
    console.log("Proba route.");
    respone.json(true);
});

//******* SUBJECT ROUTES       ********/
router.route('/subjects/:dept').get((request, response) => {
    console.log(request.params);
    console.log("Subject route");

    subjectQueries.getSubjectsByDepartment(request.params.dept).then((result: any) => {
        response.json(result)
    })

});

//******* EMPLOYEES ROUTES     *******/
// GET Employees
router.route('/employees').get((_request, response) => {
    console.log("Employees route");

    userQueries.getAllEmployees().then((result: any) => {
        response.json(result)
    })

});
// GET Assignments
router.route('/assignments').get((_request, response) => {
    console.log("Assignments route");

    userQueries.getAllAssignments().then((result: any) => {
        response.json(result)
    })

});

//******* PROJECTS ROUTES     *******/
// GET Offered Projects
router.route('/projects/offered').get((_request, response) => {
    console.log("Offered proj route");

    projectQueries.getOfferedProjects().then((result: any) => {
        response.json(result)
    })

});
// GET Done Projects
router.route('/projects/done').get((_request, response) => {
    console.log("Done proj route");

    projectQueries.getDoneProjects().then((result: any) => {
        response.json(result)
    })
});

//******* NOTIFICATION ROUTES *******/
// GET Notifications
router.route('/notifications').get((_request, response) => {
    console.log("Notifications route");

    notificationQueries.getRecentNotifications().then((result: any) => {
        response.json(result)
    })

});
// GET Notification Types
router.route('/notificationtypes').get((_request, response) => {
    console.log("Notificationtypes route");

    notificationQueries.getNotificationTypes().then((result: any) => {
        response.json(result)
    })
});


app.use('/', router);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ msg: 'Not logged in' });
    }
})

app.listen(4000, () => console.log(`Express server running on port 4000`));
