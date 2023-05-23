export class Invite {
  constructor(
    public id: number,
    public user_id: number,
    public padlet_id: number,
    public read: boolean,
    public edit: boolean,
    public Delete: boolean
  ) {}

  // because angular doesn't allow lowercase 'delete'
  static mapInvite(obj: any) : Invite{
    let invite = new Invite(obj['id'], obj['user_id'], obj['padlet_id'], obj['read'], obj['edit'], obj['delete']);
    return invite;
  }
}
