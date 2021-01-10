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



/******** USER ROUTES ********/
router.route('/users').get((request, response) => {
    userQueries.getAllUsers().then((result: any) => {
        response.status(200).json(result);
    })
})
router.route('/users/delete').post((request, response) => {
    const user = request.body.user
    userQueries.deleteUser(user.username, user.type).then((result: any) => {
        response.status(200).json(result);
    })
})
router.route('/users/update').post((request, response) => {
    const oldUser = request.body.oldUser;
    const newUser = request.body.newUser;
    userQueries.updateUser(oldUser, newUser).then((result: any) => {
        if (result.status == 0) {
            response.status(200).json(result);
        } else {
            response.status(400).json(result);
        }
    })
})

//******* SUBJECT ROUTES       ********/
router.route('/subjects').get((request, response) => {
    subjectQueries.getAllSubjects().then((result: any) => {
        response.json(result)
    })
});
router.route('/subjects/:dept').get((request, response) => {
    subjectQueries.getSubjectsByDepartment(request.params.dept).then((result: any) => {
        response.json(result)
    })
});


/******** STUDENTS ROUTES  *********/
// GET Student By Username
router.route('/students/:username').get((request, response) => {
    userQueries.getStudentByUsername(request.params.username).then((result: any) => {
        response.json(result);
    })
})
// UPDATE Student
router.route('/students/update').post((request, response) => {
    const oldUser = request.body.oldStud;
    const newUser = request.body.newStud;
    userQueries.updateStudent(oldUser, newUser).then((result: any) => {
        response.json(result);
    })
})
// EXISTS Student
router.route('/students/exists').post((request, response) => {
    const user = request.body.student;
    userQueries.existsStudent(user).then((result: any) => {
        if (result) {
            response.status(400).json(result);
        } else {
            response.status(200).json(result);
        }
    })
})

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
// DELETE Assignments
router.route('/assignments/delete').post((request, response) => {
    userQueries.deleteAssignment(request.body.subject).then((result: any) => {
        response.json(result)
    })

});
// DELETE Assignments
router.route('/assignments/insert').post((request, response) => {
    userQueries.insertAssignment(request.body.ass).then((result: any) => {
        response.json(result)
    })

});

// GET Employee By Username
router.route('/employees/:username').get((request, response) => {
    userQueries.getEmployeeByUsername(request.params.username).then((result: any) => {
        response.json(result);
    })
})
// UPDATE Employee
router.route('/employees/update').post((request, response) => {
    const oldUser = request.body.oldEmp;
    const newUser = request.body.newEmp;
    userQueries.updateEmployee(oldUser, newUser).then((result: any) => {
        response.json(result);
    })
})

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
    notificationQueries.getRecentNotifications().then((result: any) => {
        response.json(result)
    })

});
// GET Notifications
router.route('/notifications/all').get((_request, response) => {
    notificationQueries.getAllNotifications().then((result: any) => {
        response.json(result)
    });
});
// INSERT Notification
router.route('/notification/insert').post((request, response) => {
    const notif = request.body.notif;
    notificationQueries.insertNotification(notif).then((result: any) => {
        response.json(result)
    })
});
// DELETE Notification
router.route('/notification/delete').post((request, response) => {
    const date = request.body.date;
    notificationQueries.deleteNotification(date).then((result: any) => {
        response.json(result)
    })
});

// GET Notification Types
router.route('/notificationtypes').get((_request, response) => {
    notificationQueries.getNotificationTypes().then((result: any) => {
        response.json(result)
    })
});
// UPDATE Notification Types
router.route('/notificationtypes/update').post((request, response) => {
    const oldType = request.body.oldType;
    const newType = request.body.newType;
    notificationQueries.updateNotificationTypes(oldType, newType).then((result: any) => {
        response.json(result)
    })
});
// INSERT Notification Types
router.route('/notificationtypes/insert').post((request, response) => {
    const newType = request.body.newType;
    notificationQueries.insertNotificationType(newType).then((result: any) => {
        response.json(result)
    })
});
// DELETE Notification Types
router.route('/notificationtypes/delete').post((request, response) => {
    const type = request.body.type;
    notificationQueries.deleteNotificationType(type).then((result: any) => {
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
