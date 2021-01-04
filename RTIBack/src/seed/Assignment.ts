
import mongoose, { connect } from 'mongoose';
import { Assignment } from '../model/Assignment';

const assignments = [
    {
        subject: "13S111P1",
        group: [
            {
                name: "P1",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
            {
                name: "P2",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
            {
                name: "P3",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
            {
                name: "V1",
                employees: ["pera@etf.bg.ac.rs"]
            },
            {
                name: "V2",
                employees: ["zika@etf.bg.ac.rs"]
            },
            {
                name: "V3",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
        ],
        employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"],
    },
    {
        subject: "13S081M2",
        employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"],
        group: [
            {
                name: "P1",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
            {
                name: "V1",
                employees: ["pera@etf.bg.ac.rs"]
            }
        ]
    },
    {
        subject: "13S112OS1",
        employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"],
        group: [
            {
                name: "P1",
                employees: ["pera@etf.bg.ac.rs"]
            },
            {
                name: "P2",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
            {
                name: "V1",
                employees: ["pera@etf.bg.ac.rs"]
            },
            {
                name: "V2",
                employees: ["zika@etf.bg.ac.rs"]
            }
        ]
    },
    {
        subject: "13S112VD",
        employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"],
        group: [
            {
                name: "P1",
                employees: ["pera@etf.bg.ac.rs", "zika@etf.bg.ac.rs"]
            },
            {
                name: "V1",
                employees: ["zika@etf.bg.ac.rs"]
            }
        ]
    }
];

function seedAssignments(): void {
    for (let a of assignments) {
        let assignment = new Assignment(a);
        assignment.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        })
    }
}

function seedAllAssignments(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('Assignment', function (err, result) { });

    new Promise(resolve => {
        seedAssignments();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllAssignments };