import { User } from "./user";
import { Padlet } from "./padlet";
export { User } from "./user";
export { Padlet } from "./padlet";

export class Userright {
  constructor(
    public user_id: number,
    public padlet_id: number,
    public read: boolean,
    public edit: boolean,
    public Delete: boolean
  ) {}
}
