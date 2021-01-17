import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import DeleteUserByIdService from '@modules/users/services/DeleteUserByIdService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, username, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      username,
      password,
    });

    return response.json(classToClass(user));
  }

  // I want the user only to be able to update their profiles, that's why I got the id from request
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      username,
      password,
      oldPassword,
      passwordConfirmation,
    } = request.body;
    const { id } = request.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      username,
      password,
      oldPassword,
      passwordConfirmation,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteUserById = container.resolve(DeleteUserByIdService);

    await deleteUserById.execute(id);

    return response.status(204).json();
  }
}
