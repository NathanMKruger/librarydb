const { MongoClient, ObjectId } = require("mongodb")

class Library {
    constructor(dbUrl, dbName, collName) {
        this.dbUrl = dbUrl
        this.dbName = dbName
        this.collName = collName
        this.dbClient
    }

    async client() {
        console.log(`Connecting to ${this.dbUrl}`)
        this.dbClient = MongoClient.connect(this.dbUrl)
        console.log(`Connected to database`)
        return this.dbClient
    }

    async test() {
        const client = await this.client()
        client.close()
    }

    async collection() {
        const client = await this.client()
        const db = client.db(this.dbName)
        const collection = db.collection(this.collName)
        return collection
    }

    async allBooks() {
        const collection = await this.collection()
        return collection.find({}).toArray()
    }

    async findOneBook(id) {
        const docId = new ObjectId(id)
        const collection = await this.collection()
        return collection.findOne(docId)
    }

    async findManyBooks(query) {
        const collection = await this.collection()
        return collection.find(query).toArray()   
    }
    
    async addBook(info) {
        const collection = await this.collection()

        if (!(info instanceof Object)) throw Error("Incorrect data type. Takes object")

        await collection.insertOne(info)
        console.log("Book successfully added")
    }

    async changeBook(id, newInfo) {
        const mongoId = new ObjectId(id)
        const collection = await this.collection()
        const infoObj = { $set: newInfo }
        const result = await collection.updateOne({ _id: mongoId }, infoObj)

        if (result.modifiedCount === 0) return "Nothing to delete"

        console.log("Book successfully updated")
        return result
    }

    async removeBook(id) {
        const mongoId = new ObjectId(id)
        const collection = await this.collection()
        await collection.deleteOne({ _id: mongoId })
        console.log("Book has been deleted")
    }

}

module.exports = Library