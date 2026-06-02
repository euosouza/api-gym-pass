export class UserNotFoundError extends Error {
  constructor() {
    super("UserNotFoundError()");
    this.name = "UserNotFoundError";
  }
}
