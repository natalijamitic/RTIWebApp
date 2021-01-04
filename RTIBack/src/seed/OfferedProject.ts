import mongoose from 'mongoose';
import OfferedProject from '../model/OfferedProject'

const projects = [
    {
        title: "Projekat 1",
        purpose: "Namena ovog projekta je neopisiva recima.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 2",
        purpose: "Namena ovog projekta je neopisiva recima.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 3",
        purpose: "Namena ovog projekta je neopisiva recima.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 4",
        purpose: "Namena ovog projekta je neopisiva recima.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 5",
        purpose: "Namena ovog projekta je neopisiva recima.",
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    }
]

function seedProjects(): void {
    for (let p of projects) {
        let project = new OfferedProject(p);
        project.save().then(u => {
           // saved
        }).catch(err => {
            console.log("Error, couldn't save a offered project type in db.");
        })
    }
}

function seedAllOfferedProjects(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('OfferedProject', function (err, result) { });

    new Promise(resolve => {
        seedProjects();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllOfferedProjects };