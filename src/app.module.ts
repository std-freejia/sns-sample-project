/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './posts/entities/posts.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5431,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        PostModel,
      ],
      synchronize: true, // 운영환경에서는 반드시 false 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
