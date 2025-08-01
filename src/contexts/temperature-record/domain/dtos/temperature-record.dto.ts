import { TemperatureRecord } from '../entities/temperature-record.entity';

export interface TemperatureRecordsByZoneRequestDto {
  zoneId: string;
  sortBy?: 'timestamp' | 'temperature' | 'id';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}
export interface TemperatureRecordsByZoneResponseDto {
  records: TemperatureRecord[];
  totalRecords: number;
}
