import { NextFunction } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { CreatePost } from "../schema/post.shcemas";
import { AuthenticatedRequest } from "../types/common.types";
import { PostService } from "../services/post.service";
import { Post } from "../modals/Post";

const postService = new PostService


export const createPost = asyncHandler(async (
    req: AuthenticatedRequest & CreatePost,
    res:Response,
    next: NextFunction
) => {
    const { title, content} = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
        res.status(401).json({
            success: false,
            message: 'You are not logged in',
        })
        return;
    }


    const newPost = await postService.create({title, content});

    res.status(201).json(newPost);
}