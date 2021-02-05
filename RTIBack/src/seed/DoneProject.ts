import mongoose from 'mongoose';
import DoneProject from '../model/DoneProject'

const projects = [
    {
        title: "Projekat Tastatura Za Mikrotalasnu",
        members: ["Zarko Marjanov", "Prof Ninoslav Kovelja"],
        description: "Realizacija 64 tastature 0x832 za mikrotalasnu."
    },
    {
        title: "Projekat Stampac",
        members: ["Arnaut Janko", "Relja Vukic"],
        description: "Realizacija stampaca bez papira i bez tonera."
    },
    {
        title: "Projekat Punjac",
        members: ["Ognjen Ilic", "Ognjen Misic"],
        description: "Punjac koji se napaja putem solarne energije."
    },
    {
        title: "Projekat Zdravstvene Kartice",
        members: ["Thomas Filippo Tavares Marinho", "Izmir Klazur"],
        description: "Zdravstvene kartice za drzavljane Belgije."
    },
    {
        title: "Projekat Monitor",
        members: ["Marina Djurisic", "Snezana Cosic", "Dusica Todorovic"],
        description: "Nema opisa."
    }
]

function seedProjects(): void {
    for (let p of projects) {
        let project = new DoneProject(p);
        project.save().then(u => {
           // saved
        }).catch(err => {
            console.log("Error, couldn't save a done project type in db.");
        })
    }
}

function seedAllDoneProjects(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('DoneProject', function (err, result) { });

    new Promise(resolve => {
        seedProjects();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllDoneProjects };