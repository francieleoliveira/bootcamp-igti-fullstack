// import fs from "fs";

//sempre esta sobrescrevendo o conteudo do file
// fs.writeFile("teste.txt", "blabla", function(err){
//     if (err){
//         console.log(err);
//     } else{
//         fs.readFile("teste.txt", "utf-8",function(err, data){
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log(data);
//             }
//         });
//     }
// });

//escreve no file, adicionando conteudo, console.log(number) - exemplo event loop
// console.log(1);
// fs.writeFile("teste.txt", "blabla", function(err){
//     console.log(2);
//     if (err){
//         console.log(err);
//     } else{
//         fs.appendFile("teste.txt", "\n teste append on file", function(err){
//             if(err){
//                 console.log(err);
//             }else{
//                 fs.readFile("teste.txt", "utf-8",function(err, data){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });
// console.log(3);

//blocking executions with async
// try{
//     console.log(1);
//     fs.writeFileSync("teste.txt","oioioi");
//     console.log(2);
//     const data = fs.readFileSync("teste.txt", "utf-8");
//     console.log(data);
//     console.log(3);
// }catch(err){

// }

// using with promises
import {promises as fs} from "fs";

// fs.writeFile("teste.txt", "blablabla bla").then(()=>{
//     fs.appendFile("teste.txt","\n appending to file").then(()=>{
//         fs.readFile("teste.txt", "utf-8").then(resp=>{
//             console.log(resp);
//         }).catch(err=>{
//             console.log(err);
//         });
//     }).catch(err=> {
//         console.log(err);
//     });
// }

// ).catch(err => {
//     console.log(err);
// });

init();
async function init(){
    try{
        await fs.writeFile("teste.txt", "blablabla bla");
        await fs.appendFile("teste.txt","\n appending to file");
        const data = await fs.readFile("teste.txt", "utf-8");
        console.log(data);
    }catch(err){
        console.log(err);
    }
}

