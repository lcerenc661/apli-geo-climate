import { Injectable } from '@nestjs/common';
import { TemperatureRecord } from '../../domain/entities/temperature-record.entity';
import { TemperatureRecordRepository } from '../../domain/repostitories/temperature-record.repository';

@Injectable()
export class GetTemperatureAnomaliesByZoneIdUseCase {
  constructor(
    private readonly temperatureRecordRepository: TemperatureRecordRepository,
  ) {}

  async execute(zoneId: string): Promise<TemperatureRecord[][]> {
    const anomalies: TemperatureRecord[][] =
      await this.temperatureRecordRepository.getAnomaliesByZoneId(zoneId);
    return anomalies;
  }
}
