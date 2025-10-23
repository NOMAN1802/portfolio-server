import { QueryBuilder } from "../../builder/QueryBuilder";
import { TImageFiles } from "../../interfaces/image.interface";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (payload: IProject, images: TImageFiles)=> {

    const { projectImages } = images;
      payload.images = projectImages.map((image) => image.path);
    
      const result = await Project.create(payload);
      return result;
    };
  
    const updateProject = async (
        id: string,
        projectData: Partial<IProject>,
        images?: TImageFiles 
      ): Promise<IProject | null> => {
        
        if (images && images.projectImages) {
            projectData.images = images.projectImages.map((image) => image.path.trim());
        }
    
        const result = await Project.findByIdAndUpdate(
          id,
          { $set: projectData },
          { new: true, runValidators: true }
        );
        return result;
      };

const deleteProject = async (id: string): Promise<boolean> => {
  const result = await Project.findByIdAndDelete(id);
  return !!result;
};

const getProject = async (id: string): Promise<IProject | null> => {
  const result = await Project.findById(id)
  return result;
};


const getProjects = async (
  query: Record<string, unknown>
): Promise<{ projects: IProject[]; total: number; page: number; limit: number }> => {
  const projectQuery = new QueryBuilder(Project.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const [projects, total] = await Promise.all([
    projectQuery.modelQuery,
    Project.countDocuments(projectQuery.modelQuery.getFilter()),
  ]);

  const { page = 1, limit = 10 } = query;

  return {
    projects,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};


export const ProjectServices = {
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjects,
  
};