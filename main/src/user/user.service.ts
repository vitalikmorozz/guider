import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './input.types/create.user.input';
import { UpdateUserInput } from './input.types/update.user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ relations: ['createdCourses'] });
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne(id, {
            relations: ['createdCourses'],
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(createUserData: CreateUserInput): Promise<User> {
        let user = new User();
        user.firstName = createUserData.firstName;
        user.lastName = createUserData.lastName;
        user.email = createUserData.email;
        user.password = createUserData.password;
        return user;
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async updateOne(
        id: number,
        updateUserData: UpdateUserInput,
    ): Promise<User> {
        await this.save({ id, ...updateUserData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<User> {
        let user = await this.findOne(id);
        if (!user) throw new NotFoundException('This user does not exists');
        await this.userRepository.delete(id);
        return user;
    }
}
