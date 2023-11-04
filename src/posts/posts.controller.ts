import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get() // option + enter = import 단축키
  getPost(): Post {
    return {
      author: 'newjeans_official',
      title: 'minji',
      content: 'making film',
      likeCount: 100000,
      commentCount: 9999,
    }
  }
}
