import { Injectable } from '@nestjs/common';
import { ZoneRepository } from '../../domain/repositories/zone.repository';
import { EntityNotFoundError } from 'src/contexts/shared/error/entity-errors';

@Injectable()
export class ValidateZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(zoneId: string): Promise<boolean> {
    if (!(await this.zoneRepository.zoneExists(zoneId))) {
      throw new EntityNotFoundError('Zone', zoneId, 'Zone not found');
    }
    return true;
  }
}
