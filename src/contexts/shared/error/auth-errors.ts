import { BaseError } from './base-error';

export class MissingOrInvalidApiKeyError extends BaseError {
  constructor() {
    super(
      'MissingApiKeyError',
      'API key is missing or invalid. Please review your request, it should include the header "x-api-key" with a valid API key.',
    );
  }

  toJSON(): Record<string, any> {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export class MissingOrInvalidBearerTokenError extends BaseError {
  constructor() {
    super(
      'InvalidBearerTokenError',
      'Invalid or missing bearer token, please provide a valid token in the Authorization header.',
    );
  }

  toJSON(): Record<string, any> {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
