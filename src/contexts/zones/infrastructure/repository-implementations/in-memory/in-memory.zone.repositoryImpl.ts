import { TemperatureRecord } from 'src/contexts/temperature-records/domain/entities/temperature-record.entity';
import { ZoneTemperatureSummaryInterface } from '../../../domain/interfaces/zone-temperature-summary.dto';
import { ZoneRepository } from '../../../domain/repositories/zone.repository';
import { Zone } from 'src/contexts/zones/domain/entities/zone.entity';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/contexts/shared/error/entity-errors';
import { GetTemperatureAnomaliesByZoneIdUseCase } from 'src/contexts/temperature-records/application/use-cases/get-temperature-anomalies-by-zone-id.use-case';
import { GetTemperatureSummaryByZoneIdUseCase } from 'src/contexts/temperature-records/application/use-cases/get-temperature-summary-by-zone-id.use-case';

@Injectable()
export class InMemoryZoneRepository extends ZoneRepository {
  constructor(
    private readonly getTemperatureAnomaliesByZoneIdUseCase: GetTemperatureAnomaliesByZoneIdUseCase,
    private readonly getTemperatureSummaryByZoneIdUseCase: GetTemperatureSummaryByZoneIdUseCase,
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

  async getSummary(zoneId: string): Promise<ZoneTemperatureSummaryInterface> {
    const zoneExists = await this.zoneExists(zoneId);
    if (!zoneExists) {
      throw new EntityNotFoundError('Zone', zoneId, 'Zone not found');
    }

    const summary: Omit<ZoneTemperatureSummaryInterface, 'zone'> =
      await this.getTemperatureSummaryByZoneIdUseCase.execute(zoneId);

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
      await this.getTemperatureAnomaliesByZoneIdUseCase.execute(zoneId);
    return anomalies;
  }
}
