import { Injectable } from '@nestjs/common';
import { TemperatureRecord } from 'src/contexts/temperature-records/domain/entities/temperature-record.entity';
import { ZoneRepository } from '../../domain/repositories/zone.repository';
import { EntityNotFoundError } from 'src/contexts/shared/error/entity-errors';

@Injectable()
export class GetZoneAnomaliesUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(zoneId: string): Promise<TemperatureRecord[][]> {
    if (!(await this.zoneRepository.zoneExists(zoneId))) {
      throw new EntityNotFoundError('Zone', zoneId, 'Zone not found');
    }
    const anomalies: TemperatureRecord[][] =
      await this.zoneRepository.getZoneAnomalies(zoneId);
    return anomalies;
  }
}
