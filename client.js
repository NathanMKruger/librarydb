require("dotenv").config()
const Library = require("./library")
const DB_URL = process.env.DB_URL

const collection = new Library(DB_URL, "library", "books")

// collection.test()

// ? Display all books
// collection.allBooks().then(data => console.log(data))

async function render() {
    // ? Display all books
    // console.log(await collection.allBooks())

    // ? Display one book
    // console.log(await collection.findOneBook("649b29fcc41bcda39a547077"))

    // ? Find many books
    // console.log(await collection.findManyBooks({
    //     $or: [
    //         { author: "Marcus Zusack"},
    //         { author: "Cormac McCarthy"}
    //     ]
    // }))
    // collection.removeBook("649b29fcc41bcda39a547075")
    
}

render()