import { Router } from 'express';
import { 
  createPost, 
  getAllPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} from '../controllers/postcontroller';
import { authenticate } from '../middleware/authmiddleware';

const router = Router();

router.post('/', authenticate, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

export default router;