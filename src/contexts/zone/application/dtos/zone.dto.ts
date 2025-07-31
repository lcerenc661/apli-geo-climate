import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';
import { ZoneTemperatureSummary } from '../../domain/dtos/zone-temperature-summary.dto';

export class GetZoneAnomaliesRequestDto {
  constructor(public readonly zoneId: string) {}
}

export class GetZoneAnomaliesResponseDto {
  constructor(public readonly anomalies: TemperatureRecord[]) {}
}

export class GetZoneSummaryRequestDto {
  constructor(public readonly zoneId: string) {}
}

export class GetZoneSummaryResponseDto {
  constructor(public readonly zoneTemperatureSummary: ZoneTemperatureSummary) {}
}
