import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import logo from "./logo4.png";
import InfiniteScroll from "react-infinite-scroll-component";





const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)}-News Monkey`;

    const updateNews = async () => {
        props.setProgress(10);
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    // const handlePrevClick = async () => {
    // setPage(page-1)
    //     updateNews()
    // }

    //const handleNextClick = async () => {
    // setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        setPage(page + 1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }


    return (
        <>
            <div className="container d-flex justify-content-center">
                <img src={logo} style={{ height: '100px' }} alt="" />
                <h1 className='text-center' style={{ margin: '40px 0px' }}>News Monkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
            </div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} author={element.author} date={element.publishedAt} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.livemint.com/lm-img/img/2023/04/22/600x338/mahindra-lead-LM_1566278220648_1682143867974.jpg"} newsUrl={element.url} source={element.source.name}
                                />
                            </div>

                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-around">
                    <button disabled={page <= 1} className='btn btn-dark' onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page >= Math.ceil(totalResults / pageSize)} className='btn btn-dark' onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )


    News.defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general'
    }

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
}

export default News