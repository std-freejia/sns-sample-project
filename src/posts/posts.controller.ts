/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id') // path parameter 선언하기 /posts/:id
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  postPosts(
    @Body('authorId') authorId: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(authorId, title, content);
  }

  @Put(':id') // path parameter 로 id를 받는다 
  putPost(
    @Param('id') id: string,
    @Body('title') title?: string, // optional 입력값이라면 ? 를 붙여준다 
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(Number(id), title, content);
  }

  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ) {
    return this.postsService.deletePost(Number(id));
  }
}
