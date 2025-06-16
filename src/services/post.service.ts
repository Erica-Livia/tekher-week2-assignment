import { AppDataSource } from "../config/database";
import {Post} from "../modals/Post";
import {Like} from "../modals/Like";
import {User} from "../modals/User";

export class PostService {
  private postRepository = AppDataSource.getRepository(Post);
  private likeRepository = AppDataSource.getRepository(Like);
  private userRepository = AppDataSource.getRepository(User);

  async create(data: {
    title: string;
    content: string;
    imageUrl: string;
    category: number;
  }): Promise<Post> {
    const post = this.postRepository.create(data);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findById(id: number): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async update( updatedData: Partial<Post>): Promise<Post | null> {
    const post = await this.postRepository.findOneBy({ });
    if (!post) return null;

    Object.assign(post, updatedData);
    return await this.postRepository.save(post);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async findByIdWithUser(id: number): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async likePost(postId: number, userId: number): Promise<boolean> {
    const existingLike = await this.likeRepository.findOne({
      where: {
        post: { id: postId },
        user: { id: userId }
      },
      relations: ["post", "user"],
    });

    if (existingLike) {
      // Already liked
      return false;
    }

    // Fetch user and post entities
    const user = await this.userRepository.findOneBy({ id: userId });
    const post = await this.postRepository.findOneBy({ id: postId });

    if (!user || !post) {
      throw new Error("User or Post not found");
    }

    const newLike = this.likeRepository.create({ user, post });
    await this.likeRepository.save(newLike);

    post.likesCount = (post.likesCount || 0) + 1;
    await this.postRepository.save(post);

    return true;
  }
}
