import mongoose from 'mongoose';
import List from '../model/List';

const lists = [
    {
        code: "13S112OS1",
        author: 'pera@etf.bg.ac.rs',
        deadline: '2022-02-02 16:40:32.690Z',
        title: 'Spisak 1',
        time: '28.12.2020. 15:00',
        place: '26B',
        limit: '2',
        files : [
            {
                student : "mm170017d@student.etf.rs",
                file : "PIA_Lekcija1_Uvod.zip``mm170017d@student.etf.rs`2614.7763671875`1612381208636.zip"
            }
        ]
    },
    {
        code: "13S112OS1",
        author: 'pera@etf.bg.ac.rs',
        deadline: '2021-02-04 16:40:32.690Z',
        title: 'Spisak 2',
        time: '8.2.2022. 15:00',
        place: '26B',
        limit: '1',
        files : [
            {
                student : "mm170017d@student.etf.rs",
                file : "PIA_Lekcija1_Uvod.zip``mm170017d@student.etf.rs`2614.7763671875`1612381208636.zip"
            }
        ]
    },
    {
        code: "13S112OS1",
        author: 'zika@etf.bg.ac.rs',
        deadline: '2021-02-20 16:40:32.690Z',
        title: 'Spisak 3',
        time: '28.12.2021. 15:00',
        place: '26B',
        limit: '0',
    }
]

function seedLists(): void {
    for (let l of lists) {
        let list = new List(l);
        list.save().then(u => {
           // saved
        }).catch(err => {
            console.log("Error, couldn't save a list type in db.");
        })
    }
}

function seedAllLists(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('List', function (err, result) { });

    new Promise(resolve => {
        seedLists();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllLists };