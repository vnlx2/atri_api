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

interface IBirthdayOutput {
  id: string;
  date: string;
}

export class BirthdayOutput implements IBirthdayOutput {
  id: string;
  date: string;

  constructor(birthday: IBirthday) {
    this.id = birthday._id!;
    this.date = `${birthday.day} ${monthName[birthday.month - 1]}`;
  }
}
