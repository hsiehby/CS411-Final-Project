const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const SELECT_ALL_AUTHORS = "SELECT * from authors ORDER BY id DESC limit 10";
const SELECT_ALL_ARTICLES = "SELECT * from articles ORDER BY id DESC limit 10";
const SELECT_ALL_AFFILS = "SELECT * from affiliations ORDER BY id limit 10";
const SELECT_ALL_USERS = "SELECT * from users ORDER BY id limit 10";

const SELECT_ALL_AUTHOREDBY = "SELECT * from authoredBy ORDER BY articleId limit 10";
const SELECT_ALL_LIKEDBY = "SELECT * from likedBy ORDER BY articleId limit 10";
const SELECT_ALL_ACCESSEDBY = "SELECT * from accessedBy ORDER BY articleId limit 10";
const SELECT_ALL_FOLLOWEDBY = "SELECT * from followedBy ORDER BY userId limit 10";
const SELECT_ALL_ARTICLEAFFILWITH = "SELECT * from articleAffiliatedWith ORDER BY affilId limit 10";
const SELECT_ALL_AUTHORAFFILWITH = "SELECT * from authorAffiliatedWith ORDER BY affilId limit 10";
const SELECT_ALL_USERAFFILWITH = "SELECT * from userAffiliatedWith ORDER BY affilId limit 10";


const SELECT_TEST = "SELECT * FROM authors WHERE name = 'sampleName'";

var current_author_id = 10001;
var current_article_id = 1569;
var current_affiliation_id = 1;
var current_user_id = 1;

const app = express();

const pool = mysql.createPool({
    connectionLimit: 100,
    waitForConnections: true,
    queueLimit: 0,
    host: "18.217.28.210",
    user: "developer",
    password: "@TeamTower2020",
    database: "google_scholar_db"
});

app.use(cors());

app.get('/', (req, res) => {
    res.send("go to /authors to see authors");
});

/** ----------------------------------------------------------------------------------------------------------PORT-- **/
app.listen(3030, () => {
    console.log("server listening on port 3030");
});

/** ----------------------------------------------------------------------------------------------------------------------------OBJECTS **/
/** ----------------------------------------------------------------------------------------------------------AUTHORS-- **/
app.get('/authors', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_AUTHORS, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

app.get('/authors/add', (req, res) => {
    const { name, affiliation, citedby, attributes, page, email, interests, url_picture } = req.query;
    const INSERT_AUTHOR = `INSERT INTO authors (id, name, affiliation, citedby, attributes, page, email, interests, url_picture)`
        + `VALUES(` + (current_author_id++) + `, '${name}', '${affiliation}', '${citedby}', '${attributes}', '${page}', '${email}', '${interests}', '${url_picture}')`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(INSERT_AUTHOR, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully added author");
                }
            });
        }
    });
});

app.get('/authors/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_AUTHOR = `DELETE FROM authors WHERE id = '${id}'`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(DELETE_AUTHOR, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully deleted author");
                }
            });
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

    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(UPDATE_AUTHOR, columns, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully updated author");
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------ARTICLES-- **/
app.get('/articles', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_ARTICLES, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

app.get('/articles/add', (req, res) => {
    const { name, pub_title, eprint, pub_year, pub_publisher, pub_number, pub_author, journal, pub_url, citedby } = req.query;
    const INSERT_ARTICLE = `INSERT INTO articles (id, name, citedby, pub_title, pub_year, pub_author, eprint, pub_number, pub_publisher, pub_url, journal)`
        + `VALUES(` + (current_article_id++) + `, '${name}', '${citedby}', '${pub_title}', '${pub_year}', '${pub_author}', '${eprint}', '${pub_number}', '${pub_publisher}', '${pub_url}', '${journal}')`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(INSERT_ARTICLE, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully added article");
                }
            });
        }
    });
});

app.get('/articles/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_ARTICLE = `DELETE FROM articles WHERE id = '${id}'`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(DELETE_ARTICLE, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully deleted author");
                }
            });
        }
    });
});

app.get('/articles/update', (req, res) => {
    const { id, name, pub_title, eprint, pub_year, pub_publisher, pub_number, pub_author, journal, pub_url, citedby } = req.query;
    var UPDATE_ARTICLE = `UPDATE articles `
        + `SET `;
    var columns = [];
    if (name) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `name=?, `;
        columns.push(name);
    }
    if (pub_title) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `pub_title = ?, `;
        columns.push(pub_title);
    }
    if (eprint) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `eprint = ?, `;
        columns.push(eprint);
    }
    if (pub_year) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `pub_year = ?, `;
        columns.push(pub_year);
    }
    if (pub_publisher) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `pub_publisher = ?, `;
        columns.push(pub_publisher);
    }
    if (pub_number) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `pub_number = ?, `;
        columns.push(pub_number);
    }
    if (pub_author) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `pub_author = ?, `;
        columns.push(pub_author);
    }
    if (journal) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `journal = ?`;
        columns.push(journal);
    }
    if (pub_url) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `pub_url = ?`;
        columns.push(pub_url);
    }
    if (citedby) {
        UPDATE_ARTICLE = UPDATE_ARTICLE + `citedby = ?`;
        columns.push(citedby);
    }

    if (UPDATE_ARTICLE.charAt(UPDATE_ARTICLE.length - 2) == ',') {
        UPDATE_ARTICLE = UPDATE_ARTICLE.substring(0, UPDATE_ARTICLE.length - 2);
    }
    UPDATE_ARTICLE = UPDATE_ARTICLE + `WHERE id = '${id}'`;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(UPDATE_ARTICLE, columns, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully updated author");
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------AFFILIATIONS-- **/
app.get('/affiliations', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_AFFILS, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

app.get('/affiliations/add', (req, res) => {
    const { name, popular_topics } = req.query;
    const INSERT_AFFIL = `INSERT INTO affiliations (id, name, popular_topics)`
        + `VALUES(` + (current_affiliation_id++) + `, '${name}', '${popular_topics}')`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(INSERT_AFFIL, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully added affiliation");
                }
            });
        }
    });
});

app.get('/affiliations/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_AFFIL = `DELETE FROM affiliations WHERE id = '${id}'`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(DELETE_AFFIL, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully deleted affiliation");
                }
            });
        }
    });
});

app.get('/affiliations/update', (req, res) => {
    const { id, name, popular_topics } = req.query;
    var UPDATE_AFFIL = `UPDATE affiliations `
        + `SET `;
    var columns = [];
    if (name) {
        UPDATE_AFFIL = UPDATE_AFFIL + `name=?, `;
        columns.push(name);
    }
    if (popular_topics) {
        UPDATE_AFFIL = UPDATE_AFFIL + `popular_topics = ?, `;
        columns.push(popular_topics);
    }

    if (UPDATE_AFFIL.charAt(UPDATE_AFFIL.length - 2) == ',') {
        UPDATE_AFFIL = UPDATE_AFFIL.substring(0, UPDATE_AFFIL.length - 2);
    }
    UPDATE_AFFIL = UPDATE_AFFIL + `WHERE id = '${id}'`;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(UPDATE_AFFIL, columns, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully updated affiliation");
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------USERS-- **/
app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_USERS, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

app.get('/users/add', (req, res) => {
    const { name, email, interests } = req.query;
    const INSERT_USER = `INSERT INTO users (id, name, email, interests)`
        + `VALUES(` + (current_user_id++) + `, '${name}', '${email}', '${interests}')`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(INSERT_USER, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully added users");
                }
            });
        }
    });
});

app.get('/users/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_USER = `DELETE FROM users WHERE id = '${id}'`;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(DELETE_USER, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully deleted users");
                }
            });
        }
    });
});

app.get('/users/update', (req, res) => {
    const { id, name, email, interests } = req.query;
    var UPDATE_USER = `UPDATE users `
        + `SET `;
    var columns = [];
    if (name) {
        UPDATE_USER = UPDATE_USER + `name=?, `;
        columns.push(name);
    }
    if (email) {
        UPDATE_USER = UPDATE_USER + `email = ?, `;
        columns.push(email);
    }
    if (interests) {
        UPDATE_USER = UPDATE_USER + `interests = ?, `;
        columns.push(interests);
    }

    if (UPDATE_USER.charAt(UPDATE_USER.length - 2) == ',') {
        UPDATE_USER = UPDATE_USER.substring(0, UPDATE_USER.length - 2);
    }
    UPDATE_USER = UPDATE_USER + `WHERE id = '${id}'`;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(UPDATE_USER, columns, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.send("successfully updated users");
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------------------------RELATIONS **/
/** ----------------------------------------------------------------------------------------------------------Authored By-- **/
app.get('/authoredBy', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_AUTHOREDBY, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------Liked By-- **/
app.get('/likedBy', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_LIKEDBY, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------Accessed By-- **/
app.get('/accessedBy', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_ACCESSEDBY, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------Followed By-- **/
app.get('/followedBy', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_FOLLOWEDBY, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------Article Affiliated With-- **/
app.get('/articleAffiliatedWith', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_ARTICLEAFFILWITH, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------Author Affiliated With-- **/
app.get('/authorAffiliatedWith', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_AUTHORAFFILWITH, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});

/** ----------------------------------------------------------------------------------------------------------User Affiliated With-- **/
app.get('/userAffiliatedWith', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.send(err);
        } else {
            connection.query(SELECT_ALL_USERAFFILWITH, (err, results) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                } else {
                    connection.release();
                    return res.json({ data: results });
                }
            });
        }
    });
});
