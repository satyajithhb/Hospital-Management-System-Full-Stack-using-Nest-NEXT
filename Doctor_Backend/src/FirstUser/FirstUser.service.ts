import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan} from 'typeorm';
import { Fuser } from './FirstUser.entity';

@Injectable()
export class FirstUserService {
  constructor(
    @InjectRepository(Fuser)
    private usersRepository: Repository<Fuser>,
  ) {}

  async createUser(createUserDto: Fuser): Promise<Fuser> {
    console.log(createUserDto);
   return await this.usersRepository.save(createUserDto);
   
  }
  async findAllUsers(): Promise<Fuser[]> {
    return await this.usersRepository.find();
  }
  
  async changeUserStatus(id: number, status: 'active' | 'inactive'): Promise<Fuser> {
  const user = await this.usersRepository.findOneBy({ id });
  if (!user) {
      throw new Error(`User with ID ${id} not found`);
     }
     user.status = status;
     await this.usersRepository.save(user);
     return user;
   }

   async findInactiveUsers(): Promise<Fuser[]> {
   return this.usersRepository.findBy({ status: 'inactive' });
   }

  async findUsersOlderThan40(): Promise<Fuser[]> {
    return this.usersRepository.find({ where: { age: MoreThan(40) } });
  }
}
