const express = require("express");
const fs = require("fs");

const app = express();
const port = 4000;

app.set('trust proxy', true);
app.use(express.json());
app.use(systemLogger);

var courses = [];

function systemLogger(req, res, next) {
    console.log(req.method, req.ip, req.hostname);
    next();
}

function fetchCourses() {
    let path = __dirname + "/data/courses.json";
    fs.readFile(path, (err, data) => {
        if (err) throw err;
        courses = JSON.parse(data);
    });
}

function saveCourses() {
    let path = __dirname + "/data/courses.json";
    fs.writeFile(path, JSON.stringify(courses), (err) => {
        if (err) throw err;
    });
}

app.get("/", (req, res) => {
    res.send("<script>location.replace('/postman');</script>");
});

app.get("/postman", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
    res.send({message: "Hello API!"});
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.post("/api/courses", (req, res) => {
    let course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    saveCourses();
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    let updatedCourse = courses.find(c => c.id === parseInt(req.params.id));
    if (!updatedCourse) {
        res.send({"message": "The course with the given ID was not found"});
        return;
    }

    updatedCourse.name = req.body.name;

    saveCourses();
    res.send(updatedCourse);
});

app.delete("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.send({"message": "The course with the given ID was not found"});
        return;
    }

    let index = courses.indexOf(course);
    courses.splice(index, 1);

    saveCourses();
    res.send(course);
});

app.listen(port, () => {
    fetchCourses();
    console.log(`Serving on http://localhost:${port}`);
});

