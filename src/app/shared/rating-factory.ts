import {Comment, User} from "./comment";
import {UserFactory} from "./user-factory";
import {EntrieFactory} from "./entrie-factory";
import {Rating} from "./rating";

export class RatingFactory {
  static empty() : Rating{

    return new Rating(0, UserFactory.empty(), EntrieFactory.empty(), 0);
  }
  static fromObject(rawRating: any) : Rating{
    return new Rating(
      rawRating.user_id,
      rawRating.user,
      rawRating.entrie,
      rawRating.rating
    );
  }
}
