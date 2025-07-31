import { TemperatureRecord } from '../entities/temperature-record.entity';

export abstract class TemperatureRecordRepository {
  abstract save(record: TemperatureRecord): Promise<TemperatureRecord>;
}
