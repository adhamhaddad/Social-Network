import { Request, Response, NextFunction, Application } from 'express';
import Post from '../models/Posts';

const post = new Post();

const createPost = async (req: Request, res: Response) => {
  try {
    const response = await post.createPost(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post created successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const response = await post.getAllPosts();
    res.status(200).json({
      status: true,
      data: response,
      message: 'Posts retrieved successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  try {
    const response = await post.getUserPosts(req.body);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Posts retrieved successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const response = await post.updatePost(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post updated successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await post.deletePost(req.body);
    res.status(200).json({
      status: true,
      message: 'Post deleted successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const posts_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/user/posts', logger, createPost);
  app.get('/posts', logger, getAllPosts);
  app.get('/user/posts', logger, getUserPosts);
  app.patch('/user/posts', logger, updatePost);
  app.delete('/user/post', logger, deletePost);
};
export default posts_controller_routes;
