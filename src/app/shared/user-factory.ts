import {Entrie, Padlet, User} from "./entrie";

export class UserFactory {

  static empty() : User{

    return new User(0, '', '', '', '', '')
  }
  static fromObject(rawUser: any) : User{
    return new User(
      rawUser.id,
      rawUser.firstName,
      rawUser.lastName,
      rawUser.email,
      rawUser.password,
      rawUser.image
    );
  }
}
