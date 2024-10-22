import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TImageFiles } from "../../interfaces/image.interface";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
    
    if (!req.files) {
        throw new AppError(400, 'Please upload an image');
      }
    
  const post = await ProjectServices.createProject(
    req.body,
    req.files as TImageFiles
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project created successfully",
    data: post,
  });
});


const updateProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.updateProject(req.params.id,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.deleteProject(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: result,
  });
});

const getProject = catchAsync(async (req, res) => {
    const result = await ProjectServices.getProject(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Project retrieved successfully",
      data: result,
    });
  });
  
  const getProjects = catchAsync(async (req, res) => {
    const query = { ...req.query };

  
    const result = await ProjectServices.getProjects(query);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Projects retrieved successfully",
      data: result,
    });
  });
export const ProjectController = {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getProjects
  };