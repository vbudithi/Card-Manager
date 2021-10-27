import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import InfinitScroll from "react-infinite-scroll-component";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      count: 10,
      start: 1,
      msg: ""
    };
  }

  componentDidMount() {
    this.fetchRandomUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users.length !== this.state.users.length) {
      this.setState({
        users: this.state.users
      });
    }
  }
  handleDelete(userID) {
    const updatedList = this.state.users.filter(
      (user) => user.login.uuid !== userID
    );
    this.setState({
      users: updatedList
    });
    if (this.state.users.length === 1) {
      this.setState({
        msg: "No more users, reload the page to get more"
      });
    }
  }

  fetchRandomUsers() {
    const { count, start } = this.state;
    axios
      .get(`https://randomuser.me/api/?results=${count}&start=${start}`)
      .then((response) => {
        this.setState({ users: response.data.results });
        // console.log(response.data.results)
      });
  }

  fetchNextUsers() {
    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .get(`https://randomuser.me/api/?results=${count}&start=${start}`)
      .then((response) => {
        this.setState({
          users: this.state.users.concat(response.data.results)
        });
        console.log(response.data.results);
      });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map((user, index) => {
            return (
              <li key={index}>
                <InfinitScroll
                  dataLength={this.state.users.length}
                  next={() => this.fetchNextUsers}
                  hasMore={true}
                  loader={<h4>Loading ... </h4>}
                >
                  <Card
                    gender={user.gender}
                    name={
                      user.name.first.charAt(0).toUpperCase() +
                      user.name.first.slice(1) +
                      " " +
                      user.name.last.charAt(0).toUpperCase() +
                      user.name.last.slice(1)
                    }
                    picture={user.picture.medium}
                    address={
                      user.location.city.charAt(0).toUpperCase() +
                      user.location.city.slice(1) +
                      ", " +
                      user.location.state.charAt(0).toUpperCase() +
                      user.location.state.slice(1)
                    }
                    email={user.email}
                    id={user.login.uuid}
                    nat={user.nat}
                  />
                </InfinitScroll>
              </li>
            );
          })}
        </ul>
        <p>{this.state.msg}</p>
      </div>
    );
  }
}

export default App;
