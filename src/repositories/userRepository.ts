import {UserModel, IUser} from '../models/User';

export default class UserRepository {
  private static readonly userModel = UserModel();
  /**
   * Check Username not exists
   *
   * @param username string
   * @returns boolean
   */
  public static async isUsernameNotExists(username: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({username: username})
      .select('username');
    return user !== null;
  }

  /**
   * Find by Username
   *
   * @param username string
   * @param isPasswordValidation bool
   * @returns Promise<UserModel>
   */
  public static async findByUsername(
    username: string,
    isPasswordValidation = false
  ): Promise<IUser | null> {
    if (isPasswordValidation) {
      return this.userModel.findOne({username: username}).select('+password');
    }
    return this.userModel.findOne({username: username});
  }

  /**
   * Get All Users
   *
   * @returns
   */
  public static async getAllUsers() {
    return await this.userModel
      .find()
      .select('-__v -createdAt -updatedAt')
      .lean();
  }

  /**
   * Find by Id
   *
   * @param id string
   * @returns
   */
  public static async findById(id: string) {
    return await this.userModel.findById(id).select('-__v').lean();
  }
}

// import User from "../models/User.js";

// const list = async () => {
//     try {
//         return await User.find().select('-__v');
//     } catch (err) {
//         throw err;
//     }
// }

// const findById = async (id) => {
//     try {
//         return await User.findById(id).select('-__v');
//     } catch (err) {
//         throw err;
//     }
// }

// const isUserExists = async (id) => {
// 	try {
// 		const user =  await User.findOne({ _id: id }).select("_id");
// 		return user != null;
// 	} catch (err) {
// 		throw err;
// 	}
// }

// const isUsernameExists = async (username) => {
// 	try {
// 		const user = await User.findOne({username: username}).select('username');
// 		return user != null;
// 	} catch (err) {
// 		throw err;
// 	}
// }

// const isSuperAdmin = async (id) => {
//     try {
//         const user = await User.findOne({ _id: id }).select("role");
//         return user.role === 'superAdmin';
//     } catch (err) {
//         throw err;
//     }
// }

// const store = async (body) => {
//     try {
//         const user = await User(body);
//         return await user.save();
//     } catch (err) {
//         throw err;
//     }
// }

// const update = async (body) => {
//     try {
//         return await User.updateOne(
//             {_id: body.id},
//             {$set: body},
//             {runValidators: true}
//         );
//     } catch (err) {
//         throw err;
//     }
// }

// const drop = async (id) => {
//     try {
//         return await User.deleteOne({_id: id});
//     } catch (err) {
//         throw err;
//     }
// }

// export default {
// 	list,
// 	findById,
// 	isUserExists,
// 	isUsernameExists,
//     isSuperAdmin,
// 	store,
// 	update,
// 	drop
// };
