"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAllUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../model/User");
const db = mongoose_1.default.connect('mongodb://localhost:27017/rti_katedra');
const connection = mongoose_1.default.connection;
const users = [
    {
        username: "admin",
        password: "admin123",
        type: "admin"
    },
    {
        username: "pera@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "zika@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "vesna@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "rada@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "neca@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "mm170017d@student.etf.rs",
        password: "stud123",
        type: "student"
    },
    {
        username: "nn180018d@student.etf.rs",
        password: "stud123",
        type: "student"
    },
    {
        username: "aa190019d@student.etf.rs",
        password: "stud123",
        type: "student"
    },
    {
        username: "bb124578m@student.etf.rs",
        password: "stud123",
        type: "student"
    },
    {
        username: "zn123456p@student.etf.rs",
        password: "stud123",
        type: "student"
    }
];
const employees = [
    {
        username: "pera@etf.bg.ac.rs",
        firstName: "Petar",
        lastName: "Petrovic",
        address: "Vojvode Petra Petrovica 15, Petrovgrad",
        phoneNumber: "065/44-30-121",
        webpage: "www.google.com",
        personalInfo: "Ja sam vaga u horoskopu.",
        title: "redovni profesor",
        roomNumber: 16,
        status: "aktivan",
        type: "nastavnik"
    },
    {
        username: "zika@etf.bg.ac.rs",
        firstName: "Zivojin",
        lastName: "Zivkovic",
        address: "Vojvode Zivojina Zivkovica 15, Zivkovgrad",
        title: "vanredni profesor",
        roomNumber: 36,
        status: "aktivan",
        type: "nastavnik"
    },
    {
        username: "vesna@etf.bg.ac.rs",
        firstName: "Vesno",
        lastName: "Vesovic",
        address: "Vojvotkinje Vesne Vesovic 15, Vesnograd",
        title: "asistent",
        roomNumber: 416,
        status: "neaktivan",
        type: "nastavnik"
    },
    {
        username: "rada@etf.bg.ac.rs",
        firstName: "Radmila",
        lastName: "Radmilovic",
        address: "Vojvotkinje Radmile Radmilovic 15, Radmilovgrad",
        title: "laboratorijski inzenjer",
        status: "aktivan",
        type: "laborant"
    },
    {
        username: "neca@etf.bg.ac.rs",
        firstName: "Nemanja",
        lastName: "Nemanjic",
        address: "Vojvode Nemanje Nemanjica 15, Nemanjingrad",
        title: "laboratorijski tehnicar",
        status: "aktivan",
        type: "laborant"
    }
];
const students = [
    {
        username: "mm170017d@student.etf.rs",
        index: "2017/0017",
        studyType: "d",
        firstName: "Manja",
        lastName: "Marjanov",
        status: "aktivan"
    },
    {
        username: "nn180018d@student.etf.rs",
        index: "2018/0018",
        studyType: "d",
        firstName: "Nikola",
        lastName: "Nikolic",
        status: "aktivan"
    },
    {
        username: "aa190019d@student.etf.rs",
        index: "2019/0019",
        studyType: "d",
        firstName: "Aleksandra",
        lastName: "Aleksandrovic",
        status: "neaktivan"
    },
    {
        username: "bb124578m@student.etf.rs",
        index: "2012/4578",
        studyType: "m",
        firstName: "Bojan",
        lastName: "Bojovic",
        status: "aktivan"
    },
    {
        username: "zn123456p@student.etf.rs",
        index: "2012/3456",
        studyType: "p",
        firstName: "Nikola",
        lastName: "Zigic",
        status: "aktivan"
    }
];
function seedUsers() {
    for (let u of users) {
        let user = new User_1.User(u);
        user.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        });
    }
}
function seedEmployees() {
    for (let e of employees) {
        let employee = new User_1.Employee(e);
        employee.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        });
    }
}
function seedStudents() {
    for (let s of students) {
        let student = new User_1.Student(s);
        student.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        });
    }
}
function seedAllUsers() {
    connection.db.dropCollection('User', function (err, result) { });
    connection.db.dropCollection('Student', function (err, result) { });
    connection.db.dropCollection('Employee', function (err, result) { });
    new Promise(resolve => {
        seedUsers();
        seedEmployees();
        seedStudents();
    }).then((u) => __awaiter(this, void 0, void 0, function* () {
        (yield db).disconnect();
    }));
}
exports.seedAllUsers = seedAllUsers;
//# sourceMappingURL=User.js.map