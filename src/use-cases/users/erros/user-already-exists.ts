export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail já cadastrado no sistema");
    this.name = "UserAlreadyExistsError";
  }
}
