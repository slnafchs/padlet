export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const PadletFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Padlet Titel muss angegeben werden')
];
