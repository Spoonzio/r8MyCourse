const express = require("express");

// courseRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const courseRoutes = express.Router();

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
courseRoutes.route("/courses").get(function (req, res) {
    let db_connect = dbo.getDb("");
    db_connect
        .collection("courses")
        .find({})
        .toArray(function (err, result) {
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
courseRoutes.route("/courses/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };

    db_connect
        .collection("courses")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get records by DEPARTMENT ID
// GET: {{url}}/courses/department/622d6eb6692d2279f99785fc
// 
// Response: 
// {
//     "_id": "622d703e692d2279f99785fe",
//     "department": "622d6eb6692d2279f99785fc",
//     "courseId": "COMP 1510",
//     "courseName": "Programming Methods"
// }
courseRoutes.route("/courses/department/:id").get(async function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { department: req.params.id };

    //return all the courses that belong to the department
    db_connect.collection("courses").find(myquery).toArray(async function (err, result) {
        if (err) throw err;

        await result.forEach(async c => {
            let courseQuery = { course: c._id };
            await db_connect.collection("reviews").find(courseQuery).toArray(function (err, reviewResult) {
                if (err) throw err;
                // res.json(courseResult);
                c.courseReview = reviewResult.length;
            });
        });

        //return all the reviews that belong to the course
        res.json(result);
    });


    // db_connect.collection("courses").find(myquery).forEach(function (courseDoc) {

    //     let courseQuery = { course: courseDoc._id };
    //     db_connect.collection("reviews").find(courseQuery).forEach(function (reviewDoc) {
    //         courseDoc.courseReview = reviewDoc.length;
    //     });

    //     //return all the reviews that belong to the course
    //     res.json(courseDoc);
    // });

        //return all the courses that belong to the department
    // var result = await db_connect.collection("courses").find(myquery).map(async function(c){
    //     let courseQuery = { course: c._id };
        
    //     var array = await db_connect.collection("reviews").find(courseQuery).toArray();
        
    //     c.courseReview = array.length;
    //     console.log(c)

    //     return c;
    // })
    // .toArray();

    // res.json(result);
});

// This section will help you create a new record.
// POST: {{url}}/courses
//
// Request:
//
// {
//     "deptId": "622d6eb6692d2279f99785fc",
//     "courseId": "COMP 1113",
//     "courseName": "Applied Mathematics"
// }
//
// Response:
// {
//     "acknowledged": true,
//     "insertedId": "622d7051692d2279f99785ff"
// }
courseRoutes.route("/courses").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        department: req.body.department,
        courseId: req.body.courseId,
        courseName: req.body.courseName
    };
        
    db_connect.collection("courses").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });

});

courseRoutes.route("/courses/fromArray/:department").post(function (req, response) {
    let db_connect = dbo.getDb();

    let array = req.body;
    array = array.map(item => {
        var obj = {
            department: req.params.department,
            courseName: item.substring(0, item.lastIndexOf("(") - 1),
            courseId: item.substring(item.lastIndexOf("(") + 1, item.lastIndexOf(")"))
        }
        return obj;
    });
    console.log(array);
    db_connect.collection("courses").insertMany(array, function (err, res) {
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
courseRoutes.route("/courses/:id").put(function (req, response) {
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
courseRoutes.route("/courses/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("courses").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = courseRoutes;