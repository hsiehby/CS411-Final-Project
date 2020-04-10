const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const SELECT_ALL = "SELECT * from authors ORDER BY id DESC limit 10";
const SELECT_TEST = "SELECT * FROM authors WHERE name = 'sampleName'";

var current_id = 10001;

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
    connection.query(SELECT_ALL, function (err, results, fields) {
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
    const { id } = req.query;
    const DELETE_AUTHOR = `DELETE FROM authors WHERE id = '${id}'`;
    connection.query(DELETE_AUTHOR, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("successfully deleted author");
        }
    });
});

app.get('/authors/update', (req, res) => {
    const { id, name, affiliation, citedby, attributes, page, email, interests, url_picture } = req.query;
    var UPDATE_AUTHOR = `UPDATE authors `
        + `SET `;
    var columns = [];
    if (name) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `name=?, `;
        columns.push(name);
    }
    if (affiliation) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `affiliation = ?, `;
        columns.push(affiliation);
    }
    if (citedby) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `citedby = ?, `;
        columns.push(citedby);
    }
    if (attributes) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `attributes = ?, `;
        columns.push(attributes);
    }
    if (page) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `page = ?, `;
        columns.push(page);
    }
    if (email) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `email = ?, `;
        columns.push(email);
    }
    if (interests) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `interests = ?, `;
        columns.push(interests);
    }
    if (url_picture) {
        UPDATE_AUTHOR = UPDATE_AUTHOR + `url_picture = ?`;
        columns.push(url_picture);
    }
    if (UPDATE_AUTHOR.charAt(UPDATE_AUTHOR.length - 2) == ',') {
        UPDATE_AUTHOR = UPDATE_AUTHOR.substring(0, UPDATE_AUTHOR.length - 2);
    }
    UPDATE_AUTHOR = UPDATE_AUTHOR + `WHERE id = '${id}'`;
    connection.query(UPDATE_AUTHOR, columns, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("successfully updated author");
        }
    });
});

app.listen(3030, () => {
    console.log("server listening on port 3030");
});