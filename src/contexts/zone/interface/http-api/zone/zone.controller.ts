import { Controller, Get } from '@nestjs/common';
import { GetZoneAnomaliesUseCase } from 'src/contexts/zone/application/use-cases/get-zone-temperature-records-anomalies.use-case';
import { GetZoneSummaryUseCase } from 'src/contexts/zone/application/use-cases/get-zone-temperature-records-summary.use-case';
import {
  GetZoneAnomaliesByIdHttpDto,
  GetZoneSummaryByIdHttpDto,
} from './zone.http-dto';
import { ZoneTemperatureSummary } from 'src/contexts/zone/domain/dtos/zone-temperature-summary.dto';
import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';

@Controller('zone')
export class ZoneController {
  constructor(
    private readonly getZoneSummaryUseCase: GetZoneSummaryUseCase,
    private readonly getZoneAnomaliesUseCase: GetZoneAnomaliesUseCase,
  ) {}

  @Get(':zoneId/summary')
  async getZoneSummary(
    getZoneSummaryHttpDto: GetZoneSummaryByIdHttpDto,
  ): Promise<ZoneTemperatureSummary> {
    return await this.getZoneSummaryUseCase.execute(
      getZoneSummaryHttpDto.zoneId,
    );
  }

  @Get(':zoneId/anomalies')
  async getZoneAnomalies(
    getZoneAnomaliesHttpDto: GetZoneAnomaliesByIdHttpDto,
  ): Promise<TemperatureRecord[][]> {
    return await this.getZoneAnomaliesUseCase.execute(
      getZoneAnomaliesHttpDto.zoneId,
    );
  }
}
