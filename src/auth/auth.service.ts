/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
/**
 * 개발할 내용 
 * 
 * 1) registerWithEmail
 *   - email, nickname, password를 입력받고, 사용자를 생성한다. 
 *   - 생성 완료되면 accessToken 과 refreshToken 을 반환한다. 
 *   - '회원가입 후 다시 로그인해주세요' 라는 과정을 방지. 
 * 
 * 2) loginWithEmail 
 *   - email, password 를 입력하면 사용자 검증을 입력한다. 
 *   - 검증이 완료되면 access token과 Refresh token 을 반환한다 
 * 
 * 3) loginUser 
 *   - 1과 2에서 필요한 access token 과 refresh token 을 반환하는 로직 
 * 
 * 4) signToken: 토큰을 생성 
 *   - 3에서 필요한 access token 과  refresh token 을 sign 하는 로직 
 * 
 * 5) authenticateWithEmailAndPassword
 *   - 2에서 로그인을 진행할때 필요한 기본적인 검증 진행 
 *     1. 사용자가 존재하는지 확인 (email)
 *     2. 비밀번호가 맞는지 확인 
 *     3. 모두 통과되면 찾은 사용자 정보 반환 
 *     4. loginWithEmail 에서 반환된 데이터를 기반으로  토큰 생성 
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
