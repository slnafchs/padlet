import { Padlet } from "./padlet";
export { Padlet } from "./padlet";
import { User } from "./user";
export { User } from "./user";

export class Entrie {

  constructor(
    public id: number,
    public user_id: number,
    public padlet_id: number,
    public title: string,
    public content: string
  ) {}
}
