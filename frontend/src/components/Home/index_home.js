import React from 'react';
import './styles_home.scss';

import { withRouter } from 'react-router-dom';
import Search from '../Search/index_search.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            user: this.props.location.state.user,
            author: {
                name: "",
                affiliation: "",
                citedby: "",
                attributes: "",
                page: 0,
                email: "",
                interests: "",
                url_picture: ""
            },
            toDelete: -1,
            update: {
                id: -1,
                name: "",
                affiliation: "",
                citedby: "",
                attributes: "",
                page: -1,
                email: "",
                interests: "",
                url_picture: ""
            },
            searchInput: ""
        }
        this.getAuthors = this.getAuthors.bind(this);
        this.addAuthor = this.addAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.renderAuthor = this.renderAuthor.bind(this);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        
    }

    componentDidMount() {
        this.getAuthors();
    }

    getAuthors = _ => {
        fetch('http://localhost:3030/authors/')
            .then(response => response.json())
            .then(response => this.setState({ authors: response.data }))
            .catch(err => console.error(err))
    }

    addAuthor = _ => {
        const { author } = this.state;
        fetch(`http://localhost:3030/authors/add?`
            + `name=${author.name}`
            + `&affiliation=${author.affiliation}`
            + `&citedby=${author.citedby}`
            + `&attributes=${author.attributes}`
            + `&page=${author.page}`
            + `&email=${author.email}`
            + `&interests=${author.interests}`
            + `&url_picture=${author.url_picture}`)
            .then(this.getAuthors)
            .catch(err => console.error(err))
    }

    deleteAuthor = _ => {
        const { toDelete } = this.state;
        fetch(`http://localhost:3030/authors/delete?id=${toDelete}`)
            .then(this.getAuthors)
            .catch(err => console.error(err))
    }

    updateAuthor = _ => {
        const { update } = this.state;
        var UPDATE_AUTHOR = `http://localhost:3030/authors/update?id=${update.id}`;
        if (update.name !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&name=${update.name}`;
        }
        if (update.affiliation !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&affiliation=${update.affiliation}`;
        }
        if (update.citedby !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&citedby=${update.citedby}`;
        }
        if (update.attributes !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&attributes=${update.attributes}`;
        }
        if (update.page !== -1) {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&page=${update.page}`;
        }
        if (update.email !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&email=${update.email}`;
        }
        if (update.interests !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&interests=${update.interests}`;
        }
        if (update.url_picture !== "") {
            UPDATE_AUTHOR = UPDATE_AUTHOR + `&url_picture=${update.url_picture}`;
        }
        fetch(UPDATE_AUTHOR)
            .then(this.getAuthors)
            .catch(err => console.error(err))
    }

    renderAuthor = ({ id, name, affiliation, email, interests, url_picture }) =>
        <div key={id}>
            <div className = "author_item">
                <div className="author_id">
                    {id}
                </div>
                <div>
                    <img className = "author_image"
                        src={url_picture}
                        alt={"image of " + name} />
                </div>
                <div className = "author_info">
                    <div className = "author_name">
                        {name}
                    </div>
                    <div className="author_affiliation">
                        {affiliation}
                    </div>
                    <div className="author_email">
                        {email}
                    </div>
                    <div className="author_interests">
                        {interests}
                    </div>
                </div>
            </div>
        </div>

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ searchInput: value });
        //TODO: need to do some form of filtering on this.state.authors
    }

    render() {
        const { authors, author, toDelete, update } = this.state;
        return (
            <div className="App">
                <div className="Search">
                    <Search onChange={this.handleSearchChange} />
                </div>

                <div className = "container">
                    <div className = "edit_authors">
                        <div className="add_author">
                            <button onClick={this.addAuthor}>Add Author</button>
                            <input
                                placeholder="name"
                                value={author.name}
                                onChange={e => this.setState({ author: { ...author, name: e.target.value } })} />
                            <input
                                placeholder="affiliation"
                                value={author.affiliation}
                                onChange={e => this.setState({ author: { ...author, affiliation: e.target.value } })} />
                            <input
                                placeholder="citedby"
                                value={author.citedby}
                                onChange={e => this.setState({ author: { ...author, citedby: e.target.value } })} />
                            <input
                                placeholder="attributes"
                                value={author.attributes}
                                onChange={e => this.setState({ author: { ...author, attributes: e.target.value } })} />
                            <input
                                placeholder="page"
                                type="number"
                                value={author.page}
                                onChange={e => this.setState({ author: { ...author, page: e.target.value } })} />
                            <input
                                placeholder="email"
                                value={author.email}
                                onChange={e => this.setState({ author: { ...author, email: e.target.value } })} />
                            <input
                                placeholder="interests"
                                value={author.interests}
                                onChange={e => this.setState({ author: { ...author, interests: e.target.value } })} />
                            <input
                                placeholder="url_picture"
                                value={author.url_picture}
                                onChange={e => this.setState({ author: { ...author, url_picture: e.target.value } })} />
                        </div>

                        <div className="delete_author">
                            <button onClick={this.deleteAuthor}>Delete Author</button>
                            <input
                                type="number"
                                placeholder="id to Delete"
                                value={toDelete}
                                onChange={e => this.setState({ toDelete: e.target.value })} />
                        </div>

                        <div className="update_author">
                            <button onClick={this.updateAuthor}>Update Author</button>
                            <input
                                type="number"
                                placeholder="id to Update"
                                value={update.id}
                                onChange={e => this.setState({ update: { ...update, id: e.target.value } })} />
                            <input
                                placeholder="name"
                                value={update.name}
                                onChange={e => this.setState({ update: { ...update, name: e.target.value } })} />
                            <input
                                placeholder="affiliation"
                                value={update.affiliation}
                                onChange={e => this.setState({ update: { ...update, affiliation: e.target.value } })} />
                            <input
                                placeholder="citedby"
                                value={update.citedby}
                                onChange={e => this.setState({ update: { ...update, citedby: e.target.value } })} />
                            <input
                                placeholder="attributes"
                                value={update.attributes}
                                onChange={e => this.setState({ update: { ...update, attributes: e.target.value } })} />
                            <input
                                placeholder="page"
                                type="number"
                                value={update.page}
                                onChange={e => this.setState({ update: { ...update, page: e.target.value } })} />
                            <input
                                placeholder="email"
                                value={update.email}
                                onChange={e => this.setState({ update: { ...update, email: e.target.value } })} />
                            <input
                                placeholder="interests"
                                value={update.interests}
                                onChange={e => this.setState({ update: { ...update, interests: e.target.value } })} />
                            <input
                                placeholder="url_picture"
                                value={update.url_picture}
                                onChange={e => this.setState({ update: { ...update, url_picture: e.target.value } })} />
                        </div>
                    </div>

                    <div className="display_results">
                        {authors.map(this.renderAuthor)}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
