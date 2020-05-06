import React from 'react';
import './styles_profile.scss';
import heart_filled from "../../resources/love-and-romance_filled.svg";

import { withRouter, Link } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            updated_interests: "",
            authors: [],
            affils: [],
            articles: []
        };

        this.getAuthors = this.getAuthors.bind(this);
        this.getAffils = this.getAffils.bind(this);
        this.getArticles = this.getArticles.bind(this);

        this.fetchAuthors = this.fetchAuthors.bind(this);
        this.fetchAffils = this.fetchAffils.bind(this);
        this.fetchArticles = this.fetchArticles.bind(this);

        this.renderAuthor = this.renderAuthor.bind(this);
        this.renderAffil = this.renderAffil.bind(this);
        this.renderArticle = this.renderArticle.bind(this);

        this.handleEditInterests = this.handleEditInterests.bind(this);

        this.handleLikeAuthor = this.handleLikeAuthor.bind(this);
    }

    componentDidMount() {
        this.getAuthors();
        this.getAffils();
        this.getArticles();
    }

    /*--------------FETCHING FUNCTIONS-----------------*/
    getAuthors = _ => {
        const { user } = this.state;
        fetch(`http://localhost:3030/followedBy?userId='${user.id}'`)
            .then(response => response.json())
            .then(response => { (response.data).map(this.fetchAuthors) })
            .catch(err => console.error(err))
    }

    fetchAuthors = ({ authorId }) => {
        fetch(`http://localhost:3030/authors/${authorId}`)
            .then(response => response.json())
            .then(response => {
                this.setState({ authors: [...this.state.authors, response.data[0]] });
            })
            .catch(err => console.error(err))
    }

    getAffils = _ => {
        const { user } = this.state;
        fetch(`http://localhost:3030/userAffiliatedWith?userId='${user.id}'`)
            .then(response => response.json())
            .then(response => { (response.data).map(this.fetchAffils) })
            .catch(err => console.error(err))
    }

    fetchAffils = ({ affilId }) => {
        fetch(`http://localhost:3030/affiliations/${affilId}`)
            .then(response => response.json())
            .then(response => {
                this.setState({ affils: [...this.state.affils, response.data[0]] });
            })
            .catch(err => console.error(err))
    }

    getArticles = _ => {
        const { user } = this.state;
        fetch(`http://localhost:3030/likedBy?userId='${user.id}'`)
            .then(response => response.json())
            .then(response => { (response.data).map(this.fetchArticles) })
            .catch(err => console.error(err))
    }

    fetchArticles = ({ articleId }) => {
        fetch(`http://localhost:3030/articles/${articleId}`)
            .then(response => response.json())
            .then(response => {
                this.setState({ articles: [...this.state.articles, response.data[0]] });
            })
            .catch(err => console.error(err))
    }

    /*-------------------- HANDLE LIKE EDITS -------------------*/
    handleLikeAuthor(id) {
        const { user } = this.state;
        fetch(`http://localhost:3030/followedBy/delete?userId=${user.id}&authorId=${id}`)
            .then(this.setState({ authors: [] }))
            .then(this.getAuthors())
            .catch(err => console.error(err));
    }

    handleLikeArticle(id) {
        const { user } = this.state;
        fetch(`http://localhost:3030/likedBy/delete?userId=${user.id}&articleId=${id}`)
            .then(this.setState({ articles: [] }))
            .then(this.getArticles())
            .catch(err => console.error(err));
    }

    handleLikeAffil(id) {
        const { user } = this.state;
        console.log(id);
        fetch(`http://localhost:3030/userAffiliatedWith/delete?userId=${user.id}&affilId=${id}`)
            .then(this.setState({ affils: [] }))
            .then(this.getAffils())
            .catch(err => console.error(err));
    }

    /*--------------RENDER FUNCTIONS-----------------*/
    renderAuthor = ({ id, name, affiliation, email, interests, url_picture }) =>
        <div key={id}>
            <div className="author_item">
                <div className="like">
                    <img src={heart_filled} alt="liked" width="24" height="24" onClick={() => this.handleLikeAuthor(id)} />
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

    renderAffil = ({ id, name, popular_topics }) =>
        <div key={id}>
            <div className="affil_item">
                <div className="like">
                    <img src={heart_filled} alt="liked" width="24" height="24" onClick={() => this.handleLikeAffil(id)} />
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

    renderArticle = ({ id, pub_title, pub_year, pub_publisher, pub_url }) =>
        <div key={id}>
            <div className="article_item">
                <div className="like">
                    <img src={heart_filled} alt="liked" width="24" height="24" onClick={() => this.handleLikeArticle(id)} />
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

    /*----------------- USER INTERESTS UPDATE ---------------------*/
    handleEditInterests = _ => {
        const { user, updated_interests } = this.state;
        fetch(`http://localhost:3030/users/update?id=${user.id}&interests='${updated_interests}'`)
            .then(response => response.json())
            .then(this.setState({ user: { ...user, interests: updated_interests } }))
            .catch(err => console.error(err));
    } 

    render() {
        const { user, authors, articles, affils } = this.state;
        return (
            <div className="profile">
                <div className="navigation_buttons">
                    <Link to={{
                        pathname: '/home',
                        state: { user: this.state.user }
                    }}>
                        <button>
                            <span>Home</span>
                        </button>
                    </Link>
                    <Link to={{
                        pathname: '/profile',
                        state: this.state
                    }}>
                        <button>
                            <span>Profile</span>
                        </button>
                    </Link>
                </div>

                <div className="user_all_info">
                    <div className="user_info">
                        <div className="user_name">
                            <span>Hello, {user.name}</span>
                        </div>
                        <div className="user_extra">
                            <div className="user_email">{user.email}</div>
                            <div className="user_interests">Your interests: {user.interests}</div>
                        </div>
                    </div>
                    <div className="user_edit">
                        <input
                            placeholder="interests"
                            value={this.state.updated_interests}
                            onChange={e => this.setState({ updated_interests: e.target.value } )} />
                        <button onClick={this.handleEditInterests}> Edit Interests </button>
                    </div>
                </div>

                <div className="user_collection">
                    <div className="user_authors">
                        <div className="label"> Authors you follow: </div>
                        <div className="list-authors"> {authors.map(this.renderAuthor)} </div>
                    </div>
                    <div className="user_articles">
                        <div className="label"> Articles you've liked: </div>
                        <div className="list-articles"> {articles.map(this.renderArticle)} </div>
                    </div>
                    <div className="user_affil">
                        <div className="label">
                            Affiliations you're a part of:
                            <Link to={{
                                pathname: '/addAffiliation',
                                state: { user: user }
                            }}>
                                <button>
                                    <span>Add Affiliation</span>
                                </button>
                            </Link> 
                        </div>
                        <div className="list-affils"> {affils.map(this.renderAffil)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
