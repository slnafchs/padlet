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

  // because angular doesn't allow lowercase 'delete'
  static mapUserright(obj: any) : Userright{
    let userright = new Userright(obj['user_id'], obj['padlet_id'], obj['read'], obj['edit'], obj['delete']);
    return userright;
  }
}
