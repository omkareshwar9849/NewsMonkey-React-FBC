import React from 'react'

const NewsItem=(props)=>{
        let {title, description, imageUrl, newsUrl, author, date, source} =props
        return (
           <div  className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}
                            <span className="position-absolute top-0  badge rounded-pill bg-danger" style={{right:"0%" , zIndex:'1'}}>{source}</span>
                        </h5>
                        {/* <span className="badge bg-secondary rounded-pill">New</span> */}
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <p className="card-text">{description}....</p>
                        <div className="d-flex justify-content-center">
                        <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-dark">Read More</a> {/*btn-sm put in button class for small button*/}
                        </div>
                    </div>
                </div>
           </div>
        )
    
}

export default NewsItem