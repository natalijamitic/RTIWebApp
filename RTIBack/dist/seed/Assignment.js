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
exports.seedAllAssignments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Assignment_1 = require("../model/Assignment");
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
function seedAssignments() {
    for (let a of assignments) {
        let assignment = new Assignment_1.Assignment(a);
        assignment.save().then(u => {
            //console.log("Successfuly saved a user in db.");
        }).catch(err => {
            console.log("Error, couldn't save a user in db.");
        });
    }
}
function seedAllAssignments() {
    const db = mongoose_1.default.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose_1.default.connection;
    connection.db.dropCollection('Assignment', function (err, result) { });
    new Promise(resolve => {
        seedAssignments();
    }).then((u) => __awaiter(this, void 0, void 0, function* () {
        (yield db).disconnect();
    }));
}
exports.seedAllAssignments = seedAllAssignments;
//# sourceMappingURL=Assignment.js.map