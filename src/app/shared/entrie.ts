import { Padlet } from "./padlet";
export { Padlet } from "./padlet";
import { User } from "./user";
import {Rating} from "./rating";
import {Comment} from "./comment";
export {Comment} from "./comment";
export { User } from "./user";

export class Entrie {

  constructor(
    public id: number,
    public user_id: number,
    public user : User,
    public padlet_id: number,
    public title: string,
    public content: string,
    public created_at : Date,
    public ratings: Rating[],
    public comments: Comment[]
  ) {}
}
