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
const User_1 = require("../query/User");
const User_2 = require("../model/User");
const users = [
    {
        username: "admin",
        password: "admin123",
        type: "admin",
        firstLogin: "no"
    },
    {
        username: "pera@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen",
        firstLogin: "no"
    },
    {
        username: "mika@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "veki@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "radmila@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "peca@etf.bg.ac.rs",
        password: "zap123",
        type: "zaposlen"
    },
    {
        username: "mm170017d@student.etf.rs",
        password: "stud123",
        type: "student",
        firstLogin: "no"
    },
    {
        username: "nn180018d@student.etf.rs",
        password: "stud123",
        type: "student"
    },
    {
        username: "rr190019d@student.etf.rs",
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
        lastName: "Puzovic",
        address: "Patrijarha Varnave 20, stan 2",
        phoneNumber: "064/189-00-99",
        webpage: "www.facebook.com",
        personalInfo: "Ja sam vaga u horoskopu.",
        title: "redovni profesor",
        room: 16,
        status: "aktivan",
        type: "nastavnik",
        profilePicture: {
            contentType: "image/jpeg",
            image: "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"
        }
    },
    {
        username: "mika@etf.bg.ac.rs",
        firstName: "Miroslav",
        lastName: "Markovic",
        address: "Vladike Nikolaja Velimirovica 4, 34300 Arandjelovac",
        title: "vanredni profesor",
        room: 36,
        status: "aktivan",
        type: "nastavnik"
    },
    {
        username: "veki@etf.bg.ac.rs",
        firstName: "Vesna",
        lastName: "Vejkovic Markovic",
        address: "Vladike Nikolaja Velimirovica 4, 34300 Arandjelovac",
        title: "asistent",
        room: 416,
        status: "neaktivan",
        type: "nastavnik"
    },
    {
        username: "radmila@etf.bg.ac.rs",
        firstName: "Radmila",
        lastName: "Rad",
        address: "Svetozara Markovica 78, 34000 Kragujevac",
        title: "laboratorijski inzenjer",
        status: "aktivan",
        type: "laborant"
    },
    {
        username: "peca@etf.bg.ac.rs",
        firstName: "Pet",
        lastName: "Prsko",
        address: "Svetozara Markovica 78, 34000 Kragujevac",
        title: "laboratorijski tehnicar",
        status: "aktivan",
        type: "laborant"
    }
];
const students = [
    {
        username: "mm170017d@student.etf.rs",
        index: "2017/0017",
        type: "d",
        firstName: "Manja",
        lastName: "Marjanov",
        status: "aktivan",
        subjects: ["13S112OS1", "13S112VD", "13S111P1"]
    },
    {
        username: "nn180018d@student.etf.rs",
        index: "2018/0018",
        type: "d",
        firstName: "Nikola",
        lastName: "Nikolic",
        status: "aktivan"
    },
    {
        username: "rr190119d@student.etf.rs",
        index: "2019/0119",
        type: "d",
        firstName: "Ranko",
        lastName: "Rankovic",
        status: "neaktivan"
    },
    {
        username: "bb124578m@student.etf.rs",
        index: "2012/4578",
        type: "m",
        firstName: "Bojan",
        lastName: "Bojovic",
        status: "aktivan"
    },
    {
        username: "zn123456p@student.etf.rs",
        index: "2012/3456",
        type: "p",
        firstName: "Nikola",
        lastName: "Zigic",
        status: "aktivan"
    }
];
function seedUsers() {
    for (let u of users) {
        User_1.insertUser(u);
    }
}
function seedEmployees() {
    for (let e of employees) {
        let employee = new User_2.Employee(e);
        employee.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        });
    }
}
function seedStudents() {
    for (let s of students) {
        let student = new User_2.Student(s);
        student.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        });
    }
}
function seedAllUsers() {
    const db = mongoose_1.default.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose_1.default.connection;
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