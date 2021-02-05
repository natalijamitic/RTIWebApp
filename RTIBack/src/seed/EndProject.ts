import mongoose from 'mongoose';
import EndProject from '../model/EndProject'

const projects = [
    {
        title: "Projekat 1",
        purpose: "Nema namenu.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 2",
        purpose: "Nema namenu.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 3",
        purpose: "Nema namenu.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 4",
        purpose: "Nema namenu.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 5",
        purpose: "Nema namenu.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    }
]

function seedProjects(): void {
    for (let p of projects) {
        let project = new EndProject(p);
        project.save().then(u => {
           // saved
        }).catch(err => {
            console.log("Error, couldn't save an end project type in db.");
        })
    }
}

function seedAllEndProjects(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('EndProject', function (err, result) { });

    new Promise(resolve => {
        seedProjects();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllEndProjects };