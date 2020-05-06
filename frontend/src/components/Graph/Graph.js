import React, { useState } from 'react';
import * as NeoVis from 'neovis.js';
import './graph.css';
import { Button } from '@material-ui/core';

function Graph() {
    const MAX_NODES = 100;
    const [loading, setLoading] = useState(false);
    const [authorName, setAuthorName] = useState();
    const [authorAffiliation, setAuthorAffiliation] = useState();
    const [authorCitedBy, setAuthorCitedBy] = useState();
    const [authorAttributes, setAuthorAttributes] = useState();
    const [authorPage, setAuthorPage] = useState();
    const [authorEmail, setAuthorEmail] = useState();
    const [authorInterests, setAuthorInterests] = useState();
    const [authorUrlPicture, setAuthorUrlPicture] = useState();
    const [q1Article, setQ1Article] = useState();
    const [q1Affiliation, setQ1Affiliation] = useState();
    const [q2Author, setQ2Author] = useState();
    const [q3Author, setQ3Author] = useState();
    const [cypherQuery, setCypherQuery] = useState(`match p = (a:Author)<-[:AUTHOR_AFFILIATED_WITH]-(af:Affiliation) return distinct p limit ${MAX_NODES}`);

    var authors = [];

    const addAuthor = async () => {
        var neo4j = require('neo4j-driver');
        var driver = neo4j.driver('bolt://18.234.80.174:33151', neo4j.auth.basic('neo4j', 'violation-plating-cheat'));
        var query =
            "CREATE (n:Author {name: $name, affiliation: $affiliation, citedby: $citedby, attributes: $attributes, page: $page, email: $email, interests: $interests, urlPicture: $urlPicture})";

        var params = {};
        if (authorName != null) params["name"] = authorName; else params["name"] = "";
        if (authorAffiliation != null) params["affiliation"] = authorAffiliation; else params["affiliation"] = "";
        if (authorCitedBy != null) params["citedby"] = authorCitedBy; else params["citedby"] = "";
        if (authorAttributes != null) params["attributes"] = authorAttributes; else params["attributes"] = "";
        if (authorPage != null) params["page"] = authorPage; else params["page"] = "";
        if (authorEmail != null) params["email"] = authorEmail; else params["email"] = "";
        if (authorInterests != null) params["interests"] = authorInterests; else params["interests"] = "";
        if (authorUrlPicture != null) params["urlPicture"] = authorUrlPicture; else params["urlPicture"] = "";

        var session = driver.session();

        await session.run(query, params)
            .then(function (result) {
                result.records.forEach(function (record) {
                    authors.push(record.get("n.name"));
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(authors);
        await session.close();
    };

    const deleteAuthor = async () => {
        var neo4j = require('neo4j-driver');
        var driver = neo4j.driver('bolt://18.234.80.174:33151', neo4j.auth.basic('neo4j', 'violation-plating-cheat'));
        var query =
            "MATCH (n:Author {name: $name}) DELETE n";

        var params = {};
        if (authorName != null) params["name"] = authorName; else params["name"] = null;

        var session = driver.session();

        await session.run(query, params)
            .then(function (result) {
                result.records.forEach(function (record) {
                    authors.push(record.get("n.name"));
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(authors);
        await session.close();
    };

    const updateAuthor = async () => {
        var neo4j = require('neo4j-driver');
        var driver = neo4j.driver('bolt://18.234.80.174:33151', neo4j.auth.basic('neo4j', 'violation-plating-cheat'));
        var query =
            "MATCH (n:Author {name: $name}) SET n.affiliation = $affiliation, n.citedby = $citedby, n.attributes = $attributes, n.page = $page, n.email = $email, n.interests = $interests, n.urlPicture = $urlPicture";

        var params = {};
        if (authorName != null) params["name"] = authorName; else params["name"] = "";
        if (authorAffiliation != null) params["affiliation"] = authorAffiliation; else params["affiliation"] = "";
        if (authorCitedBy != null) params["citedby"] = authorCitedBy; else params["citedby"] = "";
        if (authorAttributes != null) params["attributes"] = authorAttributes; else params["attributes"] = "";
        if (authorPage != null) params["page"] = authorPage; else params["page"] = "";
        if (authorEmail != null) params["email"] = authorEmail; else params["email"] = "";
        if (authorInterests != null) params["interests"] = authorInterests; else params["interests"] = "";
        if (authorUrlPicture != null) params["urlPicture"] = authorUrlPicture; else params["urlPicture"] = "";

        var session = driver.session();

        await session.run(query, params)
            .then(function (result) {
                result.records.forEach(function (record) {
                    authors.push(record.get("n.name"));
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(authors);
        await session.close();
    };

    // const getAuthorsList = async () => {
    //   var neo4j = require('neo4j-driver');
    //   var driver = neo4j.driver('bolt://18.234.80.174:33151', neo4j.auth.basic('neo4j', 'violation-plating-cheat'));
    //   var query = 
    //   "MATCH (n:Author) RETURN n.name LIMIT $limit";

    //   var params = {"limit": 100};

    //   var session = driver.session();

    //   await session.run(query, params)
    //     .then(function(result) {
    //       result.records.forEach(function(record) {
    //           authors.push(record.get("n.name"));
    //       })
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    //   console.log(authors);
    // };

    const getAuthor = () => {
        setCypherQuery(`MATCH (n:Author {name: '${authorName}'}) RETURN n`);
        loadGraph();
    }

    const loadGraph = () => {
        document.getElementById('graph').innerHTML = '';
        setLoading(true);

        const config = {
            container_id: "graph",
            server_url: "bolt://18.234.80.174:33151",
            server_user: "neo4j",
            server_password: "violation-plating-cheat",
            labels: {
                "Affiliation": {
                    "caption": "name",
                    "size": "pagerank",
                    "community": "community"
                },
                "Author": {
                    "caption": "name",
                    "size": "pagerank",
                    "community": "community"
                },
                "AffiliationTopic": {
                    "caption": "name",
                    "size": "pagerank",
                    "community": "community"
                },
                "Article": {
                    "caption": "pubTitle",
                    "size": "pagerank",
                    "community": "community"
                },
                "User": {
                    "caption": "name",
                    "size": "pagerank",
                    "community": "community"
                }
            },
            relationships: {
                "AUTHORED_BY": {
                    "thickness": "weight",
                    "caption": true,
                    "arrows": true
                }
            },
            initial_cypher: cypherQuery
        };

        const graphContainer = new NeoVis.default(config);

        graphContainer.registerOnEvent(
            'completed', () => { setLoading(false); });

        graphContainer.render();
    };

    const getAuthorArticleAffiliations = () => {
        setCypherQuery(`MATCH p=(af:Affiliation {name: "${q1Affiliation}"})-[r:ARTICLE_AFFILIATED_WITH]->(ar: Article {pubTitle: "${q1Article}"}) RETURN distinct p`);
        loadGraph();
    };

    const getAuthorAffiliations = () => {
        setCypherQuery(`match p = (a:Author {name: "${q2Author}"})-[:AUTHOR_AFFILIATED_WITH]-() return p`);
        loadGraph();
    };

    const getAuthorArticles = () => {
        setCypherQuery(`match p = (a:Author {name: "${q3Author}"})-[:AUTHORED_BY]-() return p`);
        loadGraph();
    };

    return (
        <>
            <Button variant="primary" onClick={loadGraph}><b>Load graph</b></Button>

            <div>
                <Button variant="primary" onClick={e => setCypherQuery(`MATCH p=()-[r:ARTICLE_AFFILIATED_WITH]->() RETURN p LIMIT ${MAX_NODES}`)}>Author Article Affiliation Relationships</Button>
                <Button variant="primary" onClick={e => setCypherQuery(`match p = (a:Author)<-[:AUTHOR_AFFILIATED_WITH]-(af:Affiliation) return distinct p limit ${MAX_NODES}`)}>Author Affiliation Relationships</Button>
                <Button variant="primary" onClick={e => setCypherQuery(`MATCH p=()-[r:AUTHORED_BY]->() RETURN p LIMIT ${MAX_NODES}`)}>Authored By Relationships</Button>
                {/* <Button variant="primary" onClick={getAuthorsList}>Link 3</Button> */}
            </div>

            <div className="user-input">
                <div className="options">
                    <button onClick={getAuthorArticleAffiliations}>Get Specific Author Article Affiliation Relationships</button>
                    <input
                        placeholder="Affiliation"
                        value={q1Affiliation}
                        onChange={event => setQ1Affiliation(event.target.value)} />
                    <input
                        placeholder="Article "
                        value={q1Article}
                        onChange={event => setQ1Article(event.target.value)} />
                </div>

                <div className="options">
                    <button onClick={getAuthorAffiliations}>Get Specific Author Affiliation Relationships</button>
                    <input
                        placeholder="Author "
                        value={q2Author}
                        onChange={event => setQ2Author(event.target.value)} />
                </div>

                <div className="options">
                    <button onClick={getAuthorArticles}>Get Author's Articles</button>
                    <input
                        placeholder="Author "
                        value={q3Author}
                        onChange={event => setQ3Author(event.target.value)} />
                </div>

                <div className="options">
                    <button onClick={getAuthor}>Get Author</button>
                    <input
                        placeholder="name"
                        value={authorName}
                        onChange={event => setAuthorName(event.target.value)} />
                </div>

                <div className="options">
                    <div className="add_author">
                        <button onClick={addAuthor}>Add Author</button>
                        <input
                            placeholder="name"
                            value={authorName}
                            onChange={event => setAuthorName(event.target.value)} />
                        <input
                            placeholder="affiliation"
                            value={authorAffiliation}
                            onChange={event => setAuthorAffiliation(event.target.value)} />
                        <input
                            placeholder="citedby"
                            value={authorCitedBy}
                            onChange={event => setAuthorCitedBy(event.target.value)} />
                        <input
                            placeholder="attributes"
                            value={authorAttributes}
                            onChange={event => setAuthorAttributes(event.target.value)} />
                        <input
                            placeholder="page"
                            type="number"
                            value={authorPage}
                            onChange={event => setAuthorPage(event.target.value)} />
                        <input
                            placeholder="email"
                            value={authorEmail}
                            onChange={event => setAuthorEmail(event.target.value)} />
                        <input
                            placeholder="interests"
                            value={authorInterests}
                            onChange={event => setAuthorInterests(event.target.value)} />
                        <input
                            placeholder="url_picture"
                            value={authorUrlPicture}
                            onChange={event => setAuthorUrlPicture(event.target.value)} />
                    </div>
                </div>
                <div className="options">
                    <div className="delete_author">
                        <button onClick={deleteAuthor}>Delete Author By Name</button>
                        <input
                            placeholder="name"
                            value={authorName}
                            onChange={event => setAuthorName(event.target.value)} />
                    </div>
                </div>
                <div className="options">
                    <div className="update_author">
                        <button onClick={updateAuthor}>Update Author By Name</button>
                        <input
                            placeholder="name"
                            value={authorName}
                            onChange={event => setAuthorName(event.target.value)} />
                        <input
                            placeholder="affiliation"
                            value={authorAffiliation}
                            onChange={event => setAuthorAffiliation(event.target.value)} />
                        <input
                            placeholder="citedby"
                            value={authorCitedBy}
                            onChange={event => setAuthorCitedBy(event.target.value)} />
                        <input
                            placeholder="attributes"
                            value={authorAttributes}
                            onChange={event => setAuthorAttributes(event.target.value)} />
                        <input
                            placeholder="page"
                            type="number"
                            value={authorPage}
                            onChange={event => setAuthorPage(event.target.value)} />
                        <input
                            placeholder="email"
                            value={authorEmail}
                            onChange={event => setAuthorEmail(event.target.value)} />
                        <input
                            placeholder="interests"
                            value={authorInterests}
                            onChange={event => setAuthorInterests(event.target.value)} />
                        <input
                            placeholder="url_picture"
                            value={authorUrlPicture}
                            onChange={event => setAuthorUrlPicture(event.target.value)} />
                    </div>
                </div>
            </div>

            <div className="loading-icon-wrapper">
                {loading && <p>Loading...</p>}
            </div>
            <div className="graphContainer">
                <div id="graph"></div>
            </div>
        </>
    );
}

export default Graph;