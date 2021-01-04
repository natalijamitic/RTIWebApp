import mongoose from 'mongoose';
import DoneProject from '../model/DoneProject'

const projects = [
    {
        title: "Projekat 1",
        members: ["Dr.Vet.Med", "Zarko Marjanov", "Prof Ninoslav Kovelja"],
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 2",
        members: ["Aleksa Zdravkovic", "Nikolina Jovanovic"],
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 3",
        members: ["Grupa anonimnih autora"],
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 4",
        members: ["Vlastelin Duhovlatic", "Ozbek Urgundi"],
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
    },
    {
        title: "Projekat 5",
        members: ["Nada Stosic", "Brankica Doric", "Kata Manojlovic", "Igor Trubar"],
        description: "Za opis ovog projekta kontaktirajte stud sluzbu."
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