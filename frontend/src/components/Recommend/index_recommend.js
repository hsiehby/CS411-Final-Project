import React from 'react';
import './styles_recommend.scss';
import { withRouter, Link } from 'react-router-dom';

class Recommend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            recommended_articles: []
        }
        this.getRecommendedArticles = this.getRecommendedArticles.bind(this);
        this.fetchRecommendedArticles = this.fetchRecommendedArticles.bind(this);
    }

    componentDidMount() {
        this.getRecommendedArticles();
    }

    getRecommendedArticles = _ => {
        const userId = this.state.user.id;
        this.setState({ articles: [] });
        fetch(`http://localhost:3030/recommend/articles?userId='${userId}'`)
            .then(response => response.json())
            .then(response => { (response.data).map(this.fetchRecommendedArticles) })
            .catch(err => console.error(err))
    }

    fetchRecommendedArticles = ({ articleId }) => {
        fetch(`http://localhost:3030/articles/${articleId}`)
            .then(response => response.json())
            .then(response => {
                this.setState({ recommended_articles: [...this.state.recommended_articles, response.data[0]] });
            })
            .catch(err => console.error(err))
    }

    renderArticle = ({ id, votes, pub_title, pub_year, pub_publisher, pub_url }) =>
        <div key={id}>
            <div className="article_item">
                <div className="match_level">
                    {votes}
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

    render() {
        const {user, recommended_articles} = this.state;
        return (
            <div className="container">
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
                    <Link to={{
                        pathname: '/recommendations',
                        state: { user: this.state.user }
                    }}>
                        <button>
                            <span>Recommend</span>
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
                <div className="recommended_articles">
                <h1> We think these {recommended_articles.length} articles might interest you</h1>
                    <div className="number_recommended_articles"> {} </div> 
                    <div className="list-recommended_articles"> {recommended_articles.map(this.renderArticle)} </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Recommend);