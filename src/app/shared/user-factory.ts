import {Entrie, Padlet, User} from "./entrie";

export class UserFactory {

  static empty() : User{

    return new User(1, 'Julia', 'Müller', 'fuchs@gmail.com', 'password1234', 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80')
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
