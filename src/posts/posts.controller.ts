/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsModule } from './posts.module';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '민지',
    content: 'making film minji',
    likeCount: 100000,
    commentCount: 9999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: 'making film 해린',
    likeCount: 100000,
    commentCount: 9999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블핑로제',
    content: '메이크업 고치는 로제',
    likeCount: 100000,
    commentCount: 99999,
  }
];
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get() // option + enter = import 단축키
  getPosts(): PostModel[] {
    return posts;
  }

  // path parameter 선언하기 /posts/:id
  @Get(':id')
  getPost(@Param('id') id: string) {

    const post = posts.find((post) => post.id === +id);

    if (!post) { // post 가 undefined 라면, 
      throw new NotFoundException();
    }
    return post;
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    }

    // posts 에 새로운 post 추가하기 
    posts = [
      ...posts, post
    ]
    return post; // 새로 만든 post 리턴하기 
  }
}
