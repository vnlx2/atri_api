import {BirthdayOutput, IBirthday} from '../interfaces/birthday';
import BirthdayRepository from '../repositories/birthdayRepository';

export default class BirthdayService {
  /**
   * Get All Birthdays
   *
   * @returns Promise<IBirthday[]>
   */
  public async getAllBirthdays(): Promise<BirthdayOutput[]> {
    const birthdays = await BirthdayRepository.all();
    return birthdays.map(birthday => {
      return new BirthdayOutput(birthday);
    });
  }

  /**
   * Find by Id
   *
   * @param id string
   * @returns Promise<IBirthday>
   */
  public async findById(id: string): Promise<IBirthday> {
    const birthday = await BirthdayRepository.findById(id);
    if (!birthday) {
      throw new Error('BIRTHDAY_NOT_FOUND');
    }
    const idStr = birthday._id.toString();
    delete birthday._id;
    return {
      id: idStr,
      ...birthday,
    };
  }

  /**
   * Find by Current Date
   *
   * @returns Promise<IBirthday[]?>
   */
  public async findByCurrentDate(): Promise<IBirthday[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const birthdays = await BirthdayRepository.findByCurrentDate(
      currentMonth,
      currentDay
    );
    return birthdays.map(birthday => {
      const id = birthday._id!.toString();
      delete birthday._id;
      return {
        id: id,
        ...birthday,
      };
    });
  }

  /**
   * Store
   *
   * @param body IBirthday
   * @returns Promise<void>
   */
  public async store(body: IBirthday): Promise<void> {
    const birthday = await BirthdayRepository.findById(body.id!);
    if (birthday) {
      throw new Error('USER_BIRTHDAY_ALREADY_EXISTS');
    }
    await BirthdayRepository.store({
      _id: body.id,
      month: body.month,
      day: body.day,
    });
  }

  /**
   * Update
   *
   * @param body IBirthday
   * @return Promise<void>
   */
  public async update(body: IBirthday): Promise<void> {
    const birthday = await BirthdayRepository.findById(body.id!);
    if (!birthday) {
      throw new Error('BIRTHDAY_NOT_FOUND');
    }
    await BirthdayRepository.update({
      _id: body.id,
      month: body.month,
      day: body.day,
    });
  }

  /**
   * Delete
   *
   * @param id string
   * @returns Promise<void>
   */
  public async delete(id: string): Promise<void> {
    const birthday = await BirthdayRepository.findById(id);
    if (!birthday) {
      throw new Error('BIRTHDAY_NOT_FOUND');
    }
    await BirthdayRepository.delete(id);
  }
}
