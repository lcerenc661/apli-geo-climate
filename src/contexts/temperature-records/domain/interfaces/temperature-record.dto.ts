import { TemperatureRecord } from '../entities/temperature-record.entity';

export interface GetTemperatureRecordsByZoneIdInterface {
  zoneId: string;
  sortBy?: 'timestamp' | 'temperature' | 'id';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}
export interface TemperatureRecordsByZoneInterface {
  records: TemperatureRecord[];
  totalRecords: number;
}

export interface CreateTemperatureRecordInterface {
  zoneId: string;
  timestamp: string;
  temperature: number;
}
