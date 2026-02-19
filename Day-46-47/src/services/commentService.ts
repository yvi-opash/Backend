import Comment from "../models/Comment";

export const createComment = async (data: { text: string; post: string; user: string }) => {
  return await Comment.create(data);
};
