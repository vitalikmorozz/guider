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
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(createUserData: CreateUserInput): Promise<User> {
        let newUser = new User();
        newUser = { ...createUserData };
        return this.userRepository.save(newUser);
    }

    async updateOne(
        id: number,
        updateUserData: UpdateUserInput,
    ): Promise<User> {
        await this.userRepository.save({ id, ...updateUserData });
        return this.userRepository.findOne(id);
    }

    async deleteOne(id: number): Promise<User> {
        let user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException('This user does not exists');
        await this.userRepository.delete(id);
        return user;
    }
}
