import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'somepass',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'somepass',
    });

    await expect(
      createUser.execute({
        name: 'Another John Doe',
        email: 'johndoe@example.com',
        username: 'anotherJohnDoe',
        password: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an existing username', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'somepass',
    });

    await expect(
      createUser.execute({
        name: 'Another John Doe',
        email: 'anotherjohndoe@example.com',
        username: 'johndoe',
        password: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
