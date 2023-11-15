/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';
/*
export interface PostModel {
  id: number;

  author: string;

  title: string;

  content: string;

  likeCount: number;

  commentCount: number;
}

export let posts: PostModel[] = [
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
  },
];
*/
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel) private readonly postsRepository: Repository<PostModel>
  ) { }
  async getAllPosts() {
    return this.postsRepository.find({
      select: {
        title: true, // posts의 title 컬럼만 조회 
        author: { email: true }, // relation 객체 author 의 email 컬럼만 조회 
      },
      relations: ['author']
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      relations: ['author'],
      where: { id },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다  
    // 2) save -> 객체를 저장한다 (create 메서드에서 생성한 객체로 )
    const post = this.postsRepository.create({
      author: { id: authorId },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });
    const newPost = await this.postsRepository.save(post);
    return newPost; // 새로 만든 post 리턴하기 
  }

  async updatePost(postId: number, title: string, content: string) {
    // save 의 기능 
    // 1) 만약 데이터가 존재하지 않으면, 새로 생성 
    // 2) 데이터가 존재하면, (같은 id 레코드) 값을 업데이트
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException();
    }
    // 입력받은 것만 업데이트 처리 
    if (title) { post.title = title; }
    if (content) { post.content = content; }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {

    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException();
    }
    await this.postsRepository.delete(postId);
    return postId;
  }

}
