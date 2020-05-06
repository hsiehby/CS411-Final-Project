import React from 'react';
import './styles_addaffil.scss';

import { withRouter } from 'react-router-dom';
import Search from '../Search/index_search.js';

class AddAffil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            affils: [],
            affiliation: {
                id: -1,
                name: "",
                popular_topics: ""
            },
            searchInput: ""
        }
    }

    componentDidMount() {
        this.getAffiliations();
    }

    getAffiliations = _ => {
        fetch('http://localhost:3030/affiliations/')
            .then(response => response.json())
            .then(response => this.setState({ affils: response.data }))
            .catch(err => console.error(err))
    }

    async addAffil() {
        const { user, affiliation } = this.state;
        let response = await fetch(`http://localhost:3030/affiliations/add?`
            + `name=${affiliation.name}`
            + `&popular_topics=${affiliation.popular_topics}`);
        response = await response.json();
        let response0 = await fetch(`http://localhost:3030/userAffiliatedWith/add?`
            + `userId=${user.id}`
            + `&affilId=${response.data.id}`);
        if (!response0.error) {
            this.props.history.push({
                pathname: '/profile',
                state: { user: user }
            });
        } else {
            console.log(response0.error);
        }
    }

    async createRelationship(id) {
        const { user } = this.state;
        let response = await fetch(`http://localhost:3030/userAffiliatedWith/add?`
            + `userId=${user.id}`
            + `&affilId=${id}`);
        if (!response.error) {
            this.props.history.push({
                pathname: '/profile',
                state: { user: user }
            });
        } else {
            alert("failed to add affiliation");
        }
    }

    renderAffil = ({ id, name, popular_topics }) =>
        <div key={id}>
            <div className="affil_item" onClick={() => { this.createRelationship(id) }}>
                <div className="affil_id">
                    {id}
                </div>
                <div className="affil_info">
                    <div className="affil_name">
                        {name}
                    </div>
                    <div className="affil_popular_topics">
                        {popular_topics}
                    </div>
                </div>
            </div>
        </div>

    /*FILTERING FUNCTIONS*/
    sortId(value, filtered) {
        var sorted = filtered;
        if (this.state.ascending) {
            sorted = filtered.sort((a, b) => {
                return a.id - b.id;
            });
        } else {
            sorted = filtered.sort((a, b) => {
                return b.id - a.id;
            });
        }

        this.setState({
            affils: sorted
        });
    }

    updateChange(value) {
        const filtered = this.state.affils.filter(affil => (
            affil.name.toLowerCase().includes(value.toLowerCase())
        ));
        this.sortId(value, filtered);
    }

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ searchInput: value }, () => { console.log(this.state.searchInput) });
        this.updateChange(value);
    }

    render() {
        const { affils, affiliation } = this.state;
        return (
            <div className="App">
                <div className="makeAffil">
                    <div className="add_affiliation">
                        <button onClick={() => { this.addAffil() }}>Add Affiliation</button>
                        <input
                            placeholder="name"
                            value={affiliation.name}
                            onChange={e => this.setState({ affiliation: { ...affiliation, name: e.target.value } })} />
                        <input
                            placeholder="popular topics"
                            value={affiliation.popular_topics}
                            onChange={e => this.setState({ affiliation: { ...affiliation, popular_topics: e.target.value } })} />
                    </div>

                    <div className="searchAffil">
                        <div className="Search">
                            <Search onChange={e => { this.handleSearchChange(e) }} />
                        </div>
                        <div className="display_results">
                            {affils.map(this.renderAffil)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddAffil);
