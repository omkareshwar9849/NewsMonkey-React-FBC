import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import logo from "./logo4.png";



export class News extends Component {

    static defaultProps={
        country : 'in',
        pageSize : 12,
        category: 'general'
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category: PropTypes.string

    }

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
 
    }
    async componentDidMount(){
        this.setState({loading:true});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecca287281b2436098abe88e702d8057&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles, 
            totalResults:parsedData.totalResults,
            loading : false
        });
    }

    handlePrevClick = async () =>{
        this.setState({loading:true});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecca287281b2436098abe88e702d8057&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page-1,
            articles :parsedData.articles,
            loading : false
        })
    }

    handleNextClick = async ()=>{
        this.setState({loading:true});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecca287281b2436098abe88e702d8057&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page+1,
            articles :parsedData.articles,
            loading : false
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <div className="container d-flex justify-content-center">
                    <img src={logo} style={{height:'100px'}} alt="" />
                    <h1 className='text-center' style={{margin:'40px 0px'}}>News Monkey - Top Headlines</h1>
                </div>
                {this.state.loading && <Spinner/>}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title = {element.title} description = {element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://www.livemint.com/lm-img/img/2023/04/22/600x338/mahindra-lead-LM_1566278220648_1682143867974.jpg"} newsUrl={element.url}/>
                    </div>
                
                })}
                </div>
                <div className="container d-flex justify-content-around">
                {/* justify-content-between put this in class to display buttons at end of container  */}
                    <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News