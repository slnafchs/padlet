import {Padlet, User} from "./padlet";
import {UserFactory} from "./user-factory";

export class PadletFactory {

  static empty(): Padlet {

    return new Padlet(0, "", true, 0, UserFactory.empty(), [], new Date());
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
