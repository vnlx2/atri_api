export default {
  username: {
    exists: {errorMessage: 'username must be exists'},
    isString: {errorMessage: 'username must be string'},
  },
  password: {
    exists: {errorMessage: 'password must be exists'},
    isString: {errorMessage: 'password must be string'},
    isLength: {
      options: {min: 8},
      errorMessage: 'password must be at least 8 characters long',
    },
  },
};
