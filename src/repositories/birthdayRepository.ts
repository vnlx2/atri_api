import {IBirthday} from '../interfaces/birthday';
import {BirthdayModel} from '../models/Birthday';

export default class BirthdayRepository {
  private static readonly birthdayModel = BirthdayModel();

  /**
   * Get All
   *
   * @param page: number
   * @returns Promise<any[]>
   */
  public static async all(page: number) {
    const response = await this.birthdayModel
      .find()
      .select('-__v')
      .sort({month: 1, day: 1})
      .limit(10)
      .skip(10 * (page - 1));
    const total = await this.birthdayModel.countDocuments({});
    return {
      list: response,
      total: total,
    };
  }

  /**
   * Find by Id
   *
   * @param id string
   * @return Promise<any>
   */
  public static async findById(id: string) {
    return await this.birthdayModel.findById(id).select('-__v').lean();
  }

  /**
   * Find by Current Date
   *
   * @param month number
   * @param day number
   * @returns Promise<any[]>
   */
  public static async findByCurrentDate(month: number, day: number) {
    return await this.birthdayModel.find({month, day}).select('-__v').lean();
  }

  /**
   * Store
   *
   * @param body IBirthday
   * @returns Promise<void>
   */
  public static async store(body: IBirthday) {
    await this.birthdayModel.create(body);
  }

  /**
   * Update
   *
   * @param body IBirthday
   * @returns Promise<void>
   */
  public static async update(body: IBirthday) {
    await this.birthdayModel.updateOne({_id: body._id}, body);
  }

  /**
   * Delete
   *
   * @param id string
   * @returns Promise<void>
   */
  public static async delete(id: string) {
    await this.birthdayModel.deleteOne({_id: id});
  }
}
