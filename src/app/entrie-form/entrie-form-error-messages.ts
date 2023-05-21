export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const EntrieFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Eintrag Titel muss angegeben werden'),
  new ErrorMessage('text', 'required', 'Ein Text muss angegeben werden')
];
