import {promises as fs} from "fs";

// init();
writeReadJson();
// async function init(){
//     try{
//         await fs.writeFile("teste.txt", "blablabla bla");
//         await fs.appendFile("teste.txt","\n appending to file");
//         const data = await fs.readFile("teste.txt", "utf-8");
//         console.log(data);
//     }catch(err){
//         console.log(err);
//     }
// }

async function writeReadJson(){
    try{
        console.log("write")
        const carros = ["gol","palio", "onix"];
        const obj = {
            carros: carros
        }
        await fs.writeFile("teste.json", JSON.stringify(obj));

        const data = JSON.parse(await fs.readFile("teste.json", "utf-8"));
        console.log(data);
    }catch(err){
        console.log(err);
    }

}

