import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { postRoutes } from '../modules/Post/post.route';
import { projectRoutes } from '../modules/Project/project.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path:'/posts',
    route: postRoutes,
  },
  {
    path:'/projects',
    route: projectRoutes,
  },



];


moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
