import React from 'react';
import './styles_home.scss';
import heart_filled from "../../resources/love-and-romance_filled.svg";
import heart_empty from "../../resources/love-and-romance_empty.svg";

import { withRouter, Link } from 'react-router-dom';
import Search from '../Search/index_search.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalAuthors: [],
            originalArticles: [],
            originalAffils: [],
            authors: [],
            articles: [],
            affils: [],
            user: this.props.location.state.user,
            searchInput: ""
        }
        this.getAuthors = this.getAuthors.bind(this);
        this.getAffils = this.getAffils.bind(this);
        this.getArticles = this.getArticles.bind(this);

        this.renderAuthor = this.renderAuthor.bind(this);
        this.renderAffil = this.renderAffil.bind(this);
        this.renderArticle = this.renderArticle.bind(this);

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        this.getAuthors();
        this.getArticles();
        this.getAffils();
    }

    async getAuthors() {
        try {
            let response = await (await fetch('http://localhost:3030/authors/')).json();
            for (var i = 0; i < response.data.length; i++) {
                this.fetchFollowedBy(response.data[i]);
            }
            this.setState({ authors: this.state.originalAuthors });
        } catch (e) {
            console.error(e);
        }
    }
    
    async getAffils() {
        try {
            let response = await (await fetch('http://localhost:3030/affiliations/')).json();
            for (var i = 0; i < response.data.length; i++) {
                this.fetchAffiliatedWith(response.data[i]);
            }
            this.setState({ affils: this.state.originalAffils });
        } catch (e) {
            console.error(e);
        }
    }

    async getArticles() {
        try {
            let response = await (await fetch('http://localhost:3030/articles/')).json();
            for (var i = 0; i < response.data.length; i++) {
                this.fetchLikedBy(response.data[i]);
            }
            this.setState({ articles: this.state.originalArticles });
        } catch (e) {
            console.error(e);
        }
    }

    fetchFollowedBy(author) {
        const { user } = this.state;
        try {
            fetch(`http://localhost:3030/followedBy?userId=${user.id}&authorId=${author.id}`)
                .then(response => response.json())
                .then(response => {
                    let newOrigAuthors = this.state.originalAuthors;
                    if (response.data.length > 0) {
                        newOrigAuthors.push({
                            ...author,
                            like: heart_filled
                        });
                    } else {
                        newOrigAuthors.push({
                            ...author,
                            like: heart_empty
                        });
                    }
                    this.setState({
                        originalAuthors: newOrigAuthors
                    });
                });
        } catch (e) {
            console.error(e);
        }
    }

    fetchAffiliatedWith(affil) {
        const { user } = this.state;
        try {
            fetch(`http://localhost:3030/userAffiliatedWith?userId=${user.id}&affilId=${affil.id}`)
                .then(response => response.json())
                .then(response => {
                    let newOrigAffils = this.state.originalAffils;
                    if (response.data.length > 0) {
                        console.log(response.data);
                        newOrigAffils.push({
                            ...affil,
                            like: heart_filled
                        });
                    } else {
                        newOrigAffils.push({
                            ...affil,
                            like: heart_empty
                        });
                    }
                    this.setState({
                        originalAffils: newOrigAffils
                    });
                });
        } catch (e) {
            console.error(e);
        }
    }

    fetchLikedBy(article) {
        const { user } = this.state;
        try {
            fetch(`http://localhost:3030/likedBy?userId=${user.id}&articleId=${article.id}`)
                .then(response => response.json())
                .then(response => {
                    let newOrigArticles = this.state.originalArticles;
                    if (response.data.length > 0) {
                        newOrigArticles.push({
                            ...article,
                            like: heart_filled
                        });
                    } else {
                        newOrigArticles.push({
                            ...article,
                            like: heart_empty
                        });
                    }
                    this.setState({
                        originalArticles: newOrigArticles
                    });
                });
        } catch (e) {
            console.error(e);
        }
    }

    /*-------------------RENDER FUCNTIONS---------------------*/
    renderAuthor = ({ id, name, affiliation, email, interests, url_picture, like }) =>
        <div key={id}>
            <div className="author_item">
                <div className="like">
                    <img src={like} alt="liked" width="24" height="24" onClick={() => this.handleLikeAuthor(id)} />
                </div>
                <div className="author_id">
                    {id}
                </div>
                <div>
                    <img className="author_image"
                        src={url_picture}
                        alt={"image of " + name} />
                </div>
                <div className="author_info">
                    <div className="author_name">
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

    renderAffil = ({ id, name, popular_topics, like }) =>
        <div key={id}>
            <div className="affil_item">
                <div className="like">
                    <img src={like} alt="liked" width="24" height="24" onClick={() => this.handleLikeAffil(id)} />
                </div>
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

    renderArticle = ({ id, pub_title, pub_year, pub_publisher, like}) =>
        <div key={id}>
            <div className="article_item">
                <div className="like">
                    <img src={like} alt="liked" width="24" height="24" onClick={() => this.handleLikeArticle(id)} />
                </div>
                <div className="article_id">
                    {id}
                </div>
                <div className="article_info">
                    <div className="article_pub_title">
                        {pub_title}
                    </div>
                    <div className="article_pub_publisher">
                        {pub_publisher}
                    </div>
                    <div className="article_pub_publisher">
                        {pub_publisher}
                    </div>
                    <div className="article_pub_year">
                        {pub_year}
                    </div>
                </div>
            </div>
        </div>

    /*------------------LIKE FUNCTIONS----------------*/
    handleLikeAuthor(id) {
        console.log(id);
    }

    handleLikeAffil(id) {
        console.log(id);
    }

    handleLikeArticle(id) {
        console.log(id);
    }

    /*------------------SEARCH FUNCTIONS----------------*/
    sortId(value, filteredAffil, filteredAuthors, filteredArticles) {
        var sortedAffil = filteredAffil;
        sortedAffil = filteredAffil.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        var sortedAuthors = filteredAuthors;
        sortedAuthors = filteredAuthors.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        var sortedArticles = filteredArticles;
        sortedArticles = filteredArticles.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        this.setState({
            authors: sortedAuthors,
            articles: sortedArticles,
            affils: sortedAffil
        });
    }

    updateChange(value) {
        const filteredAffil = this.state.originalAffils.filter(affil => (
            affil.name.toLowerCase().includes(value.toLowerCase())
        ));
        const filteredAuthors = this.state.originalAuthors.filter(author => (
            author.name.toLowerCase().includes(value.toLowerCase())
        ));
        const filteredArticles = this.state.originalArticles.filter(article => (
            article.name.toLowerCase().includes(value.toLowerCase())
        ));
        this.sortId(value, filteredAffil, filteredAuthors, filteredArticles);
    }

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ searchInput: value });
        this.updateChange(value);
    }

    render() {
        const { authors, articles, affils } = this.state;
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
                </div>

                <div className="Search">
                    <Search onChange={e => { this.handleSearchChange(e) }} />
                </div>
                
                <div className="home_collection">
                    <div className="home_authors">
                        <div className="label"> Authors: </div>
                        <div className="list-authors"> {authors.map(this.renderAuthor)} </div>
                    </div>
                    <div className="home_articles">
                        <div className="label"> Articles: </div>
                        <div className="list-articles"> {articles.map(this.renderArticle)} </div>
                    </div>
                    <div className="home_affil">
                        <div className="label">
                            Affiliations:
                            </div>
                        <div className="list-affils"> {affils.map(this.renderAffil)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
