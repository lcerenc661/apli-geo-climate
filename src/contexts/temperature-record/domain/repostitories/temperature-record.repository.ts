import { TemperatureRecord } from '../entities/temperature-record.entity';
import {
  TemperatureRecordsByZoneRequestDto,
  TemperatureRecordsByZoneResponseDto,
} from '../dtos/temperature-record.dto';
import { ZoneTemperatureSummary } from 'src/contexts/zone/domain/dtos/zone-temperature-summary.dto';

export abstract class TemperatureRecordRepository {
  abstract save(record: TemperatureRecord): Promise<TemperatureRecord>;
  abstract getByZoneId(
    request: TemperatureRecordsByZoneRequestDto,
  ): Promise<TemperatureRecordsByZoneResponseDto>;

  abstract getAnomaliesByZoneId(zoneId: string): Promise<TemperatureRecord[][]>;

  abstract getTemperatureSummaryByZoneId(
    zoneId: string,
  ): Promise<Omit<ZoneTemperatureSummary, 'zone'>>;
}
