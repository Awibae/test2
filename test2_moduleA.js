var students = [];

var fs = require('fs');

module.exports.init = () => {
    return new Promise(function(resolve, reject) {
        fs.readFile('./students.json', (err, data) => {
            if (err) {
                reject("Unable to read file");
            }
            else {
                students = JSON.parse(data);
                resolve();
            }
        })
    })
}
module.exports.getBSD = () => {
    return new Promise(function(resolve, reject) {
        if (students.length <= 0) {
            reject("No results returned");
        }
        else {
            resolve(students);
        }
    })
}
module.exports.highGPA = () => {
    return new Promise(function(resolve, reject) {
        var highestStudent = students[0];
        var highestMark = 0.0;
        for (var i = 0; i < students.length; i++) {
            if (students[i].gpa > highestStudent.gpa) {
                highestStudent = students[i];
                highestMark = students[i].gpa;
            } 
        }
    if (students.length > 0) {
        resolve(highestStudent);
        console.log("resolved");
    }
    else {
        reject("Failed finding the student with the highest GPA");
        console.log("rejected");
    }})
}