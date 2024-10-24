import { Post } from "./post.model";
import { IPost } from "./post.interface";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TImageFiles } from "../../interfaces/image.interface";

const createPost = async (payload: IPost, images: TImageFiles)=> {

const { postImages } = images;
  payload.images = postImages.map((image) => image.path);

  const result = await Post.create(payload);
  return result;
};

const updatePost = async (
  id: string,
  postData: Partial<IPost>,
  images?: TImageFiles 
): Promise<IPost| null> => {
  
  if (images && images.postImages) {
      postData.images = images.postImages.map((image) => image.path.trim());
  }

  const result = await Post.findByIdAndUpdate(
    id,
    { $set: postData },
    { new: true, runValidators: true }
  );
  return result;
};

const deletePost = async (id: string): Promise<boolean> => {
  const result = await Post.findByIdAndDelete(id);
  return !!result;
};

const getPost = async (id: string): Promise<IPost | null> => {
  const result = await Post.findById(id)
  return result;
};


const getPosts = async (
  query: Record<string, unknown>
): Promise<{ posts: IPost[]; total: number; page: number; limit: number }> => {
  const postQuery = new QueryBuilder(Post.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const [posts, total] = await Promise.all([
    postQuery.modelQuery,
    Post.countDocuments(postQuery.modelQuery.getFilter()),
  ]);

  const { page = 1, limit = 10 } = query;

  return {
    posts,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};





export const PostServices = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
 
  
};