"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const database_1 = require("../config/database");
const Post_1 = require("../modals/Post");
class PostService {
    constructor() {
        this.postRepository = database_1.AppDataSource.getRepository(Post_1.Post);
    }
    async create(data) {
        const post = this.postRepository.create(data);
        return await this.postRepository.save(post);
    }
    async findAll() {
        return await this.postRepository.find();
    }
    async findById(id) {
        return await this.postRepository.findOneBy({ id });
    }
    async update(id, updatedData) {
        const post = await this.postRepository.findOneBy({ id });
        if (!post)
            return null;
        Object.assign(post, updatedData);
        return await this.postRepository.save(post);
    }
    async delete(id) {
        const result = await this.postRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map