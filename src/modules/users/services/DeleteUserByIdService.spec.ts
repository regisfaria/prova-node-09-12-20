import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import DeleteUserByIdService from './DeleteUserByIdService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserByIdService;

describe('DeleteUserById', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserByIdService(fakeUsersRepository);
  });

  it('should be able to delete an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'somepass',
    });

    await expect(deleteUser.execute(user.id)).resolves;
  });

  it('should not be able to delete an user with a non-existing id', async () => {
    await expect(deleteUser.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
