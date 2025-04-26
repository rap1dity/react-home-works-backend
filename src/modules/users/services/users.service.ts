import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '@src/modules/users/entities/user.entity';
import { UserErrors } from '@src/modules/users/enums/user-errors.enum';
import { CreateUserDTO } from '@src/modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<UserEntity>;
  private readonly tableAlias = 'users';
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {
    this.userRepository = this.entityManager.getRepository(UserEntity);
  }

  async create(dto: CreateUserDTO): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const userData = {
      ...dto,
      password: hashedPassword,
    };

    const userToSave = this.userRepository.create(userData);

    const user = await this.userRepository.save(userToSave);

    return this.findOneByIdOrFail(user.id);
  }

  async findOneByIdOrFail(id: string, queryRunner?: QueryRunner): Promise<UserEntity> {
    const user = await this.getBaseQuery(queryRunner).where('id = :id', { id }).getOne();

    if (!user) {
      throw new BadRequestException(UserErrors.NOT_FOUND);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.getBaseQuery().where('username = :username', { username }).addSelect('users.password').getOne();
  }

  async getProfile(id: string): Promise<UserEntity> {
    return this.findOneByIdOrFail(id);
  }

  getBaseQuery(queryRunner?: QueryRunner): SelectQueryBuilder<UserEntity> {
    return this.userRepository.createQueryBuilder(this.tableAlias, queryRunner);
  }
}
