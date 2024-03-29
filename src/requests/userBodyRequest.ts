import UserRepository from '../repositories/userRepository';

export default {
  id: {
    optional: true,
    isString: {errorMessage: 'Id must be string'},
    custom: {
      options: async (value: string) => {
        if (value) {
          const result = await UserRepository.findById(value);
          if (!result) {
            return Promise.reject('User not found');
          }
          return Promise.resolve();
        }
      },
    },
  },
  username: {
    exists: {errorMessage: 'Username must be exists'},
    isString: {errorMessage: 'Username must be string'},
    custom: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: async (value: string, {req}: {req: any}) => {
        if (req.body.id) {
          const user = await UserRepository.findById(req.body.id!);
          if (value === user?.username) {
            return Promise.resolve();
          }
        }
        const result = await UserRepository.isUsernameExists(value);
        if (result) {
          return Promise.reject('Username already exists');
        }
        return Promise.resolve();
      },
    },
  },
  password: {
    exists: {errorMessage: 'Password must be exists'},
    isString: {errorMessage: 'Password must be string'},
    isLength: {
      options: {min: 8},
      errorMessage: 'Password must be at least 8 characters long',
    },
  },
  role: {
    exists: {errorMessage: 'Role must be exists'},
    isString: {errorMessage: 'Role must be string'},
    isIn: {
      options: [['admin', 'superAdmin']],
      errorMessage: 'Role must be admin or superAdmin',
    },
  },
};
