import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { postValidations } from "./post.validation";
import { PostController } from "./post.controller";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFilesArrayZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/create-post",auth(USER_ROLE.admin),multerUpload.fields([{ name: 'postImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(postValidations.createPostSchema),
  PostController.createPost
);

router.patch(
  "/update-post/:id",auth(USER_ROLE.admin),multerUpload.fields([{name :'postImages'}]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(postValidations.updatePostSchema),
  PostController.updatePost
);

router.delete(
  "/delete-post/:id",

  PostController.deletePost
);

router.get("/:id", PostController.getPost);

router.get("/", PostController.getPosts);





export const postRoutes = router;
