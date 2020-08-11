import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("hello world!");
});

app.post("/", (req,res) => {
    res.send("hello world post!");
});

app.all("/testAll", (req,res) => {
    res.send(req.method);
});

app.get("/teste?", (_,res) => {
    res.send("/teste?");
});


app.get("/teste+", (_,res) => {
    res.send("/teste+");
});

app.get("/teste*one", (_,res) => {
    res.send("/teste*one");
});

app.post("/test(ing)?", (_,res) => {
    res.send("/test(ing)?");
});

app.post("/body(ing)?", (req,res) => {
    console.log(req.body);
    res.send("/test(ing)?");
});

//params   na rota
app.get("/testParam/:id", (req,res) => {
    res.send(req.params.id);
});

app.get(/.*Red$/, (req,res) => {
    res.send("/.*Red$/");
});

//parametros via query
app.get("/testQuery", (req,res) => {
    res.send(req.query);
});

//next
app.get("/testMultipleHandlers", (req,res, next) => {
    console.log("Calback 1");
    next();
}, (req, res) => {
    console.log("Calback 2");
    res.end();
});

//next com array
const callback1 = (req,res, next) => {
    console.log("Calback 1");
    next();
};
function callback2 (req, res,next) {
    console.log("Calback 2");
    next();
};
const callback3 = (req,res) => {
    console.log("Calback 3");
    res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);


//route
app.route("./testeRoute")
    .get((req,res) => {
        res.send("/testeRoute GET");
    })
    .post((req, res) => {
        res.send("/testeRoute POST");
    })
    .delete((req,res)=>{
        res.send("/testeRoute DELETE");
    })
app.listen(3000,()=>{
    console.log("api started!");
})