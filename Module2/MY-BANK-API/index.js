import express from "express";
import accountsRouter from "./routes/account.js";
import {promises as fs} from "fs";

const {readFile, writeFile} = fs;

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
    
    try {
        await readFile("accounts.json");
    } catch (err){
        const initialJson = { 
                nextId: 1,
                acconts: []
            };
       writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
            console.log("API Started and file created!");
       }).catch(err => {
           console.log(err);
       });
    }
});