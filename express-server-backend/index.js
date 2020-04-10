const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const SELECT_ALL = "SELECT * from authors limit 10";
const SELECT_TEST = "SELECT * FROM authors WHERE name = 'sampleName'";

var current_id = 1001;

const app = express();
const connection = mysql.createConnection({
    host: "18.217.28.210",
    user: "developer",
    password: "@TeamTower2020",
    database: "google_scholar_db"
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send("go to /authors to see authors");
});

app.get('/authors', (req, res) => {
    connection.query(SELECT_TEST, function (err, results, fields) {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
});

app.get('/authors/add', (req, res) => {
    const { name, affiliation, citedby, attributes, page, email, interests, url_picture } = req.query;
    const INSERT_AUTHOR = `INSERT INTO authors (id, name, affiliation, citedby, attributes, page, email, interests, url_picture)`
        + `VALUES(` + (current_id++) + `, '${name}', '${affiliation}', '${citedby}', '${attributes}', '${page}', '${email}', '${interests}', '${url_picture}')`;
    connection.query(INSERT_AUTHOR, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("successfully added author");
        }
    });
});

app.get('/authors/delete', (req, res) => {
    const { name } = req.query;
    const DELETE_AUTHOR = `DELETE FROM authors WHERE name = '${name}'`;
    connection.query(DELETE_AUTHOR, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("successfully deleted author");
        }
    });
});

app.listen(3030, () => {
    console.log("server listening on port 3030");
});