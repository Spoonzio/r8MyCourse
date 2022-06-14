const express = require("express");

// reviewRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const reviewRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
// GET: {{url}}/courses
// 
// Response: 
// [
//     {
//         "_id": "622d703e692d2279f99785fe",
//         "department": "622d6eb6692d2279f99785fc",
//         "courseId": "COMP 1510",
//         "courseName": "Programming Methods"
//     },
//     {
//         "_id": "622d7051692d2279f99785ff",
//         "department": "622d6eb6692d2279f99785fc",
//         "courseId": "COMP 1113",
//         "courseName": "Applied Mathematics"
//     }
// ]
reviewRoutes.route("/review").get(function (req, res) {
    let db_connect = dbo.getDb("");
    db_connect
        .collection("review")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


// This section will help you get records by DEPARTMENT ID
// GET: {{url}}/reviews/course/622d6eb6692d2279f99785fc
// 
// Response: 
// {
//     "_id": "622d703e692d2279f99785fe",
//     "department": "622d6eb6692d2279f99785fc",
//     "courseId": "COMP 1510",
//     "courseName": "Programming Methods"
// }
reviewRoutes.route("/reviews/course/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { course: req.params.id };

    //return all the reviews that belong to the course
    db_connect.collection("reviews").find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


// This section will help you get a single record by id
// GET: {{url}}/courses/622d703e692d2279f99785fe
// 
// Response: 
// {
//     "_id": "622d703e692d2279f99785fe",
//     "department": "622d6eb6692d2279f99785fc",
//     "courseId": "COMP 1510",
//     "courseName": "Programming Methods"
// }
reviewRoutes.route("/review/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };

    db_connect
        .collection("review")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
// POST: {{url}}/review
//
// Request:
//
// {
//     "advice": "advice to the future students",
//     "comment": "comment on the course",
//     "commentOnProf": "comment on the professor",
//     "content": "course content",
//     "deliveryMethod": "In person",
//     "grade": "100-86%",
//     "professorName": "professorName2",
//     "term": "Fall",
//     "textbookUse": "Yes",
//     "workload": "Very Light",
//     "year": "2022",
//     "evaluationMethods": [
//       "Attendance heavy",
//       "Homework heavy",
//       "Projects heavy",
//       "Labs heavy",
//       "Exams heavy",
//       "Quizzes heavy"
//     ],
//     "overallRating": 5,
//     "easiness": 4,
//     "interest": 3,
//     "usefulness": 2,
//     "professorRating": 1
//   }
//
// Response:
// {
//     "acknowledged": true,
//     "insertedId": "622d7051692d2279f99785ff"
// }
reviewRoutes.route("/review/:course").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        course: req.params.course,
        advice: req.body.advice,
        comment: req.body.comment,
        commentOnProf: req.body.commentOnProf,
        content: req.body.content,
        deliveryMethod: req.body.deliveryMethod,
        grade: req.body.grade,
        professorName: req.body.professorName,
        term: req.body.term,
        textbookUse: req.body.textbookUse,
        workload: req.body.workload,
        evaluationMethods: req.body.evaluationMethods,
        overallRating: req.body.overallRating,
        easiness: req.body.easiness,
        interest: req.body.interest,
        usefulness: req.body.usefulness,
        professorRating: req.body.professorRating,
        year: req.body.year,
    };
        
    db_connect.collection("reviews").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
// PUT: {{url}}/courses/622d703e692d2279f99785fe
// 
// Request: 
// {
//     "deptId": "622d6eb6692d2279f99785fc",
//     "courseId": "COMP 1113",
//     "courseName": "Applied Mathematics"
// }
//
// Response:
// {
//     "acknowledged": true,
//     "modifiedCount": 1,
//     "upsertedId": null,
//     "upsertedCount": 0,
//     "matchedCount": 1
// }
reviewRoutes.route("/courses/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            department: req.body.deptId,
            courseId: req.body.courseId,
            courseName: req.body.courseName
        },
    };

    db_connect
        .collection("courses")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
// DELETE: {{url}}/courses/622d6ee4692d2279f99785fd

// Response:
// {
//     "acknowledged": true,
//     "deletedCount": 1
// }
reviewRoutes.route("/courses/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("courses").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = reviewRoutes;