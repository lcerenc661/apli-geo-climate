import { ZoneTemperatureSummaryInterface } from 'src/contexts/zone/domain/interfaces/zone-temperature-summary.dto';
import { TemperatureRecordRepository } from '../../domain/repostitories/temperature-record.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTemperatureSummaryByZoneIdUseCase {
  constructor(
    private readonly temperatureRecordRepository: TemperatureRecordRepository,
  ) {}

  async execute(
    zoneId: string,
  ): Promise<Omit<ZoneTemperatureSummaryInterface, 'zone'>> {
    const summary =
      await this.temperatureRecordRepository.getTemperatureSummaryByZoneId(
        zoneId,
      );
    return summary;
  }
}
