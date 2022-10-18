var moduleA = require('./test2_moduleA');
var express = require("express");
var app = express();
app.use(express.static('public'));
var HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req, res) {
    let resText = "<h2>Declaration</h2>";
    resText += "<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates... even when no one is watching. I declare I will not break that trust.</p>";
    resText += "<p>Name: <mark>Alexander Banigan</p></mark>"
    resText += "<p>Student Number: <mark>151167202</p></mark>"
    resText += "<a href='/BSD'>Click to visit BSD Students</a><br>";
    resText += "<a href='/highGPA'>Click to see who has the highest GPA</a>";
    res.send(resText);
})

app.get("/BSD", function(req,res) {
    moduleA.getBSD().then(function(students) {
        res.json(students);
    }).catch(function(error) {
        res.json(error);
    })
})
app.get("/highGPA", function(req, res) {
    moduleA.highGPA().then(function(student) {
        let resText = "<h2>Highest GPA:</h2>";
        resText += "Student ID: " + student.studId + "<br>";
        resText += "Name: " + student.name + "<br>";
        resText += "Program: " + student.program + "<br>";
        resText += "GPA: " + student.gpa;
        res.send(resText);
    }).catch(function(error) {
        res.json(error);
    })
    
})
app.use((req, res)=> {
    res.status(404).send("Page not found");
})
moduleA.init().then(function() {
    app.listen(HTTP_PORT, onHttpStart);
}).catch(function(error) {
    res.json(error);
})
