import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFilesArrayZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";
import { ProjectController } from "./project.controller";
import { projectValidations } from "./project.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/create-project", auth(USER_ROLE.admin),multerUpload.fields([{name :'projectImages'}]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(projectValidations.createProjectSchema),
  ProjectController.createProject
);

router.patch(
  "/update-project/:id",auth(USER_ROLE.admin),multerUpload.fields([{name :'projectImages'}]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(projectValidations.updateProjectSchema),
 ProjectController.updateProject
);

router.delete(
  "/delete-project/:id",

  ProjectController.deleteProject
);

router.get("/:id", ProjectController.getProject);

router.get("/", ProjectController.getProjects);


export const projectRoutes = router;
