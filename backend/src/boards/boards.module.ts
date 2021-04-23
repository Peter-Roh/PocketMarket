import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { Order } from './../orders/entities/order.entity';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Board,
        Post,
        Comment,
        Restaurant,
        Order,
    ])],
    providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
