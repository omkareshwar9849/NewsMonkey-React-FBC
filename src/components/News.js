import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import logo from "./logo4.png";
import InfiniteScroll from "react-infinite-scroll-component";





export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults : 0
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}-News Monkey`;
    }
    async updateNews() {
        this.props.setProgress(10);
        this.setState({ loading: true });
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecca287281b2436098abe88e702d8057&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({page : this.state.page + 1})
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews()
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews()
    // }

    fetchMoreData = async () => {
        this.setState({page : this.state.page + 1})
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecca287281b2436098abe88e702d8057&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
      };

    render() {
        return (
            <>
                <div className="container d-flex justify-content-center">
                    <img src={logo} style={{ height: '100px' }} alt="" />
                    <h1 className='text-center' style={{ margin: '40px 0px' }}>News Monkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
                </div>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                <div className="container">
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} author={element.author} date={element.publishedAt} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.livemint.com/lm-img/img/2023/04/22/600x338/mahindra-lead-LM_1566278220648_1682143867974.jpg"} newsUrl={element.url} source={element.source.name}
                            />
                        </div>

                    })}
                </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-around">
                    <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News