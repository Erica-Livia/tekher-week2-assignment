"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorize_1 = require("../middleware/authorize");
const validation_middleware_1 = require("../middleware/validation.middleware");
const post_shcemas_1 = require("../schema/post.shcemas");
const router = express_1.default.Router();
// Public routes (viewing posts)
router.get('/', post_controller_1.getAllPosts);
router.get('/:id', (0, validation_middleware_1.validate)(post_shcemas_1.getPostByIdSchema), post_controller_1.getPostById);
// Protected routes - require authentication
router.use(auth_middleware_1.authenticated);
// Only authenticated users can create posts
router.post('/create', (0, validation_middleware_1.validate)(post_shcemas_1.createPostSchema), post_controller_1.createPost);
// Author can update/delete their own posts
router.put('/:id', (0, validation_middleware_1.validate)(post_shcemas_1.updatePostSchema), post_controller_1.updatePost);
router.delete('/:id', (0, validation_middleware_1.validate)(post_shcemas_1.deletePostSchema), post_controller_1.deletePost);
// Admins can also delete posts
router.delete('/admin/:id', (0, authorize_1.authorize)(['admin']), (0, validation_middleware_1.validate)(post_shcemas_1.deletePostSchema), post_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map