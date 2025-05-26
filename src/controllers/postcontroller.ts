import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import User from "../models/user";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, body } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const post = await Post.create({
      title,
      body,
      authorId: userId,
    } as any);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const editPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    const userId = (req as any).user?.userId;
    const { title, body } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.authorId !== userId) {
      res.status(403).json({ message: "Not authorized to update this post" });
      return;
    }

    post.title = title || post.title;
    post.body = body || post.body;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.authorId !== userId) {
      res.status(403).json({ message: "Not authorized to delete this post" });
      return;
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

