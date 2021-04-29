import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoardsService } from './boards.service';
import { Board } from "./entities/board.entity";
import { AuthUser } from './../auth/auth-user.decorator';
import { User } from './../users/entities/user.entity';
import { Role } from "src/auth/role.decorator";
import {
    CreateBoardInput,
    CreateBoardOutput,
    CreateReviewInput,
    CreatePostInput,
    CreatePostOutput,
    CreateCommentInput,
    CreateCommentOutput,
} from './dtos/create-board.dto';
import {
    EditBoardInput,
    EditBoardOutput,
    EditPostInput,
    EditPostOutput,
    EditCommentInput,
    EditCommentOutput,
} from './dtos/edit-board.dto';
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
    DeletePostInput,
    DeletePostOutput,
    DeleteCommentInput,
    DeleteCommentOutput,
} from './dtos/delete-board.dto';
import {
    LikePostInput,
    LikePostOutput,
} from './dtos/like-post.dto';

@Resolver(of => Board)
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    // create

    // 공지사항 같은 운영자 게시판
    @Mutation(returns => CreateBoardOutput)
    @Role(['Admin'])
    async createAdminBoard(
        @Args('input') createBoardInput: CreateBoardInput,
    ): Promise<CreateBoardOutput> {
        return this.boardsService.createAdminBoard(createBoardInput);
    }

    // 식당 리뷰와 같은 식당용 게시판
    @Mutation(returns => CreateBoardOutput)
    @Role(['Owner', 'Admin'])
    async createRestaurantBoard(
        @AuthUser() authUser: User,
        @Args('input') createBoardInput: CreateBoardInput,
    ): Promise<CreateBoardOutput> {
        return this.boardsService.createRestaurantBoard(authUser, createBoardInput);
    }

    @Mutation(returns => CreateBoardOutput)
    @Role(['Admin'])
    async createBoard(
        @Args('input') createBoardInput: CreateBoardInput,
    ): Promise<CreateBoardOutput> {
        return this.boardsService.createBoard(createBoardInput);
    }

    @Mutation(returns => CreatePostOutput)
    @Role(['Any'])
    async createReview( // order와 연결되어 있음
        @AuthUser() authUser: User,
        @Args('input') createReviewInput: CreateReviewInput,
    ): Promise<CreatePostOutput> {
        return this.boardsService.createReview(authUser, createReviewInput);
    }

    @Mutation(returns => CreatePostOutput)
    @Role(['Any'])
    async createPost( // order와 관련 없음
        @AuthUser() authUser: User,
        @Args('input') createPostInput: CreatePostInput,
    ): Promise<CreatePostOutput> {
        return this.boardsService.createPost(authUser, createPostInput);
    }

    @Mutation(returns => CreateCommentOutput)
    @Role(['Any'])
    async createComment(
        @AuthUser() authUser: User,
        @Args('input') createCommentInput: CreateCommentInput,
    ): Promise<CreateCommentOutput> {
        return this.boardsService.createComment(authUser, createCommentInput);
    }

    // edit

    @Mutation(returns => EditBoardOutput)
    @Role(['Admin'])
    async editBoard(
        @Args('input') editBoardInput: EditBoardInput,
    ):Promise<EditBoardOutput> {
        return this.boardsService.editBoard(editBoardInput);
    }

    @Mutation(returns => EditPostOutput)
    @Role(['Owner', 'Admin'])
    async editPost(
        @AuthUser() authUser: User,
        @Args('input') editPostInput: EditPostInput,
    ):Promise<EditPostOutput> {
        return this.boardsService.editPost(authUser, editPostInput);
    }

    @Mutation(returns => EditCommentOutput)
    @Role(['Owner', 'Admin'])
    async editComment(
        @AuthUser() authUser: User,
        @Args('input') editCommentInput: EditCommentInput,
    ):Promise<EditCommentOutput> {
        return this.boardsService.editComment(authUser, editCommentInput);
    }

    // get

    @Query(returns => GetBoardsOutput)
    getBoards(): Promise<GetBoardsOutput> {
        return this.boardsService.getBoards();
    }

    @Query(returns => GetPostsOutput)
    getPosts(
        @Args('input') getPostsInput: GetPostsInput,
    ): Promise<GetPostsOutput> {
        return this.boardsService.getPosts(getPostsInput);
    }

    @Query(returns => GetCommentsOutput)
    getComments(
        @Args('input') getCommentsInput: GetCommentsInput,
    ): Promise<GetCommentsOutput> {
        return this.boardsService.getComments(getCommentsInput);
    }

    @Query(returns => GetBoardOutput)
    getBoard(
        @Args('input') getBoardInput: GetBoardInput,
    ):Promise<GetBoardOutput> {
        return this.boardsService.getBoard(getBoardInput);
    }

    @Query(returns => GetPostOutput)
    getPost(
        @Args('input') getPostInput: GetPostInput,
    ):Promise<GetPostOutput> {
        return this.boardsService.getPost(getPostInput);
    }

    // delete

    @Mutation(returns => DeleteBoardOutput)
    @Role(['Admin'])
    async deleteBoard(
        @Args('input') deleteBoardInput: DeleteBoardInput,
        @AuthUser() authUser: User,
    ): Promise<DeleteBoardOutput> {
        return this.boardsService.deleteBoard(deleteBoardInput, authUser);
    }

    @Mutation(returns => DeletePostOutput)
    @Role(['Any'])
    async deletePost(
        @Args('input') deletePostInput: DeletePostInput,
        @AuthUser() authUser: User,
    ): Promise<DeletePostOutput> {
        return this.boardsService.deletePost(deletePostInput, authUser);
    }

    @Mutation(returns => DeleteCommentOutput)
    @Role(['Any'])
    async deleteComment(
        @Args('input') deleteCommentInput: DeleteCommentInput,
        @AuthUser() authUser: User,
    ): Promise<DeleteCommentOutput> {
        return this.boardsService.deleteComment(deleteCommentInput, authUser);
    }

    // 좋아요
    @Mutation(returns => LikePostOutput)
    @Role(['Any'])
    likePost(
        @Args('input') likePostInput: LikePostInput,
        @AuthUser() authUser: User,
    ): Promise<LikePostOutput> {
        return this.boardsService.likePost(likePostInput, authUser);
    }
}
