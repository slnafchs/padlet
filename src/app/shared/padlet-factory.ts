import {Padlet, User} from "./padlet";

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(1, 'Name von Padlet', true,1);
  }


  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user_id
    );

  }
}
