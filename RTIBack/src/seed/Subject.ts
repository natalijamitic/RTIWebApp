
import mongoose from 'mongoose';
import Subject from '../model/Subject';


const subjects = [
    {
        type: "obavezni",
        semestar: 1,
        code: "13S111P1",
        weekly: {
            lecutre: 3,
            exercise: 2,
            lab: 0
        },
        espb: 5,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove programiranja.",
        haveLab: false,
        project: [{
            isHidden: true,
            basicInfo: "Projekat Crazy Snake - zmijica kao na nokiji",
            examinationProcess: "Pokrece se igrica na racunaru u paviljonu i objasnjava se ukratko kako je implementirana."
        }],
        notifications: [
            {
                title: "Obavestenje 1",
                content: "Obavezno prijvate ovaj predmete kako biste bili u toku s informacijama."
            }
        ]
    },
    {
        type: "obavezni",
        semestar: 2,
        code: "13S081M2",
        weekly: {
            lecutre: 3,
            exercise: 2,
            lab: 0
        },
        espb: 5,
        classTime: ["Ponedeljak 18", "Sreda 14"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove matematike 2.",
        haveLab: false
    },
    {
        type: "izborni",
        semestar: 4,
        code: "13S112VD",
        weekly: {
            lecutre: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove veb programiranja.",
        haveLab: true,
        lab: {
            isHidden: false,
            numberOfLabs: 3,
            basicInfo: "Lab se radi u paviljonu.",
            labs: [{
                labDescription: "Prva lab vezba zahteva poznavanje gradiva od 10-120 strane"
            },{
                labDescription: "Druga lab vezba zahteva poznavanje gradiva od 120-220 strane"
            },{
                labDescription: "Treca lab vezba zahteva poznavanje gradiva od 220-260 strane"
            }]
        },
        project: [{
            isHidden: true,
            basicInfo: "Projekat - Sajt za teretanu",
            examinationProcess: "Pokrece se na racunaru u paviljonu i objasnjava se ukratko kako je implementiran."
        }]
    },
    {
        type: "obavezni",
        semestar: 4,
        code: "13S112OS1",
        weekly: {
            lecutre: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove operativnih sistema.",
        haveLab: false,
        project: [{
            isHidden: true,
            basicInfo: "Visenitni OS",
            examinationProcess: "Pokrece se na racunaru u paviljonu i objasnjava se ukratko kako je implementiran."
        }]
    }
];

function seedSubjects(): void {
    for (let s of subjects) {
        let subject = new Subject(s);
        subject.save().then(u => {
            //ok
        }).catch(err => {
            console.log("Error, couldn't save a subject in db.");
        })
    }
}


function seedAllSubjects(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('Subjects', function (err, result) { });

    new Promise(resolve => {
        seedSubjects();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllSubjects };