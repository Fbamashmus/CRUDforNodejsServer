const express =  require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./router");

app.use(bodyParser.urlencoded({extended: false}));
const port = 3000;

app.use('/api', route);

app.get('/', (req, res)=>{
    res.end("Routing App");
})

app.listen(port,()=>{
    console.log("running")
})