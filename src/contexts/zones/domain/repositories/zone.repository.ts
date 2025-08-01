import { TemperatureRecord } from 'src/contexts/temperature-records/domain/entities/temperature-record.entity';
import { ZoneTemperatureSummaryInterface } from '../interfaces/zone-temperature-summary.dto';

export abstract class ZoneRepository {
  abstract zoneExists(zoneId: string): Promise<boolean>;
  abstract getSummary(zoneId: string): Promise<ZoneTemperatureSummaryInterface>;
  abstract getZoneAnomalies(zoneId: string): Promise<TemperatureRecord[][]>;
}
