import { Injectable } from '@nestjs/common';
import { ZoneRepository } from '../../domain/repositories/zone.repository';
import { EntityNotFoundError } from 'src/contexts/shared/error/entity-errors';
import { ZoneTemperatureSummaryInterface } from '../../domain/interfaces/zone-temperature-summary.dto';

@Injectable()
export class GetZoneSummaryUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(zoneId: string): Promise<ZoneTemperatureSummaryInterface> {
    if (!(await this.zoneRepository.zoneExists(zoneId))) {
      throw new EntityNotFoundError('Zone', zoneId, 'Zone not found');
    }
    const summary = await this.zoneRepository.getSummary(zoneId);
    return summary;
  }
}
