import { User } from "./users.entity";


export const UsersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];