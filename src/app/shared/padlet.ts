import { User } from "./user";
import {Entrie} from "./entrie";
import {formatDate} from "@angular/common";
export { User } from "./user";


export class Padlet {
  constructor(public id: number,
              public name: string,
              public is_public: boolean,
              public user_id: number,
              public user: User,
              public entries: Entrie[],
              public created_at: Date) {
  }

}
