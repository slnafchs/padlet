import { User } from "./user";
import {Entrie} from "./entrie";
import {formatDate} from "@angular/common";
import {Userright} from "./userright";
export { User } from "./user";

//Padlet class -> repräsentiert Model bzw. Entitäten aus der Datenbank

export class Padlet {
  constructor(public id: number, //Benennung muss der Datenbank gleichen (id)
              public name: string,
              public is_public: boolean,
              public user_id: number,
              public user: User,
              public entries: Entrie[],
              public created_at: Date) {
  }

}
