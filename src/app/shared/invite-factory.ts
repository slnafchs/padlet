import {Invite} from "./invite";

export class InviteFactory {
  static empty() : Invite{

    return new Invite(0, 0, 0, false, false, false);
  }
  static fromObject(rawInvite: any) : Invite{
    return new Invite(
      rawInvite.id,
      rawInvite.user_id,
      rawInvite.padlet_id,
      rawInvite.read,
      rawInvite.edit,
      rawInvite.Delete
    );
  }
}
