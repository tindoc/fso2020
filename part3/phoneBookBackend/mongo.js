const mongoose = require('mongoose')

let addFlag = false
let name = ""
let number = ""

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else if (process.argv.length === 5) {
    addFlag = true
    name = process.argv[3]
    number = process.argv[4]
}

const password = process.argv[2]
const url =
    `mongodb+srv://dev:${password}@cluster0.qbap3.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if (!addFlag) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });

        mongoose.connection.close()
    })

} else {
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}