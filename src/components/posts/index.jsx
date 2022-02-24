import "./styles.css"

import P from "prop-types";

import { PostCard } from "./postCard";

export const Posts = ({ posts = [] }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          cover={post.cover}
          body={post.body}
        />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: P.array
}
