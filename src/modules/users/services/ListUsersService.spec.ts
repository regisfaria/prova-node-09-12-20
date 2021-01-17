import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ListUsersService from './ListUsersService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'somepass',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Doe John',
      email: 'doejohn@example.com',
      username: 'doejohn',
      password: 'somepass2',
    });

    const users = await listUsers.execute();

    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });

  it('should throw AppError and display a message when there are no users registred', async () => {
    await expect(listUsers.execute()).rejects.toBeInstanceOf(AppError);
  });
});
