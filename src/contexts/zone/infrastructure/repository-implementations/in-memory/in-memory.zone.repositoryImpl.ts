import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';
import { ZoneTemperatureSummary } from '../../../domain/dtos/zone-temperature-summary.dto';
import { ZoneRepository } from '../../../domain/repositories/zone.repository';
import { Zone } from 'src/contexts/zone/domain/entities/zone.entity';
import { InMemoryTemperatureRecordRepository } from 'src/contexts/temperature-record/infrastructure/repository-implementations/in-memory/in-memory.temperature-record.repositoryImpl';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/contexts/shared/error/entity-errors';

@Injectable()
export class InMemoryZoneRepository extends ZoneRepository {
  constructor(
    private readonly temperatureRepository: InMemoryTemperatureRecordRepository,
  ) {
    super();
  }

  private zones: Zone[] = [
    new Zone('norte-001', 'Zona norte de la ciudad'),
    new Zone('sur-002', 'Zona sur de la ciudad'),
    new Zone('oeste-003', 'Zona oeste de la ciudad'),
    new Zone('este-004', 'Zona este de la ciudad'),
  ];

  async zoneExists(zoneId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        for (const zone of this.zones) {
          if (zone.id === zoneId) {
            console.log(`Zone exists: ${zoneId}`);
            resolve(true);
            return;
          }
        }
        console.log(`Zone does not exist: ${zoneId}`);
        resolve(false);
      }, 200);
    });
  }

  async getSummary(zoneId: string): Promise<ZoneTemperatureSummary> {
    const zoneExists = await this.zoneExists(zoneId);
    if (!zoneExists) {
      throw new EntityNotFoundError('Zone', zoneId, 'Zone not found');
    }

    const summary: Omit<ZoneTemperatureSummary, 'zone'> =
      await this.temperatureRepository.getTemperatureSummaryByZoneId(zoneId);

    return {
      zone: zoneId,
      ...summary,
    };
  }

  async getZoneAnomalies(zoneId: string): Promise<TemperatureRecord[][]> {
    const zoneExists = await this.zoneExists(zoneId);
    if (!zoneExists) {
      throw new EntityNotFoundError('Zone', zoneId, 'Zone not found');
    }
    const anomalies =
      await this.temperatureRepository.getAnomaliesByZoneId(zoneId);
    return anomalies;
  }
}
