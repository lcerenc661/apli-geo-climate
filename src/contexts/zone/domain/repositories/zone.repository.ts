import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';
import { ZoneTemperatureSummary } from '../dtos/zone-temperature-summary.dto';

export abstract class ZoneRepository {
  abstract zoneExists(zoneId: string): Promise<boolean>;
  abstract getSummary(zoneId: string): Promise<ZoneTemperatureSummary>;
  abstract getZoneAnomalies(zoneId: string): Promise<TemperatureRecord[][]>;
}
