import {hash} from 'bcrypt';
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
}

// import bcrypt from 'bcrypt';
// import userRepository from '../repositories/userRepository.js';

// // Show All Users
// const all = async () => {
//     try {
//         const users = await userRepository.list();
//         return { code: 200, data: users };
//     } catch (err) {
//         throw err;
//     }
// }

// // Show user detail
// const detail = async (id) => {
//     try {
//         const user = await userRepository.findById(id);
//         if (!user) {
//             throw { code: 404, name: "USER_NOT_FOUND", message: "User Not Found" };
//         }
//         return { code: 200, data: user };
//     } catch (err) {
//         throw err;
//     }
// }

// // Check username exists
// const checkUsernameExists = async (username) => {
//     try {
//         return await userRepository.isUsernameExists(username);
//     } catch (err) {
//         throw err;
//     }
// }

// // Store user
// const store = async (body) => {
//     try {
//         const isUsernameExists = await userRepository.isUsernameExists(body.username);
//         if (isUsernameExists) {
//             throw { code: 400, name: "USERNAME_EXISTS", message: "Username was exists." };
//         }
//         body.password = await bcrypt.hash(body.password, 10);
//         await userRepository.store(body);
//         return { code: 201 };
//     } catch (err) {
//         throw err;
//     }
// }

// // Update user
// const update = async (body) => {
//     try {
//         const isUserExists = await userRepository.isUserExists(body.id);
//         if (!isUserExists) {
//             throw { code: 404, name: "USER_NOT_FOUND", message: "User Not Found" };
//         }
//         if ("username" in body) {
//             const isUsernameExists = await userRepository.isUsernameExists(body.username);
//             if (isUsernameExists) {
//                 throw { code: 400, name: "USERNAME_EXISTS", message: "Username was exists." };
//             }
//         }
//         if ("password" in body) {
//             body.password = await bcrypt.hash(body.password, 10);
//         }
//         const response = await userRepository.update(body);
//         return { code: 200 };
//     } catch (err) {
//         throw err;
//     }
// }

// // Drop User
// const drop = async (id) => {
//     try {
//         const isUserExists = await userRepository.isUserExists(id);
//         if (!isUserExists) {
//             throw { code: 404, name: "USER_NOT_FOUND", message: "User Not Found" };
//         }
//         const isSuperAdmin = await userRepository.isSuperAdmin(id);
//         if (isSuperAdmin) {
//             throw { code: 400, name: "SUPERADMIN_CANNOT_BE_DELETED", message: "Super Admin User cannot be deleted." };
//         }
//         await userRepository.drop(id);
//         return { code: 200 };
//     } catch (err) {
//         throw err;
//     }
// }

// export default {
//     all,
//     detail,
//     checkUsernameExists,
//     store,
//     update,
//     drop
// };
