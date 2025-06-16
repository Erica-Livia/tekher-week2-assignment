import express, { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost, likePost
} from '../controllers/post.controller';
import { authenticated } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validation.middleware';
import { 
  createPostSchema,
  getPostByIdSchema,
  updatePostSchema,
  deletePostSchema
} from '../schema/post.shcemas';

const router: Router = express.Router();

// Public routes (viewing posts)
router.get('/', getAllPosts);
router.get('/:id', validate(getPostByIdSchema), getPostById);

// Protected routes - require authentication
// router.use(authenticated);

// Only authenticated users can create posts
router.post('/create', 
  validate(createPostSchema), 
  createPost
);

router.put('/like/:id', authenticated, likePost);

// Author can update/delete their own posts
router.put('/:id',
  // authorize(['admin']),
  // authenticated,
  validate(updatePostSchema),
  updatePost
);

router.delete('/:id',
  // authorize(['admin']),
  // authenticated,
  validate(deletePostSchema), 
  deletePost
);

// Admins can also delete posts
router.delete('/admin/:id', 
  authorize(['admin']),
  validate(deletePostSchema),
  deletePost
);

export default router;