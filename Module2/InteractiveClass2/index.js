import express from "express";
import {promises as fs} from "fs";
import lancamentosRouter from "./routes/lancamentos.js"

const {writeFile} = fs;
global.fileName = "lancamentos.json"
const app = express();
app.use(express.json());

app.use("/lancamentos",lancamentosRouter);

app.get("/teste", (req,res) => {
    res.send("Hello world!");
});

app.listen(3000, async () => {
    try{
        const initialization = {
        nextId:1,
        lancamentos: []
        }
        await writeFile(global.fileName, JSON.stringify(initialization));
        console.log("API Started");
    }catch(err){

    }
    
});