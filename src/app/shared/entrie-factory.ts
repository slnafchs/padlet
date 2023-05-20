import {Entrie, Padlet, User} from "./entrie";
import {UserFactory} from "./user-factory";

export class EntrieFactory {

  static empty() : Entrie{

    return new Entrie(1,1, UserFactory.empty(), 1, 'Title', 'Content',  new Date(), [], []);
  }
  static fromObject(rawEntrie: any) : Entrie{
    return new Entrie(
      rawEntrie.id,
      rawEntrie.user_id,
      rawEntrie.user,
      rawEntrie.padlet_id,
      rawEntrie.title,
      rawEntrie.content,
      rawEntrie.created_at,
      rawEntrie.ratings,
      rawEntrie.comments
    );
  }
}
