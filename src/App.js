import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        title: "O titulo 1",
        body: "O corpo 1",
      },
      {
        id: 2,
        title: "O titulo 2",
        body: "O corpo 2",
      },
      {
        id: 3,
        title: "O titulo 3",
        body: "O corpo 3",
      },
    ],
    count: 1,
  };

  timeoutUpdate = null;

  componentDidMount() {
    this.handleTimeout();
  }

  componentDidUpdate() {
    this.handleTimeout();
  }

  handleTimeout = () => { 
    const { posts, count } = this.state;
 
    posts[0].title = 'O título mudou';

    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, count: count + 1 });
    }, 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }

  render() {
    const { posts, count } = this.state;

    return (
      <div className="App">
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
        <h1>{count}</h1>
        <button>Somar</button>
      </div>
    );
  }
}

export default App;
