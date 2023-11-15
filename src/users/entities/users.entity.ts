/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/entities/posts.entity';

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true, }) // 최대 길이 20. 유니크 값. 
  nickname: string;

  @Column({ unique: true, }) // 유니크 값.
  email: string;

  @Column()
  password: string;

  @Column({ enum: Object.values(RolesEnum), default: RolesEnum.USER })
  role: RolesEnum;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];  /**  userModel 이 작성한 post가 없다면, null이 아니라 [] 빈 배열. */
}
