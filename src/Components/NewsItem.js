import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,Description,imgurl,newsUrl,author,date}=this.props;
    return (
      <div className='my-3'>
        <div class="card" style={{width:'18rem'}}>
            <img src={this.props.imgurl} class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{this.props.title }...</h5>
                <p class="card-text">{this.props.Description}...</p>
                <a href={this.props.newsUrl} target='_blank' class="btn btn-dark">Read More</a>
                <p class="card-text"><small class="text-muted">By {this.props.author} on {new Date(this.props.date).toGMTString()}</small></p>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
