import { User } from "./user";
import { Entrie } from "./entrie";
export { User } from "./user";
export { Entrie } from "./entrie";

export class Rating {
  constructor(
    public user_id: User,
    public entrie_id: Entrie,
    public rating: number
  ) {}
}
