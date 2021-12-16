console.clear();
import Professional from './professional.js';
import express from 'express';
import cors from 'cors';

let professional1 = new Professional ("Carlos", 34, "Masculino", 70, 170, "castaño", "azules", "arte dramatico", true, "español", 5, "actor");
let professional2 = new Professional ("Estefanía", 25, "Femenino", 55, 160, "Pelirroja", "Marrones", "diseño grafico", false, "italiana", 0, "actriz");
let professional3 = new Professional ("Juan", 36, "Masculino", 80, 180, "castaño", "negros", "arte dramatico", false, "español", 5, "actor");
let professional4 = new Professional ("Pepe", 54, "Masculino", 90, 184, "moreno", "Marrones", "diseño grafico", true, "italiana", 0, "actriz");
let professional5 = new Professional ("María", 23, "Femenino", 60, 170, "rubia", "azules", "arte dramatico", false, "español", 5, "actor");
let professional6 = new Professional ("Sandra", 38, "Femenino", 55, 1680, "Pelirroja", "verdes", "diseño grafico", false, "italiana", 0, "actriz");

let profesionales = [];

profesionales.push(professional1);
profesionales.push(professional2);
profesionales.push(professional3);
profesionales.push(professional4);
profesionales.push(professional5);
profesionales.push(professional6);

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/profesionales",
    function (req, res) {
        console.log('GET /profesionales - recibida');
        let respuesta;
        const id = parseInt(req.query.id);
        if (profesionales.length != 0 && !req.query.id){
            respuesta = {error: false, codigo: 200, mensaje: 'Datos de los profesionales', resultado: profesionales};
        } else if (profesionales.length >= id){
            respuesta = {error: false, codigo: 200, mensaje: 'Datos del profesional', resultado: profesionales[id-1]};
        } else if ((req.query.id !== undefined) && isNaN(id)){
            respuesta = {error: true, codigo: 200, mensaje: 'El id ha de ser un número', resultado: []};
        } else if (profesionales.length == 0){
            respuesta = {error: true, codigo: 200, mensaje: 'No hay profesionales.', resultado: []};
        };
        res.send(respuesta);
    }
);

app.get("/profesionales/:id",
    function (req, res) {
        console.log('GET /profesionales/:id - recibida');
        let respuesta;
        const id = parseInt(req.params.id);
        if (profesionales.length >= id){
            respuesta = {error: false, codigo: 200, mensaje: 'Datos de los profesionales', resultado: profesionales[id-1]};
        } else {
            respuesta = {error: true, codigo: 200, mensaje: 'No se ha encontrado el profesional', resultado: []};
        }
        res.send(respuesta);
    }
);

app.post("/profesionales",
    function (req, res) {
        console.log('POST /profesional - recibida');
        const profesional = new Professional(
            req.body.name,
            req.body.age,
            req.body.genre,
            req.body.weight,
            req.body.height,
            req.body.hairColor,
            req.body.eyeColor,
            req.body.race,
            req.body.isRetired,
            req.body.nationality,
            req.body.oscarsNumbers,
            req.body.profession
        );        
        const prevLength = profesionales.length;
        const newLength = profesionales.push(profesional);
        let respuesta;
        if (prevLength != newLength) {
            respuesta = { error: false, codigo: 200, mensaje: 'Profesional añadido con éxito', resultado: profesionales };
        } else {
            respuesta = { error: true, codigo: 200, mensaje: 'No se pudo añadir el profesional', resultado: profesionales };
        }
        res.send(respuesta);
    }
);      

app.put("/profesionales",
    function (req, res) {
         console.log('PUT /profesionales - recibida')
         let respuesta;
         let modificado = false;
         const id = parseInt(req.body.id);
         if (req.body.id !== undefined){
            if ((id>0) && (id<=profesionales.length)) {
                if ( req.body.name !== undefined && profesionales[id-1].name != req.body.name) {profesionales[id-1].name = req.body.name; modificado = true};
                if ( req.body.age !== undefined && profesionales[id-1].age != req.body.age) {profesionales[id-1].age = req.body.age; modificado = true};
                if ( req.body.genre !== undefined && profesionales[id-1].genre != req.body.genre) {profesionales[id-1].genre = req.body.genre; modificado = true};
                if ( req.body.weight !== undefined && profesionales[id-1].weight != req.body.weight) {profesionales[id-1].weight = req.body.weight; modificado = true};
                if ( req.body.height !== undefined && profesionales[id-1].height != req.body.height) {profesionales[id-1].height = req.body.height; modificado = true};
                if ( req.body.hairColor !== undefined && profesionales[id-1].hairColor != req.body.hairColor) {profesionales[id-1].hairColor = req.body.hairColor; modificado = true};
                if ( req.body.eyeColor !== undefined && profesionales[id-1].eyeColor != req.body.eyeColor) {profesionales[id-1].eyeColor = req.body.eyeColor; modificado = true};
                if ( req.body.race !== undefined && profesionales[id-1].race != req.body.race) {profesionales[id-1].race = req.body.race; modificado = true};
                if ( req.body.isRetired !== undefined && profesionales[id-1].isRetired != req.body.isRetired) {profesionales[id-1].isRetired = req.body.isRetired; modificado = true};
                if ( req.body.nationality !== undefined && profesionales[id-1].nationality != req.body.nationality) {profesionales[id-1].nationality = req.body.nationality; modificado = true};
                if ( req.body.oscarsNumbers !== undefined && profesionales[id-1].oscarsNumbers != req.body.oscarsNumbers) {profesionales[id-1].oscarsNumbers = req.body.oscarsNumbers; modificado = true};
                if ( req.body.profession !== undefined && profesionales[id-1].profession != req.body.profession) {profesionales[id-1].profession = req.body.profession; modificado = true};
                if (modificado) {
                    respuesta = {error: false, codigo: 200, mensaje: 'Profesional actualizado correctamente', resultado: profesionales[id-1]};
                } else {
                    respuesta = {error: false, codigo: 200, mensaje: 'El profesional no se ha modificado', resultado: profesionales[id-1]};
                }
                } else {
                    respuesta = {error: false, codigo: 200, mensaje: 'El profesional no existe', resultado: []};
                }
         } else {
            respuesta = {error: true, codigo: 200, mensaje: 'Se necesita un id'};
         };
         res.send(respuesta);
    } 
);

app.delete("/profesionales",
    function (req, res) {
         console.log('DEL /profesionales - recibida');
         const id = parseInt(req.body.id);
         let respuesta;
         if ((id>0) && (id<=profesionales.length)) {
             profesionales.splice(id-1, 1);
             respuesta = {error: false, codigo: 200, mensaje: 'Profesional borrado correctamente', resultado: profesionales};
         } else {
             respuesta = {error: true, codigo: 200, mensaje: 'El profesional no existe', resultado: profesionales};
         }
         res.send(respuesta);
    }
);

app.listen(3000);
console.log('Servidor escuchando peticiones en el puerto 3000');
