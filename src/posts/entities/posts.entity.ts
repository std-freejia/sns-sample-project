/* eslint-disable prettier/prettier */
import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostModel {

  @PrimaryGeneratedColumn()
  id: number;

  // users model FK 로 참조한다. not null (작성자가 없는 포스트를 허용하지 않는다 )
  // ManyToOne 애노테이션을 가진 쪽에 fk 컬럼이 생성된다. 
  @ManyToOne(() => UsersModel, (user) => user.posts, { nullable: false })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}