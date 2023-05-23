export class Invite {
  constructor(
    public id: number,
    public user_id: number,
    public padlet_id: number,
    public read: boolean,
    public edit: boolean,
    public Delete: boolean
  ) {}
}
