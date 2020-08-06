import {promises as fs} from "fs";

init();

async function init(){

    await createFiles();
    await getStatesWithMoreOrLessCities(true);
    await getStatesWithMoreOrLessCities(false);
}

async function createFiles(){
    try {
        let data = await fs.readFile("./files/estados.json");
        const states = JSON.parse(data);
        
        data = await fs.readFile("./files/cidades.json");
        const cities = JSON.parse(data);
    
        for (var state of states){
            const stateCities = cities.filter(city => city.Estado === state.ID);
            await fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(stateCities));
        }
    }catch(err){
        console.log(err);
    }
}


async function getCitiesCount(uf){
    const data = await fs.readFile(`./states/${uf}.json`);
    const cities = JSON.parse(data);

    return cities.length;
}

async function getStatesWithMoreOrLessCities(more){
    const states = JSON.parse(await fs.readFile("./files/estados.json"));
    const list = [];

    for (var state of states){
        const count = await getCitiesCount(state.Sigla);
        list.push({uf: state.Sigla, count});
    }
    
    list.sort((a,b) => {
        if(a.count < b.count) return 1;
        else if (a.count > b.count) return -1;
        else return 0;
    });

    const result = [];
    if (more){
        list.slice(0,5).forEach(item=> result.push(item.uf + " - " + item.count));
    } else {
        list.slice(-5).forEach(item=> result.push(item.uf + " - " + item.count));
    }
    
    console.log(result);
}

