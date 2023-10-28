export default {
  id: {
    optional: true,
    isString: {errorMessage: 'id must be a string'},
  },
  month: {
    exists: {errorMessage: 'month is required'},
    isInt: {
      options: {min: 1, max: 12},
      errorMessage: 'month must be between 1 and 12',
    },
  },
  day: {
    exists: {errorMessage: 'day is required'},
    isInt: {
      options: {min: 1, max: 31},
      errorMessage: 'day must be between 1 and 31',
    },
    custom: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: (value: number, {req}: {req: any}) => {
        if ([4, 6, 9, 11].includes(req.body.month) && value > 30) {
          return false;
        } else if (req.body.month === 2 && value > 29) {
          return false;
        } else {
          return true;
        }
      },
      errorMessage: 'Invalid date',
    },
  },
};
