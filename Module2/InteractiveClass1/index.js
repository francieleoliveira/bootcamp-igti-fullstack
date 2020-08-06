import {promises as fs} from "fs";

const times = [];



async function  init() {
    try{
        const data = JSON.parse(await fs.readFile("2003.json"));

    // initialize teams array
        data[0].partidas.forEach(partida => {
            times.push({time: partida.mandante, pontuacao : 0}, {time: partida.visitante, pontuacao: 0});
        });

     //initialize pontuation 
          data.forEach(rodada => {
            rodada.partidas.forEach(partida => {
                const timeMandante = times.find(item => item.time === partida.mandante);
                const timeVisitante = times.find(item => item.time === partida.visitante);

                if(partida.placar_mandante > partida.placar_mandante){
                    timeMandante.pontuacao +=3;
                } else if (partida.placar_visitante > partida.placar_mandante){
                    timeVisitante.pontuacao +=3;
                } else {
                    timeMandante.pontuacao +=1;
                    timeVisitante.pontuacao +=1;
                }
            });
        });

        times.sort((a,b)=> {
            return b.pontuacao - a.pontuacao;
        });
        await salvaTimes();
        await salvaQuatroPrimeiros();
    } catch(err){
        console.log(err);
    }
  
}

init();


async function salvaTimes(){
    await fs.writeFile("times.json",JSON.stringify(times, null, 2));
}

async function salvaQuatroPrimeiros(){
    await fs.writeFile("quatroPrimeiros.json",JSON.stringify(times.slice(0,4), null, 2));
}