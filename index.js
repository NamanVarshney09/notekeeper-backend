const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
app.use(cors())

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
console.log(port);

/* 
  *express.json() is a built-in middleware function in the Express.js web framework.
  *It parses incoming JSON data from the request body of an HTTP POST or PUT request
  *and makes it available in the request.body object.
*/
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`NoteKeeper backend listening on port http://localhost:${port}`)
})