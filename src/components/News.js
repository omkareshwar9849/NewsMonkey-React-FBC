import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }

    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ecca287281b2436098abe88e702d8057&pageSize=18";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults});
    }

    handlePrevClick = async () =>{
        console.log("prev \n page no:",this.state.page-1);
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ecca287281b2436098abe88e702d8057&page=${this.state.page-1}&pageSize=18`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page-1,
            articles :parsedData.articles
        })
    }

    handleNextClick = async ()=>{
        console.log("next \n page no:",this.state.page+1);
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ecca287281b2436098abe88e702d8057&page=${this.state.page+1}&pageSize=18`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page+1,
            articles :parsedData.articles
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='mb-3'>News Monkey - Top Headlines</h1>
                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title = {element.title} description = {element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://www.livemint.com/lm-img/img/2023/04/22/600x338/mahindra-lead-LM_1566278220648_1682143867974.jpg"} newsUrl={element.url}/>
                    </div>
                
                })}
                </div>
                <div className="container d-flex justify-content-around">
                {/* justify-content-between put this in class to display buttons at end of container  */}
                    <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults/18)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News