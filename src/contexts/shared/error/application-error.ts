import { BaseError } from './base-error';

export class EntityNotFoundError extends BaseError {
  constructor(entity: string, entityId: string, reason: string) {
    super(
      'EntityNotFoundError',
      `Invalid id for ${entity}: ${entityId}. ${reason}`,
      { entity, entityId, reason },
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
