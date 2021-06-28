const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookie());

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

app.use('/api/dialogflow', require('./server/routers/dialogflow'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("cloent/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

const port = process.env.PROT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})