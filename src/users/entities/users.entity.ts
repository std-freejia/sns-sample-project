/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';

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
}
