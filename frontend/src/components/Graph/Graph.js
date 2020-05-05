import React, { useState } from 'react';
import * as NeoVis from 'neovis.js';
import './graph.css';
import { Button } from '@material-ui/core';

function Graph() {

  const MAX_NODES = 100;
  const [loading, setLoading] = useState(false);

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
        }
      },
      relationships: {
        "AUTHORED_BY": {
          "thickness": "weight",
          "caption": true,
          "arrows": true
        }
      },
      initial_cypher: `match p = (a:Author)<-[:AUTHOR_AFFILIATED_WITH]-(af:Affiliation) return distinct p limit ${MAX_NODES}`
    };

    const graphContainer = new NeoVis.default(config);

    graphContainer.registerOnEvent(
        'completed', () => {setLoading(false);});

    graphContainer.render();
  };

  return (
    <>
      <aside className="loadButton">
        <Button variant="primary" onClick={loadGraph}>Load graph</Button>
      </aside>
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