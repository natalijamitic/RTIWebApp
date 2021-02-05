
import mongoose from 'mongoose';
import Subject from '../model/Subject';


const subjects = [
    {
        type: "obavezni",
        semestar: 1,
        department: 'si',
        title: "Programiranje 1",
        code: "13S111P1",
        timetable: {
            lecture: 2,
            exercise: 2,
            lab: 1
        },
        espb: 5,
        examMaterials : {
            examples : [
                "PIA_Lekcija1_Uvod.zip``Petar`Petrovic`2614.7763671875`1612380803288.zip"
            ],
            solutions : [
                "PIA_Lekcija1_Uvod.zip``Petar`Petrovic`2614.7763671875`1612380814674.zip"
            ],
            isHidden: false
        },
        propositions: "Barem 50 poena da bi se polozio ispit.",
        goal: "Cilj je nauciti osnove programiranja.",
        classTime: ["Utorak 18", "Cetvrtak 11"],
        excerTime: ["Utorak 18", "Cetvrtak 11"],
        bLab: true,
        lab : {
            isHidden : false,
            numberOfLabs : 3,
            basicInfo: "Lab se radi u paviljonu.",
            labs : [
                {
                    labDescription : "Prva lab vezba obuhvata pptx 1-5",
                    labMaterials : [
                        "PIA_Lekcija3_JSP.pdf``Petar`Petrovic`1153.5576171875`1612380829225.pdf"
                    ]
                },
                {
                    labDescription : "Druga lab vezba obuhvata pttx 6-10",
                    labMaterials : [
                        "PIA_Lekcija3_JSP.pdf``Petar`Petrovic`1153.5576171875`1612380829225.pdf"
                    ]
                },
                {
                    labDescription : "Treca lab vezba obuhvata pptx 11-15",
                    labMaterials : [
                        "PIA_Lekcija3_JSP.pdf``Petar`Petrovic`1153.5576171875`1612380829225.pdf"
                    ]
                }
            ]
        },
        lectures : [
            "PIA_Lekcija1_Uvod.pdf``Petar`Petrovic`2874.3115234375`1612380773696.pdf",
            "PIA_Lekcija3_JSP.pdf``Petar`Petrovic`1153.5576171875`1612380783831.pdf",
            "PIA_Lekcija4_JSF.pdf``Petar`Petrovic`1929.515625`1612380783850.pdf"
        ],
        exercises : [
            "PIA_Lekcija3_JSP.pdf``Petar`Petrovic`1153.5576171875`1612380791666.pdf",
            "PIA_Lekcija4_JSF.pdf``Petar`Petrovic`1929.515625`1612380791697.pdf"
        ],
        project: {
            isHidden: false,
            projects: [{
                basicInfo: "Projekat Tetris igrica",
                examinationProcess: "Potrebno je pokrenuti igricu u paviljonu i objasniti implementaciju.",
                projectMaterials: new Array()
            }]
        },
        notifications: [
            {
                title: "Obavestenje 1",
                content: "Obavezno prijavite ovaj predmet kako biste bili u toku s informacijama.1",
                creator: "pera@etf.bg.ac.rs",
                dateCreation: '2021-01-02 16:40:32.690Z',
                files : [
                    "PIA_Lekcija4_JSF.pdf`Obavestenje 2`pera@etf.bg.ac.rs`1929.515625`1612381719031.pdf"
                ]
            },
            {
                title: "Obavestenje 2",
                content: "Obavezno prijavite ovaj predmet kako biste bili u toku s informacijama.2",
                creator: "pera@etf.bg.ac.rs"
            },
            {
                title: "Obavestenje 3",
                content: "Obavezno prijavite ovaj predmet kako biste bili u toku s informacijama.3",
                creator: "mika@etf.bg.ac.rs"
            }
        ],
    },
    {
        type: "obavezni",
        semestar: 2,
        title: "Matematika 2",
        code: "13S081M2",
        department: 'si',
        timetable: {
            lecture: 1,
            exercise: 1,
            lab: 0
        },
        espb: 5,
        classTime: ["Cetvrta 18", "Petak 8"],
        excerTime: ["Petak 8", "Petak 10"],
        propositions: "Propozicije tek treba da budu odbjavljene.",
        goal: "Cilj je nauciti osnove matematike 2.",
        bLab: false,
    },
    {
        type: "izborni",
        semestar: 4,
        title: "Veb Dizajn",
        code: "13S112VD",
        department: 'si',
        timetable: {
            lecture: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Utorak 8", "Cetvrtak 10"],
        excerTime: ["Utorak 8", "Cetvrtak 10"],
        propositions: "Propozicije tek treba da budu odbjavljene.",
        goal: "Cilj je nauciti osnove veb programiranja.",
        bLab: true,
        lab: {
            isHidden: false,
            numberOfLabs: 3,
            basicInfo: "Lab se radi u paviljonu.",
            labs: [{
                labDescription: "Prva lab vezba zahteva poznavanje gradiva od 10-120 strane",
                labMaterials: new Array()
            }, {
                labDescription: "Druga lab vezba zahteva poznavanje gradiva od 120-220 strane",
                labMaterials: new Array()
            }, {
                labDescription: "Treca lab vezba zahteva poznavanje gradiva od 220-260 strane",
                labMaterials: new Array()
            }]
        },
        project: {
            isHidden: true,
            projects: [{
                basicInfo: "Projekat - Sajt za teretanu",
                examinationProcess: "Pokrece se na racunaru u paviljonu i objasnjava se ukratko kako je implementiran.",
                projectMaterials: new Array()
            }]
        },
        notifications: [
            {
                title: "Obavestenje 43",
                content: "Obavezno prijavite ovaj predmet kako biste bili u toku s informacijama.43",
                creator: "mika@etf.bg.ac.rs"
            }
        ]
    },
    {
        type: "obavezni",
        semestar: 4,
        code: "13S112OS1",
        title: "Operativni sistemi 1",
        department: 'si',
        timetable: {
            lecture: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Utorak 8", "Cetvrtak 10"],
        excerTime: ["Utorak 8", "Cetvrtak 10"],
        propositions: "Propozicije tek treba da budu odbjavljene.",
        goal: "Cilj je nauciti osnove operativnih sistema.",
        bLab: false,
        project: {
            isHidden: true,
            projects: [{
                basicInfo: "Visenitni OS",
                examinationProcess: "Pokrece se na racunaru u paviljonu i objasnjava se ukratko kako je implementiran.",
                projectMaterials: new Array()
            }]
        },
    },
    {
        type: "obavezni",
        semestar: 2,
        title: "Evolucija softvera",
        code: "13М111ЕС",
        department: 'master',
        timetable: {
            lecture: 2,
            exercise: 2,
            lab: 0
        },
        espb: 6,
        classTime: ["Utorak 18", "Cetvrtak 14"],
        excerTime: ["Utorak 8", "Cetvrtak 10"],
        propositions: "Propozicije tek treba da budu odbjavljene.",
        goal: "Cilj je nauciti osnove.",
        bLab: false,
    },
    {
        type: "obavezni",
        semestar: 1,
        title: "Teorija algoritama",
        code: "13М111ТА",
        department: 'master',
        timetable: {
            lecture: 2,
            exercise: 2,
            lab: 0
        },
        espb: 6,
        classTime: ["Utorak 18", "Cetvrtak 14"],
        excerTime: ["Utorak 8", "Cetvrtak 10"],
        propositions: "Propozicije tek treba da budu odbjavljene.",
        goal: "Cilj je nauciti osnove.",
        bLab: false
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

    connection.db.dropCollection('Subject', function (err, result) { });

    new Promise(resolve => {
        seedSubjects();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllSubjects };