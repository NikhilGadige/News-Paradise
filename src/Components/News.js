import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `NewsParadise - ${this.props.category}`;
  }

  async updateNews() {
    // Use the `setProgress` prop passed from `App`
    this.props.setProgress(10);
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f8f7e6e1a2fa46f0bab43d6cb1595236&page=${this.state.page}&pageSize=6`;
    let data = await fetch(url);
    this.props.setProgress(50); // Update progress
    let parsedData = await data.json();
    this.props.setProgress(70); // Update progress

    this.setState({
      articles: parsedData.articles,
      loading: false,
    });

    this.props.setProgress(100); // Complete progress
  }

  async componentDidMount() {
    this.updateNews(); // Fetch news on mount
  }

  handleNext = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.updateNews() // Fetch news after updating the page
    );
  };

  handlePrev = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => this.updateNews() // Fetch news after updating the page
    );
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:'90px'}}>
          NewsParadise - Top Headlines from {this.props.category} category
        </h1>
        {this.state.loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  author={element.author || 'Unknown'}
                  date={element.publishedAt}
                  Description={
                    element.description
                      ? element.description.slice(0, 80)
                      : ''
                  }
                  imgurl={
                    element.urlToImage ||
                    'https://tse1.mm.bing.net/th?id=OIP.VWChxFEpEc14eZmHhy9yowHaFj&pid=Api&P=0&h=180'
                  }
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

News.defaultProps = {
  category: 'science',
};

News.propTypes = {
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired, // Ensure `setProgress` is a required prop
};
export default News;
