import React from 'react';
import './styles_search_r.scss';

import { withRouter, Link } from 'react-router-dom';
import Search from '../Search/index_search.js';

class SearchRatio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalResults: [],
            results: [],
            user: this.props.location.state.user,
            searchInput: ""
        }
        this.getResults = this.getResults.bind(this);
        this.renderResults = this.renderResults.bind(this);

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        this.getResults();
    }

    async getResults() {
        try {
            let response = await (await fetch('http://localhost:3030/authorRatio/')).json();
            this.setState({ originalResults: response.data[1], results: response.data[1] });
        } catch (e) {
            console.error(e);
        }
    }

    /*-------------------RENDER FUCNTIONS---------------------*/
    renderResults = ({ name, total_citations, ratio_recent_citations }) =>
        <div key={(name, ratio_recent_citations)}>
            <div className="results_item">
                <div className="results_info">
                    <div className="results_name">
                        {name}
                    </div>
                    <div className="results_total">
                        Total Citations: {total_citations}
                    </div>
                    <div className="results_ratio">
                        Ratio of Recent Citations: {ratio_recent_citations}
                    </div>
                </div>
            </div>
        </div>

    /*------------------SEARCH FUNCTIONS----------------*/
    updateChange(value) {
        const filteredResults = this.state.originalResults.filter(result => (
            result.name.toLowerCase().includes(value.toLowerCase())
        ));
        this.setState({
            results: []
        }, () => {
            this.setState({
                results: filteredResults
            });
        }
        );
    }

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ searchInput: value });
        this.updateChange(value);
    }

    render() {
        const { results } = this.state;
        return (
            <div className="container">
                <div className="navigation_buttons">
                    <Link to={{
                        pathname: '/home',
                        state: this.state
                    }}>
                        <button>
                            <span>Home</span>
                        </button>
                    </Link>
                    <Link to={{
                        pathname: '/profile',
                        state: { user: this.state.user }
                    }}>
                        <button>
                            <span>Profile</span>
                        </button>
                    </Link>
                    <Link to={{
                        pathname: '/searchTopCited',
                        state: { user: this.state.user }
                    }}>
                        <button>
                            <span>Search: Match Interests</span>
                        </button>
                    </Link>
                    <Link to={{
                        pathname: '/searchRatio',
                        state: { user: this.state.user }
                    }}>
                        <button>
                            <span>Search: Author Ratios </span>
                        </button>
                    </Link>
                    <Link to="/graph">
                        <button>
                            <span>Graph</span>
                        </button>
                    </Link>
                </div>

                <div className="Search">
                    <Search onChange={e => { this.handleSearchChange(e) }} />
                </div>

                <div className="search_collection">
                    <div className="list-results"> {results.map(this.renderResults)}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchRatio);
