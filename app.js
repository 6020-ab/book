const Joi = require('joi');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());

app.set('view-engine', 'ejs');

// Patient Records> /patients
// Patient/age > /patients/id/age
// 


const patients = [{ 
    id : 1, 
    name : "Sarah", 
    age : "34", 
    Height : "165", 
    Notes: "has nuts allergy" }];
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


//READ Request Handlers
app.get('/', (req, res) => {
    res.render('home.ejs');
    });

app.get('/patients/add', (req, res) => {
    res.render('add.ejs');
    });

app.get('/patients/view', (req, res) => {
    res.render('index.ejs');
    });

//READ Request Handlers
app.get('/patients', (req, res) => {
    res.send(patients);
       });


//READ Request Handlers :find Patiend records
app.get('/patients/:id', (req, res) => {
 let patient = patients.find(c => c.id === parseInt(req.params.id));
 if(!patient) res.status(404).send('The patient with the given ID was not found');
 res.send(patient);
    });

//POST Request Handlers : Add new patient record
app.post('/patients', (req, res) =>{
    const { error } = validatePatient(req.body);

    if (error) {
        //400 Bad Request
        console.log(error);
        res.status(400).send(error.details[0].message);
        return;
    }
    const patient = {
    id: patients.length + 1,
    name: req.body.name,
    age: req.body.age,
    Height: req.body.Height,
    Notes: req.body.Notes

};
console.log(patient);
  patients.push(patient);
  res.render('updated.ejs');

})

//PUT Request Handlers :update Patient records
app.put('/patients/:id', (req, res) => {
//look up patient records
//if it doesn't exist, 404
const patient = patients.find(c => c.id === parseInt(req.params.id));
 if(!patient) res.status(404).send('The patient with the given ID was not found');


//Validate it
//const result = validatePatient(req.body);
const { error } = validatePatient(req.body);

if (error) {
    //400 Bad Request
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
}
//update patient name, age, Height, Notes
patient.name=req.body.name;
patient.age=req.body.age;
patient.Height=req.body.Height;
patient.Notes=req.body.Notes;

patients.push(patient);
res.render('updated.ejs');
});

//DELETE Handler : Delete patient records
app.delete('/patients/:id', (req, res) =>{
    //Look up course
    //if not exist, 404
    const patient = patients.find(c => c.id === parseInt(req.params.id));
     if(!patient) res.status(404).send('The patient with the given ID was not found');

    //delete
    const index = patients.indexOf(patient);
    patients.splice(index, 1);
    //return same course
    res.send(patient);
    res.render('deleted.ejs');
    });


//Separate function
function validatePatient(patient){
    const schema = Joi.object({
        name: Joi.string(),
        age: Joi.string(),
        Height: Joi.string(),
        Notes: Joi.string(),
    });

return schema.validate(patient);
}




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));