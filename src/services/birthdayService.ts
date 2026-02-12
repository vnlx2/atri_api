import {BirthdayOutput, IBirthday} from '../interfaces/birthday';
import BirthdayRepository from '../repositories/birthdayRepository';

export default class BirthdayService {
  /**
   * Get Username
   *
   * @param id string
   * @returns Promise<string>
   */
  public async getUsername(id: string): Promise<string> {
    const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (response.status !== 200) {
      return 'Invalid User ID';
    }
    const data = await response.json();
    return data.username;
  }
  /**
   * Get All Birthdays
   *
   * @param page: number
   * @returns Promise<IBirthday[]>
   */
  public async getAllBirthdays(page: number) {
    const result = await BirthdayRepository.all(page);
    return {
      total: result.total,
      list: await Promise.all(
        result.list.map(async birthday => {
          const username = await this.getUsername(birthday._id!.toString());
          new Promise(r => setTimeout(r, 1500)); // Delay each iteration to prevent rate limited
          return new BirthdayOutput({
            _id: birthday._id!.toString(),
            month: birthday.month,
            day: birthday.day,
            username: username,
          });
        })
      ),
    };
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
    return {
      id: birthday._id!.toString(),
      month: birthday.month,
      day: birthday.day,
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
      return {
        id: birthday._id!.toString(),
        month: birthday.month,
        day: birthday.day,
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
