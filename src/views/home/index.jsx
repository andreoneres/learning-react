import "./styles.css"

import { Component } from "react";
import { Posts } from "../../components/posts"
import { loadPosts } from "../../components/utils"
import { Button } from "../../components/button"
import { TextInput } from "../../components/textInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: ''
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


  handleChange = (e) => {
    const { value } = e.target
    this.setState( { searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePages = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) 
    : 
    posts

    return (
      <section className="container">
       
        <div className="search-container">
          { !!searchValue && (
            <>
              <h2>Search value: {searchValue}</h2><br/>
            </>
          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        { filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        { filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}

          <>
            <div className="button-container">
            { !searchValue && (
              <Button
                text="Load more images..." 
                onClick={this.loadMorePosts} 
                disabled={noMorePages}
              />
            )}
            </div>
          </>
      </section>
    );
  }
}
