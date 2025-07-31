import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';
import { ZoneTemperatureSummary } from '../../../domain/dtos/zone-temperature-summary.dto';
import { ZoneRepository } from '../../../domain/repositories/zone.repository';
import { Zone } from 'src/contexts/zone/domain/entities/zone.entity';
import { InMemoryTemperatureRecordRepository } from 'src/contexts/temperature-record/infrastructure/in-memory/repositoriesImpl/in-memory.temperature-record.repositoryImpl';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryZoneRepository extends ZoneRepository {
  constructor(
    private readonly temperatureRepository: InMemoryTemperatureRecordRepository,
  ) {
    super();
  }

  private zones: Zone[] = [
    new Zone('00001', 'norte-001', 'Zona norte de la ciudad'),
    new Zone('00002', 'sur-002', 'Zona sur de la ciudad'),
    new Zone('00003', 'oeste-003', 'Zona oeste de la ciudad'),
    new Zone('00004', 'este-004', 'Zona este de la ciudad'),
  ];

  zoneExists(zoneId: string): Promise<boolean> {
    for (const zone of this.zones) {
      if (zone.id === zoneId) {
        console.log(`Zone exists: ${zoneId}`);
        return Promise.resolve(true);
      }
    }
    console.log(`Zone does not exist: ${zoneId}`);
    return Promise.resolve(false);
  }

  getSummary(zoneId: string): Promise<ZoneTemperatureSummary> {
    return Promise.resolve({
      zone: zoneId,
      averageTemperature: 0,
      minTemperature: 0,
      maxTemperature: 0,
      recordCount: 0,
      lastUpdated: new Date(),
    }); // Placeholder implementation
  }

  getAnomalies(zoneId: string): Promise<TemperatureRecord[]> {
    console.log(`Getting anomalies for zone: ${zoneId}`);
    // Implementation for getting anomalies in the zone
    return Promise.resolve([]); // Placeholder implementation
  }
}
