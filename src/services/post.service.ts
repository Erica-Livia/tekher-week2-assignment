import { AppDataSource } from "../config/database";
import { Post } from "../modals/Post";


export class PostService {
    create(arg0: { title: any; content: any; }) {
        throw new Error("Method not implemented.");
    }
    private  postRepository = AppDataSource.getRepository(Post);

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find();
    }
    
    async findById(id: number): Promise<Post | null> {
        return await this.postRepository.findOneBy({id});
    }

    async update(id: number, updatedData: Partial<Post>): Promise<Post | null> {
        const post = await this.postRepository.findOneBy({id})
        if (!post) return null;

        Object.assign(post, updatedData);
        return await this.postRepository.save(post);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.postRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}