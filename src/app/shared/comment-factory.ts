import {Comment} from "./comment";
import {UserFactory} from "./user-factory";
import {EntrieFactory} from "./entrie-factory";

export class CommentFactory {
  static empty() : Comment{

    return new Comment(0, 0, UserFactory.empty(), 0, EntrieFactory.empty(), "");
  }
  static fromObject(rawComment: any) : Comment{
    return new Comment(
      rawComment.id,
      rawComment.user_id,
      rawComment.user,
      rawComment.entrie_id,
      rawComment.entrie,
      rawComment.comment
    );
  }
}
