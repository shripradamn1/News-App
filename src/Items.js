import React, { Component } from "react";

export class Items extends Component {
  render() {
    let { title, imageUrl, description, newsUrl } = this.props;
    return (
      <>
        <div className="card" style={{ width: "20rem" }}>
          <img className="card-img-top" src={imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title"> {title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Items;
