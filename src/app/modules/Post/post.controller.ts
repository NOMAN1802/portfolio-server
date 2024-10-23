import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { PostServices } from "./post.service";
import { TImageFiles } from "../../interfaces/image.interface";


const createPost = catchAsync(async (req, res) => {
    
    if (!req.files) {
        throw new AppError(400, 'Please upload an image');
      }
    
  const post = await PostServices.createPost(
    req.body,
    req.files as TImageFiles
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post created successfully",
    data: post,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const result = await PostServices.updatePost(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await PostServices.deletePost(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post deleted successfully",
    data: result,
  });
});

const getPost = catchAsync(async (req, res) => {
  const result = await PostServices.getPost(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post retrieved successfully",
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const query = { ...req.query };
  const result = await PostServices.getPosts(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts retrieved successfully",
    data: result,
  });
});



export const PostController = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,

  
};