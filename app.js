const Joi = require('joi');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');


// Patient Records> /patients
// Patient/age > /patients/id/age
// 

//create 'database' to post patient records
const patients = [{ 
    id: 1, 
    name: "Sarah",  
    age: "34", 
    Height: "165",
    Notes: "has nuts allergy"
}];

// l0op to work on displaying  the patients details to be show on the website
for (i= 0; i< patients.length; i++){


    console.log(patients[i]);
}




    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


//HomePage
app.get('/', (req, res) => {
    res.render('home.ejs');
    });

//Add New Patient
app.get('/patients/add', (req, res) => {
    res.render('add.ejs');
    });
//View Patient Records
app.get('/patients/view', (req, res) => {
    res.render("index.ejs",  {array: patients} );
//    console.log(patients);
    });
//Edit Patient Records
app.get('/patients/view/edit', (req, res) => {
    res.render('edit.ejs');
    });


//Handler to view patient records in JSON format [READ Operation]
app.get('/patients', (req, res) => {
    res.send(patients);
       });


//Handlers to find Patient records in JSON format [READ Operation]
app.get('/patients/:id', (req, res) => {
 let patient = patients.find(c => c.id === parseInt(req.params.id));
 if(!patient) res.status(404).send('The patient with the given ID was not found');
 res.send(patient);
    });

//Handler to add new patient record [CREATE Operation]
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
//console.log(patient);
  patients.push(patient);
  res.render('updated.ejs');

})

// Handler to update/edit Patient records [UPDATE Operation]
app.put('/patients/:id', (req, res) => {

    //look up patient records,if it doesn't exist, 404
const patient = patients.find(c => c.id === parseInt(req.params.id));
 if(!patient) res.status(404).send('The patient with the given ID was not found');


//Validate it
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
res.render('patient')
});

// Handler to delete patient records [DELETE Operation]
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


// Function to validate Patient record array
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