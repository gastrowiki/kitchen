export class HttpException extends Error {
  public status: number;
  public message: string;
  public fieldErrors: Record<string, string>;

  constructor(status: number, message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.message = message;
    this.fieldErrors = fieldErrors;
  }
}
