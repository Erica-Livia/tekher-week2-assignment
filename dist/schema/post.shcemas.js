"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostSchema = exports.getPostByIdSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
const common_schemas_1 = require("./common.schemas");
exports.createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: common_schemas_1.titleSchema,
        content: common_schemas_1.contentSchema,
    }),
});
exports.updatePostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: common_schemas_1.titleSchema.optional(),
        content: common_schemas_1.contentSchema.optional(),
    })
        .refine((data) => Object.keys(data).length > 0, {
        message: "Update at least one field"
    }),
});
exports.getPostByIdSchema = zod_1.z.object({
    params: common_schemas_1.idParamSchema,
});
exports.deletePostSchema = zod_1.z.object({
    params: common_schemas_1.idParamSchema,
});
//# sourceMappingURL=post.shcemas.js.map