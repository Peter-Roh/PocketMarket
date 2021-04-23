import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { Post } from './entities/post.entity';
import { Comment } from "./entities/comment.entity";
import { Order, OrderStatus } from './../orders/entities/order.entity';
import { User, UserRole } from './../users/entities/user.entity';
import { Restaurant } from './../restaurants/entities/restaurant.entity';
import {
    CreateBoardInput,
    CreateBoardOutput,
    CreatePostInput,
    CreatePostOutput,
    CreateCommentInput,
    CreateCommentOutput,
} from "./dtos/create-board.dto";
import {
    EditBoardInput,
    EditBoardOutput,
    EditPostInput,
    EditPostOutput,
    EditCommentInput,
    EditCommentOutput,
} from "./dtos/edit-board.dto";
import {
    GetBoardsOutput,
    GetPostsInput,
    GetPostsOutput,
    GetCommentsInput,
    GetCommentsOutput,
    GetBoardInput,
    GetBoardOutput,
    GetPostInput,
    GetPostOutput,
} from './dtos/get-board.dto';
import {
    DeleteBoardInput,
    DeleteBoardOutput,
    DeleteCommentInput,
    DeleteCommentOutput,
    DeletePostInput,
    DeletePostOutput,
} from "./dtos/delete-board.dto";

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board) private readonly boards: Repository<Board>,
        @InjectRepository(Post) private readonly posts: Repository<Post>,
        @InjectRepository(Comment) private readonly comments: Repository<Comment>,
        @InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>,
        @InjectRepository(Order) private readonly orders: Repository<Order>,
    ) {}

    // create

    async createAdminBoard(
        createBoardInput: CreateBoardInput,
    ): Promise<CreateBoardOutput> {
        try {
            const newBoard = this.boards.create(createBoardInput);
            newBoard.isAdmin = true;
            await this.boards.save(newBoard);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating board failed",
            };
        }
    }

    async createRestaurantBoard(
        restaurantId: number,
        user: User,
        createBoardInput: CreateBoardInput,
    ): Promise<CreateBoardOutput> {
        try {
            const newBoard = this.boards.create(createBoardInput);
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "Restaurant Not Found",
                };
            }
            newBoard.restaurant = restaurant;
            if(user.role === UserRole.Owner && restaurant.ownerId !== user.id) {
                return {
                    accepted: false,
                    error: "Not authorized behavior",
                };
            }
            await this.boards.save(newBoard);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating board failed",
            };
        }
    }

    async createBoard(
        createBoardInput: CreateBoardInput,
    ): Promise<CreateBoardOutput> {
        try {
            const newBoard = this.boards.create(createBoardInput);
            await this.boards.save(newBoard);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating board failed",
            };
        }
    }

    async createReview(
        orderId: number,
        user: User,
        boardId: number,
        createPostInput: CreatePostInput,
    ): Promise<CreatePostOutput> {
        try {
            const newPost = this.posts.create(createPostInput);
            newPost.user = user;
            const order = await this.orders.findOne(orderId);
            if(!order) {
                return {
                    accepted: false,
                    error: "Order Not Found",
                };
            }
            if(order.status !== OrderStatus.PickedUp) {
                return {
                    accepted: false,
                    error: "Cannot write review yet",
                };
            }
            newPost.order = order;
            const board = await this.boards.findOne(boardId);
            if(!board) {
                return {
                    accepted: false,
                    error: "Board Not Found",
                };
            }
            newPost.board = board;
            await this.posts.save(newPost);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating post failed",
            };
        }
    }

    async createPost(
        boardId: number,
        user: User,
        createPostInput: CreatePostInput
    ): Promise<CreatePostOutput> {
        try {
            const newPost = this.posts.create(createPostInput);
            newPost.user = user;
            const board = await this.boards.findOne(boardId);
            if(!board) {
                return {
                    accepted: false,
                    error: "Board Not Found",
                };
            }
            newPost.board = board;
            await this.posts.save(newPost);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating post failed",
            };
        }
    }

    async createComment(
        postId: number,
        user: User,
        createCommentInput: CreateCommentInput,
    ): Promise<CreateCommentOutput> {
        try {
            const newComment = this.comments.create(createCommentInput);
            newComment.user = user;
            const post = await this.posts.findOne(postId);
            if(!post) {
                return {
                    accepted: false,
                    error: "Post Not Found",
                };
            }
            newComment.post = post;
            await this.comments.save(newComment);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating comment failed",
            };
        }
    }

    // edit

    async editBoard(
        editBoardInput: EditBoardInput,
    ): Promise<EditBoardOutput> {
        try {
            const board = await this.boards.findOne(editBoardInput.boardId);
            if(!board) {
                return {
                    accepted: false,
                    error: "Board Not Found",
                };
            }
            await this.boards.save([{
                id: editBoardInput.boardId,
                ...editBoardInput,
            }]);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit board",
            };
        }
    }

    async editPost(
        owner: User,
        editPostInput: EditPostInput,
    ): Promise<EditPostOutput> {
        try {
            const post = await this.posts.findOne(editPostInput.postId);
            if(!post) {
                return {
                    accepted: false,
                    error: "Post Not Found",
                };
            }
            if(owner.id !== post.userId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.posts.save([{
                id: editPostInput.postId,
                ...editPostInput,
            }]);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit post",
            };
        }
    }

    async editComment(
        owner: User,
        editCommentInput: EditCommentInput,
    ): Promise<EditCommentOutput> {
        try {
            const comment = await this.comments.findOne(editCommentInput.commentId);
            if(!comment) {
                return {
                    accepted: false,
                    error: "Comment Not Found",
                };
            }
            if(owner.id !== comment.userId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.comments.save([{
                id: editCommentInput.commentId,
                ...editCommentInput,
            }]);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit comment",
            };
        }
    }

    // get

    async getBoards(): Promise<GetBoardsOutput> {
        try {
            const boards = await this.boards.find({
                relations: ['restaurant']
            });
            return {
                accepted: true,
                boards,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load boards",
            };
        }
    }

    async getPosts(
        getPostsInput: GetPostsInput,
    ): Promise<GetPostsOutput> {
        try {
            const posts = await (await this.posts.find()).filter(
                (elt) => {
                    if(elt.boardId === getPostsInput.boardId) {
                        return true;
                    }
                }
            );
            return {
                accepted: true,
                posts,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load posts",
            };
        }
    }

    async getComments(
        getCommentsInput: GetCommentsInput,
    ): Promise<GetCommentsOutput> {
        try {
            const comments = await (await this.comments.find()).filter(
                (elt) => {
                    if(elt.postId === getCommentsInput.postId) {
                        return true;
                    }
                }
            );
            return {
                accepted: true,
                comments,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load comments",
            };
        }
    }

    async getBoard(
        { boardId }: GetBoardInput,
    ): Promise<GetBoardOutput> {
        try {
            const board = await this.boards.findOne(boardId);
            if(!board) {
                return {
                    accepted: false,
                    error: "Board Not Found"
                };
            }
            return {
                accepted: true,
                board,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load board",
            };
        }
    }

    async getPost(
        { postId }: GetPostInput,
    ): Promise<GetPostOutput> {
        try {
            const post = await this.posts.findOne(postId);
            if(!post) {
                return {
                    accepted: false,
                    error: "Post Not Found"
                };
            }
            return {
                accepted: true,
                post,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load post",
            };
        }
    }

    // delete

    async deleteBoard(
        { boardId }: DeleteBoardInput,
        user: User,
    ):Promise<DeleteBoardOutput> {
        try {
            const board = await this.boards.findOne(boardId);
            if(!board) {
                return {
                    accepted: false,
                    error: "Board Not Found",
                };
            }
            await this.boards.delete(boardId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Deleting board failed",
            };
        }
    }

    async deletePost(
        { postId }: DeletePostInput,
        user: User,
    ): Promise<DeletePostOutput> {
        try {
            const post = await this.posts.findOne(postId);
            if(!post) {
                return {
                    accepted: false,
                    error: "Post Not Found",
                };
            }
            if(post.userId !== user.id) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.posts.delete(postId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Deleting post failed",
            };
        }
    }

    async deleteComment(
        { commentId }: DeleteCommentInput,
        user: User,
    ): Promise<DeleteCommentOutput> {
        try {
            const comment = await this.comments.findOne(commentId);
            if(!comment) {
                return {
                    accepted: false,
                    error: "Comment Not Found",
                };
            }
            if(comment.userId !== user.id) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.comments.delete(commentId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Deleting comment failed",
            };
        }
    }

    // 좋아요
}
