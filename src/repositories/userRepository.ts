import {UserModel, IUser} from '../models/User';

export default class UserRepository {
  private static readonly userModel = UserModel();
  /**
   * Check Username exists
   *
   * @param username string
   * @returns boolean
   */
  public static async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({username: username})
      .select('username');
    return user !== null;
  }

  /**
   * Find by Username
   *
   * @param username string
   * @returns Promise<UserModel>
   */
  public static async findByUsername(username: string): Promise<IUser | null> {
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
   * @param isPasswordValidation bool
   * @returns
   */
  public static async findById(id: string, isPasswordValidation = false) {
    if (isPasswordValidation) {
      return this.userModel.findById(id).select('+password');
    }
    return await this.userModel.findById(id).select('-__v').lean();
  }

  /**
   * Store User
   *
   * @param body IUser
   * @returns Promise<void>
   */
  public static async store(body: IUser) {
    await this.userModel.create(body);
  }

  /**
   * Update User
   *
   * @param body IUser
   * @returns Promise<void>
   */
  public static async update(body: IUser) {
    await this.userModel.updateOne({_id: body._id}, body);
  }

  /**
   * Delete user by id
   *
   * @param id string
   * @returns Promise<void>
   */
  public static async delete(id: string) {
    await this.userModel.deleteOne({_id: id});
  }
}
