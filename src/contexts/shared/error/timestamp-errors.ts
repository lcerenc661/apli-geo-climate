import { BaseError } from './base-error';

export class InvalidTimestampError extends BaseError {
  constructor(timestamp: string, reason: string) {
    super(
      'TimestampError',
      `Invalid id for timestamp: ${timestamp}. ${reason}`,
      { timestamp, reason },
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
