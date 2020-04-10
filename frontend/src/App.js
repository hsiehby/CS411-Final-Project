import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            author: {
                name: "",
                affiliation: "",
                citedby: "",
                attributes: "",
                page: 0,
                email: "",
                interests: "",
                url_picture: ""
            }
        }
        this.getAuthors = this.getAuthors.bind(this);
        this.addAuthor = this.addAuthor.bind(this);
        this.renderAuthor = this.renderAuthor.bind(this);
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

    renderAuthor = ({ id, name }) => <div key={id}>{id} {name}</div>

    render() {
        const { authors, author } = this.state;
        return (
            <div className="App">
                {authors.map(this.renderAuthor)}

                <div>
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

                    <button onClick={this.addAuthor}>Add Author</button>
                </div>
            </div>
        );
    }
}

export default App;
