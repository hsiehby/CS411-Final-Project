var mysql = require('mysql');

var con = mysql.createConnection({
    host: "18.217.28.210",
    user: "developer",
    password: "@TeamTower2020",
    database: "google_scholar_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM authors WHERE name = 'Camila Lorenz'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});