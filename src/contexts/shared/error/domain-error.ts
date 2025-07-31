import { BaseError } from './base-error';

export class InvalidEntityFieldError extends BaseError {
  constructor(entity: string, field: string, value: unknown, reason: string) {
    super(
      'InvalidEntityFieldError',
      `Invalid ${field} for ${entity}: ${String(value)}. ${reason}`,
      { entity, field, value, reason },
    );
  }

  toJSON(): Record<string, any> {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}
