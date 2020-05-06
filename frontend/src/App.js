import React from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

import Header from './components/Header/index_header.js';
import Home from './components/Home/index_home.js';
import Graph from './components/Graph/Graph.js';
import Profile from './components/Profile/index_profile.js';
import Login from './components/LogIn/index_login.js';
import Signup from './components/LogIn/index_signup.js';
import AddAffil from './components/AddAffil/index_addaffil.js';
import SearchTopCited from './components/SearchTopCited/index_search_tc.js';
import SearchRatio from './components/SearchRatio/index_search_r.js';

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

                    <Link to="/graph">
                        <button>
                            <span>Graph</span>
                        </button>
                    </Link>

                    <Switch>
                        <Route exact path="/">
                            <div>
                                <Login />
                            </div>
                        </Route>
                        <Route path="/signup">
                            <div>
                                <Signup />
                            </div>
                        </Route>
                        <Route path="/home">
                            <div>
                                <Home />
                            </div>
                        </Route>
                        <Route path="/profile">
                            <div>
                                <Profile />
                            </div>
                        </Route>
                        <Route path="/editAffiliation">
                            <div>
                                <AddAffil />
                            </div>
                        </Route>
                        <Route path="/graph">
                            <div>
                                <Graph />
                            </div>
                        </Route>                   
                        <Route path="/searchTopCited">
                            <div>
                                <SearchTopCited />
                            </div>
                        </Route>
                        <Route path="/searchRatio">
                            <div>
                                <SearchRatio />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
