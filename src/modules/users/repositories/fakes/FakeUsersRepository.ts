import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.username === username);

    return foundUser;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      userToFind => userToFind.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  public async delete(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      userToRemove => userToRemove === user,
    );

    this.users.splice(findIndex, 1);
  }
}

export default FakeUsersRepository;
