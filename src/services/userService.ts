import {compare, hash} from 'bcrypt';
import {IUser} from '../models/User';
import UserRepository from '../repositories/userRepository';

export default class UserService {
  /**
   * Get All Users
   *
   * @return Promise<IUser>
   */
  public async getAllUsers(): Promise<IUser[]> {
    const users = await UserRepository.getAllUsers();
    return users.map(user => {
      const id = user._id!.toString();
      delete user._id;
      return {
        id: id,
        ...user,
      };
    });
  }

  /**
   * Get user detail by id
   *
   * @param id string
   * @return Promise<IUser>
   */
  public async getUserById(id: string): Promise<IUser> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    const idStr = user._id.toString();
    delete user._id;
    return {
      id: idStr,
      ...user,
    };
  }

  /**
   * Store User
   *
   * @param body Object
   * @returns Promise<void>
   */
  public async storeUser(body: IUser): Promise<void> {
    await UserRepository.store({
      username: body.username,
      password: await hash(body.password!, 10),
      role: body['role'],
    });
  }

  /**
   * Update User
   *
   * @param body IUser
   * @return Promise<void>
   */
  public async updateUser(body: IUser): Promise<void> {
    const user = await UserRepository.findByUsername(body.username!, true);
    await UserRepository.update({
      _id: body.id!,
      username: body.username,
      password: !(await compare(body.password!, user!.password!))
        ? await hash(body.password!, 10)
        : user?.password,
      role: body.role,
    });
  }

  /**
   * Delete user by id
   *
   * @param id string
   * @returns Promise<void>
   */
  public async deleteUser(id: string): Promise<void> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    await UserRepository.delete(id);
  }
}
