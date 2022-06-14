const express = require("express");

// departmentRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const departmentRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
// GET: {{url}}/departments
//
// Response:
// {
//     "deptName" : "Computing & IT"
// }
departmentRoutes.route("/departments").get(function (req, res) {
    let db_connect = dbo.getDb("");
    db_connect
        .collection("departments")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


// This section will help you get a single record by id
// GET: {{url}}/departments/622d478ec4658b56e9bd4ae3
//
// Response:
// {
//     "_id": "622d478ec4658b56e9bd4ae3",
//     "deptName": "Computing & IT"
// }
departmentRoutes.route("/departments/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };

    db_connect
        .collection("departments")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
// POST: {{url}}/departments
//
// Request:
// {
//     "deptName" : "Computing & IT"
// }
//
// Response:
// {
//     "acknowledged": true,
//     "insertedId": "622d478ec4658b56e9bd4ae3"
// }
departmentRoutes.route("/departments").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        deptName: req.body.deptName,
    };
    
    db_connect.collection("departments").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
// PUT: {{url}}/departments/622d478ec4658b56e9bd4ae3
//
// Request:
// {
//     "deptName" : "Computing"
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
departmentRoutes.route("/departments/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            deptName: req.body.deptName
        },
    };
    db_connect
        .collection("departments")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
// DELETE: {{url}}/departments/622d478ec4658b56e9bd4ae3
//
// Response: 
// {
//     "acknowledged": true,
//     "deletedCount": 1
// }
departmentRoutes.route("/departments/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("departments").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = departmentRoutes;