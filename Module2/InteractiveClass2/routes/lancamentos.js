import express from "express";
import {inserirLancamento, totalMes} from "../controllers/lancamentoController.js"



const routes = express.Router();


router.post("/receita", (req,res) => {
    try{
        res.send(await inserirLancamento(req.body));
    }catch (err){
        res.status(400).send(err.message);
    }
});

router.post("/despesa", (req,res) => {
   try{
        res.send(await inserirLancamento(req.body,"D"));
    }catch (err){
        res.status(400).send(err.message);
    }
});

router.get("/totalMes/:mes", async (req,res)=>{
    try{
        res.send(await totalMes(parse.Int(res.params.mes)));
    }catch (err){
        res.status(400).send(err.message);
    }
});
export default router;