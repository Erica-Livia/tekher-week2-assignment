"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorize_1 = require("../middleware/authorize");
const validation_middleware_1 = require("../middleware/validation.middleware");
const user_schemas_1 = require("../schema/user.schemas");
const router = express_1.default.Router();
// Public routes
router.get('/search', (0, validation_middleware_1.validate)(user_schemas_1.searchUsersSchema), users_controller_1.search);
// Protected routes - require authentication
router.use(auth_middleware_1.authenticated);
// Any authenticated user can view user details
router.get('/:id', (0, validation_middleware_1.validate)(user_schemas_1.getUserByIdSchema), users_controller_1.getById);
// Only admins can update or delete users
router.get('/', (0, authorize_1.authorize)(['admin']), users_controller_1.getAllUsers);
router.put('/:id', (0, authorize_1.authorize)(['admin']), (0, validation_middleware_1.validate)(user_schemas_1.updateUserSchema), users_controller_1.updateUser);
router.delete('/:id', (0, authorize_1.authorize)(['admin']), (0, validation_middleware_1.validate)(user_schemas_1.deleteUserSchema), users_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map