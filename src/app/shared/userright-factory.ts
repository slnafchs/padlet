import { Userright } from "./userright";

export class UserrightFactory {
  static empty() : Userright{

    return new Userright(0, 0, false, false, false);
  }
  static fromObject(rawUserright: any) : Userright{
    return new Userright(
      rawUserright.user_id,
      rawUserright.padlet_id,
      rawUserright.read,
      rawUserright.edit,
      rawUserright.Delete
    );
  }
}
