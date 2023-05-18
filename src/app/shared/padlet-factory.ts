import {Padlet, User} from "./padlet";

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(1, 'Name von Padlet', true,1,
      new User(1, 'Julia', 'Fuchs',
        'fuchs@gmail.com', 'password1234', 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'), [],
      new Date());
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user_id,
      rawPadlet.user,
      rawPadlet.entries,
      rawPadlet.created_at
    );
  }
}
