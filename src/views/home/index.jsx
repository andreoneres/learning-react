import "./styles.css";

import { Component } from "react";
import { Posts } from "../../components/posts";
import { loadPosts } from "../../components/utils";
import { Button } from "../../components/button";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
  
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  };

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state
    const noMorePages = page + postsPerPage >= allPosts.length

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="button-container">
          <Button
            text="Load more images..." 
            onClick={this.loadMorePosts} 
            disabled={noMorePages}
          />
        </div>
      </section>
    );
  }
}
