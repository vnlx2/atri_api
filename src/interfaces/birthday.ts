const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface IBirthday {
  _id?: string;
  id?: string;
  month: number;
  day: number;
}

export interface IBirthdayRaw {
  _id?: string;
  month: number;
  day: number;
  username: string;
}

interface IBirthdayOutput {
  id: string;
  username: string;
  date: string;
}

export class BirthdayOutput implements IBirthdayOutput {
  id: string;
  username: string;
  date: string;

  constructor(birthday: IBirthdayRaw) {
    this.id = birthday._id!;
    this.username = birthday.username;
    this.date = `${birthday.day} ${monthName[birthday.month - 1]}`;
  }
}
