import React, { Component } from "react";
import axios from "axios";
import Image from "./Image";
import InfinitScroll from "react-infinite-scroll-component";

export class Images extends Component {
  state = {
    images: [],
    count: 30,
    start: 1
  };
  componentDidMount() {
    const { count, start } = this.state;
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then((res) => this.setState({ images: res.data }));
  }

  fetchImages = () => {
    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then((res) =>
        this.setState({ images: this.state.images.concat(res.data) })
      );
  };
  render() {
    console.log(this.state);
    return (
      <div className="images">
        <InfinitScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading ... </h4>}
        >
          {this.state.images.map((image) => (
            <Image key={image.id + Math.random()} image={image} />
          ))}
        </InfinitScroll>
      </div>
    );
  }
}

export default Images;
