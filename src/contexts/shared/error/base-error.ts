export abstract class BaseError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, any>;

  constructor(
    public readonly name: string,
    public readonly message: string,
    details?: Record<string, any>,
  ) {
    super(message);
    this.code = this.constructor.name;
    this.details = details;
  }

  abstract toJSON(): Record<string, any>;
}
