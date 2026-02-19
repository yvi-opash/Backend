import Post from "../models/Post";
import Comment from "../models/Comment";

export const createPost = async (data: { title: string; content: string; author: string }) => {
  return await Post.create(data);
};

export const getPostWithComments = async (postId: string) => {
  const post = await Post.findById(postId).populate("author");
  const comments = await Comment.find({ post: postId }).populate("user");
  return { post, comments };
};
