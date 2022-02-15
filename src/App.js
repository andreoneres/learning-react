import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [],
    count: 1,
  };

  timeoutUpdate = null;

  componentDidMount() {
    this.loadPosts();
    // this.handleTimeout();
  }

  loadPosts = async() => {

    const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = await fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url}
    })

    this.setState( { posts: postsAndPhotos} );
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
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <img src={post.cover} alt="post-image"></img>
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
          <h1>{count}</h1>
          <button>Somar</button>
        </div>
      </section>
    );
  }
}

export default App;
