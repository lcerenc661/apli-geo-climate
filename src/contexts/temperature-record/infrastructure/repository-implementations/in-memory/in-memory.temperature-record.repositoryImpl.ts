import {
  TemperatureRecordsByZoneRequestDto,
  TemperatureRecordsByZoneResponseDto,
} from 'src/contexts/temperature-record/domain/dtos/temperature-record.dto';
import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';
import { TemperatureRecordRepository } from 'src/contexts/temperature-record/domain/repostitories/temperature-record.repository';
import {
  calculateAnomalies,
  calculateAverageTemperature,
  calculateMaxTemperature,
  calculateMinTemperature,
} from './in-memomry.temperature-record.utils';
import { ZoneTemperatureSummary } from 'src/contexts/zone/domain/dtos/zone-temperature-summary.dto';

export class InMemoryTemperatureRecordRepository extends TemperatureRecordRepository {
  private records: TemperatureRecord[] = [
    // Zona norte (norte-001)
    new TemperatureRecord(
      'c2a1e8f0-1a2b-4c3d-9e4f-123456789001',
      'norte-001',
      new Date('2025-07-01T08:00:00Z'),
      22.5,
      new Date('2025-07-01T08:00:00Z'),
    ),
    new TemperatureRecord(
      'c2a1e8f0-1a2b-4c3d-9e4f-123456789002',
      'norte-001',
      new Date('2025-07-01T12:00:00Z'),
      24.1,
      new Date('2025-07-01T12:00:00Z'),
    ),
    new TemperatureRecord(
      'c2a1e8f0-1a2b-4c3d-9e4f-123456789003',
      'norte-001',
      new Date('2025-07-01T16:00:00Z'),
      25.0,
      new Date('2025-07-01T16:00:00Z'),
    ),
    new TemperatureRecord(
      'c2a1e8f0-1a2b-4c3d-9e4f-123456789004',
      'norte-001',
      new Date('2025-07-01T20:00:00Z'),
      21.8,
      new Date('2025-07-01T20:00:00Z'),
    ),

    // Zona sur (sur-002)
    new TemperatureRecord(
      'd3b2f9e1-2b3c-5d4e-0f1a-123456789001',
      'sur-002',
      new Date('2025-07-01T08:00:00Z'),
      20.2,
      new Date('2025-07-01T08:00:00Z'),
    ),
    new TemperatureRecord(
      'd3b2f9e1-2b3c-5d4e-0f1a-123456789002',
      'sur-002',
      new Date('2025-07-01T12:00:00Z'),
      21.7,
      new Date('2025-07-01T12:00:00Z'),
    ),
    new TemperatureRecord(
      'd3b2f9e1-2b3c-5d4e-0f1a-123456789003',
      'sur-002',
      new Date('2025-07-01T16:00:00Z'),
      23.3,
      new Date('2025-07-01T16:00:00Z'),
    ),
    new TemperatureRecord(
      'd3b2f9e1-2b3c-5d4e-0f1a-123456789004',
      'sur-002',
      new Date('2025-07-01T20:00:00Z'),
      19.9,
      new Date('2025-07-01T20:00:00Z'),
    ),

    // Zona oeste (oeste-003)
    new TemperatureRecord(
      'e4c3g0f2-3c4d-6e5f-1a2b-123456789001',
      'oeste-003',
      new Date('2025-07-01T08:00:00Z'),
      18.5,
      new Date('2025-07-01T08:00:00Z'),
    ),
    new TemperatureRecord(
      'e4c3g0f2-3c4d-6e5f-1a2b-123456789002',
      'oeste-003',
      new Date('2025-07-01T12:00:00Z'),
      19.8,
      new Date('2025-07-01T12:00:00Z'),
    ),
    new TemperatureRecord(
      'e4c3g0f2-3c4d-6e5f-1a2b-123456789003',
      'oeste-003',
      new Date('2025-07-01T16:00:00Z'),
      21.0,
      new Date('2025-07-01T16:00:00Z'),
    ),
    new TemperatureRecord(
      'e4c3g0f2-3c4d-6e5f-1a2b-123456789004',
      'oeste-003',
      new Date('2025-07-01T20:00:00Z'),
      17.6,
      new Date('2025-07-01T20:00:00Z'),
    ),

    // Zona este (este-004)
    new TemperatureRecord(
      'f5d4h1g3-4d5e-7f6a-2b3c-123456789001',
      'este-004',
      new Date('2025-07-01T08:00:00Z'),
      23.0,
      new Date('2025-07-01T08:00:00Z'),
    ),
    new TemperatureRecord(
      'f5d4h1g3-4d5e-7f6a-2b3c-123456789002',
      'este-004',
      new Date('2025-07-01T12:00:00Z'),
      24.5,
      new Date('2025-07-01T12:00:00Z'),
    ),
    new TemperatureRecord(
      'f5d4h1g3-4d5e-7f6a-2b3c-123456789003',
      'este-004',
      new Date('2025-07-01T16:00:00Z'),
      26.1,
      new Date('2025-07-01T16:00:00Z'),
    ),
    new TemperatureRecord(
      'f5d4h1g3-4d5e-7f6a-2b3c-123456789004',
      'este-004',
      new Date('2025-07-01T20:00:00Z'),
      22.7,
      new Date('2025-07-01T20:00:00Z'),
    ),
  ];
  async save(record: TemperatureRecord): Promise<TemperatureRecord> {
    this.records.push(record);
    return Promise.resolve(record);
  }

  async getByZoneId(
    request: TemperatureRecordsByZoneRequestDto,
  ): Promise<TemperatureRecordsByZoneResponseDto> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Finding records for zone: ${request.zoneId}`);
        const filteredRecords = this.records.filter(
          (record) => record.zoneId === request.zoneId,
        );
        resolve({
          records: filteredRecords,
          totalRecords: filteredRecords.length,
        });
      }, 200);
    });
  }

  async getTemperatureSummaryByZoneId(
    zoneId: string,
  ): Promise<Omit<ZoneTemperatureSummary, 'zone'>> {
    const { records, totalRecords } = await this.getByZoneId({
      zoneId,
    });

    return {
      averageTemperature: calculateAverageTemperature(records),
      minTemperature: calculateMinTemperature(records),
      maxTemperature: calculateMaxTemperature(records),
      recordCount: totalRecords,
    };
  }

  async getAnomaliesByZoneId(zoneId: string): Promise<TemperatureRecord[][]> {
    const { records } = await this.getByZoneId({
      zoneId,
    });

    const anomalies: TemperatureRecord[][] = await calculateAnomalies(records);

    return anomalies;
  }
}
