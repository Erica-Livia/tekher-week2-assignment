import { Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { 
  CreatePost,
  GetPostById,
  DeletePost,
  UpdatePost
} from '../schema/post.shcemas';
import { AuthenticatedRequest, ApiResponse } from '../types/common.types';
import { PostService } from '../services/post.service';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import { Post } from '../modals/Post';
import { User } from '../modals/User';

const postService = new PostService();

export const createPost = asyncHandler(async (
  req: CreatePost,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const { title, content, imageUrl, category } = req.body;
  // const userId = req.user?.id;

  // if (!userId) {
  //   throw new ForbiddenError('You must be logged in to create a post');
  // }

  const newPost = postService.create({
      title,
      content,
      imageUrl,
      category
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: { post: {
        id: (await newPost).id,
        title: (await newPost).title,
        content: (await newPost).content,
        // imageUrl: (await newPost).imageUrl,
        category: (await newPost).category,
    } }
  });
});

export const getAllPosts = asyncHandler(async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const posts = await postService.findAll();
  
  res.json({
    success: true,
    message: 'Posts retrieved successfully',
    data: {
      posts
    }
  });
});

export const getPostById = asyncHandler(async (
  req: AuthenticatedRequest & GetPostById,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const { id } = req.params;
  
  const post = await postService.findById(id);
  if (!post) {
    throw new NotFoundError('Post');
  }
  
  res.json({
    success: true,
    message: 'Post retrieved successfully',
    data: { post }
  });
});

export const updatePost = asyncHandler(async (
  req:  UpdatePost,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  // const id  = parseInt(req.params.id);
  const { title, content, imageUrl, category , isPublished} = req.body;
  const userRole = (req as any).user?.role;

  // if (userRole != 'admin') {
  //   throw new ForbiddenError('You cannot update a post');
  // }

  // Check if post exists
  const existingPost = await postService;
  if (!existingPost) {
    throw new NotFoundError('Post');
  }

  // // Check if user is the author of the post
  // if (existingPost.user?.role !== 'admin') {
  //   throw new ForbiddenError('You must be an admin to update this');
  // }

  const updatedPost = await postService.update( { title, content, category, isPublished})
  
  res.json({
    success: true,
    message: 'Post updated successfully',
    data: { post: updatedPost }
  });
});

export const deletePost = asyncHandler(async (
  req:  DeletePost,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const { id } = req.params;
  // const userId = req.user?.id;

  // if (!userId) {
  //   throw new ForbiddenError('You must be logged in to delete a post');
  // }

  // Check if post exists
  const existingPost = await postService.findByIdWithUser(id);
  if (!existingPost) {
    throw new NotFoundError('Post');
  }

  // // Check if user is the author of the post
  // if (existingPost.user?.role !== 'admin') {
  //   throw new ForbiddenError('You must be an admin');
  // }

  const deleted = await postService.delete(id);
  if (!deleted) {
    throw new Error('Failed to delete post');
  }
  
  res.json({
    success: true,
    message: 'Post deleted successfully',
  });
});

export const likePost = asyncHandler(async (
    req: AuthenticatedRequest,
    res: Response<ApiResponse>,
    next: NextFunction
) => {
  const postId = parseInt(req.params.id);
  const userId = req.user?.id;

  if (!userId) {
    throw new ForbiddenError("You must be logged in to like a post");
  }

  const post = await postService.findById(postId);
  if (!post) {
    throw new NotFoundError("Post");
  }

  const liked = await postService.likePost(postId, userId);

  res.json({
    success: true,
    message: liked ? "Post liked successfully" : "You already liked this post",
    data: { liked },
  });
});
