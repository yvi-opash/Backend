import User from "../models/User";
import Post from "../models/Post";

export const createUser = async (data: { name: string; email: string }) => {
  return await User.create(data);
};

export const getUserPosts = async (userId: string) => {
  return await Post.find({ author: userId }).populate("author");
};
