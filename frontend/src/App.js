import React from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import Header from './components/Header/index_header.js';
import Home from './components/Home/index_home.js';
import Graph from './components/Graph/Graph.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router className="routing-pane">
                <div className="App">
                    <Header />

                    <Link to="/">
                        <button>
                            <span>Home</span>
                        </button>
                    </Link>
                    <Link to="/profile">
                        <button>
                            <span>Profile</span>
                        </button>
                    </Link>
                    <Link to="/graph">
                        <button>
                            <span>Graph</span>
                        </button>
                    </Link>

                    <Switch>
                        <Route exact path="/">
                            <div>
                                <Home />
                            </div>
                        </Route>
                        <Route path="/profile">
                            <div>
                                <span>TO DO</span>
                            </div>
                        </Route>
                        <Route path="/graph">
                            <div>
                                <Graph />
                            </div>
                        </Route>
                    </Switch>
                    
                </div>
            </Router>
        );
    }
}

export default App;
