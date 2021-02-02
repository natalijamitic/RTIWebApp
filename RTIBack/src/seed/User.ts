
import mongoose, { connect } from 'mongoose';
import { insertUser } from '../query/User';
import { User, Employee, Student } from '../model/User';

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
        type: "student",
        firstLogin: "no"
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
        status: "aktivan",
        subjects: ["13S112OS1", "13S112VD", "13S111P1"]
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

function seedUsers(): void {
    for (let u of users) {
        insertUser(u);
    }
}

function seedEmployees(): void {
    for (let e of employees) {
        let employee = new Employee(e);
        employee.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        })
    }
}

function seedStudents(): void {
    for (let s of students) {
        let student = new Student(s);
        student.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        })
    }
}

function seedAllUsers(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('User', function (err, result) { });
    connection.db.dropCollection('Student', function (err, result) { });
    connection.db.dropCollection('Employee', function (err, result) { });

    new Promise(resolve => {
        seedUsers();
        seedEmployees();
        seedStudents();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllUsers };