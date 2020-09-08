# qureight-technical-${SimonPaul}
install instructions:
$ npm init
$ npm install --save express
$ npm install --save body-parser
$ npm install -g nodemon
$ npm i joi
$ 
 
 To Run:
 $ nodemon app.js
 
 1) in browser, enter 'localhost:8080'
 
User Interface contains:
homepage(home.ejs)
Add new patient(add.ejs)
Patient Updated (updated.ejs)
Patient Deleted Page(deleted.ejs) - [not working]
View Patients(index.ejs) -[not working]
Edit Patient(edit.ejs) - [not working]

Flow of User Interface:

Home<--->View Patients
Home<----> Add Patient <-Submit--->Patient Updated---->Home

Patient record is stored, but unable to be displayed :(
