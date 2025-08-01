import { TemperatureRecord } from '../entities/temperature-record.entity';
import {
  CreateTemperatureRecordInterface,
  GetTemperatureRecordsByZoneIdInterface,
  TemperatureRecordsByZoneInterface,
} from '../interfaces/temperature-record.dto';
import { ZoneTemperatureSummaryInterface } from 'src/contexts/zones/domain/interfaces/zone-temperature-summary.dto';

export abstract class TemperatureRecordRepository {
  abstract save(
    record: CreateTemperatureRecordInterface,
  ): Promise<TemperatureRecord>;
  abstract getByZoneId(
    request: GetTemperatureRecordsByZoneIdInterface,
  ): Promise<TemperatureRecordsByZoneInterface>;

  abstract getAnomaliesByZoneId(zoneId: string): Promise<TemperatureRecord[][]>;

  abstract getTemperatureSummaryByZoneId(
    zoneId: string,
  ): Promise<Omit<ZoneTemperatureSummaryInterface, 'zone'>>;
}
