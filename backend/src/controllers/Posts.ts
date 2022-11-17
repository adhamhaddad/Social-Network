import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Post from '../models/Post';
import { io } from '../server';

const post = new Post();

const createPost = async (req: Request, res: Response) => {
  try {
    const response = await post.createPost(req.body);
    io.emit('posts', { action: 'CREATE', data: { ...response } });
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
    const response = await post.getAllPosts(req.query.user_id as string);
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
    const response = await post.getUserPosts(req.query.username as string);
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
    io.emit('posts', { action: 'UPDATE', data: { ...response } });
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
    const response = await post.deletePost(req.body.post_id);
    io.emit('posts', { action: 'DELETE', data: { ...response } });
    res.status(200).json({
      status: true,
      data: { ...response },
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
  app.post('/user/posts', logger, verifyToken, createPost);
  app.get('/posts', logger, verifyToken, getAllPosts);
  app.get('/user/posts', logger, verifyToken, getUserPosts);
  app.patch('/user/posts', logger, verifyToken, updatePost);
  app.delete('/user/post', logger, verifyToken, deletePost);
};
export default posts_controller_routes;