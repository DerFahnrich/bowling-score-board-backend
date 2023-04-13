export class ErrorResponse {
  private errorMessage: string;
  private statusCode: number;

  constructor(errorMessage: string, statusCode: number) {
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}
