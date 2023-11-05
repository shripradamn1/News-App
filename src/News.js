import React, { Component } from "react";
import Items from "./Items";
import protoTypes from 'prop-types'


export class News extends Component {
    static defalutProps={
        country:'in',
        category:'general'

    }
    static propTypes={
        country:protoTypes.string,
        category:protoTypes.string
    }
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1, pageSize: 1 };
  }
  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a25099497b4d39931d160ea35cb6cd&page=${this.state.page}`;
    const data = await fetch(url);
    const res = await data.json();
    this.setState({ articles: res.articles, loading: true });
  }

  next = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a25099497b4d39931d160ea35cb6cd&page=${nextPage}`;
    const data = await fetch(url);
    const res = await data.json();
    this.setState({ articles: res.articles, loading: true });

    this.setState({ page: nextPage, pageSize: this.state.pageSize + 1 });
  };

  pre = async () => {
    const prevPage = this.state.page - 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a25099497b4d39931d160ea35cb6cd&page=${prevPage}`;
    const data = await fetch(url);
    const res = await data.json();
    this.setState({ articles: res.articles, loading: true });

    if (prevPage >= 1) {
      this.setState({ page: prevPage });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <div className="row">
          {this.state.articles.map((el) => (
            <div className="col-md-4" key={el.url}>
              <Items
                title={el.title ? el.title.slice(0, 40) : "No title available"}
                description={
                  el.description
                    ? el.description.slice(0, 80)
                    : "No description available"
                }
                imageUrl={el.urlToImage}
                newsUrl={el.url}
              />
            </div>
          ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.pre}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button type="button" className="btn btn-dark" onClick={this.next}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
