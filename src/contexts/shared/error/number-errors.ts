import { BaseError } from './base-error';

export class InvalidNumberError extends BaseError {
  constructor(field: string, value: string, reason: string) {
    super(
      'InvalidNumberError',
      `Invalid number for submitted for ${field}: ${value}. ${reason}`,
      { field, value, reason },
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

export class TemperatureOutOfRangeError extends BaseError {
  constructor(value: number, min: number, max: number) {
    super(
      'TemperatureOutOfRangeError',
      `Temperature value ${value} is out of the valid range (${min} - +${max}) in celsius`,
      { value, min, max },
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
