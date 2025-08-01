import { Controller, Get, Param } from '@nestjs/common';
import { GetZoneAnomaliesUseCase } from 'src/contexts/zone/application/use-cases/get-zone-temperature-records-anomalies.use-case';
import { GetZoneSummaryUseCase } from 'src/contexts/zone/application/use-cases/get-zone-temperature-records-summary.use-case';
import { ZoneTemperatureSummaryInterface } from 'src/contexts/zone/domain/interfaces/zone-temperature-summary.dto';
import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';

@Controller('zones')
export class ZoneController {
  constructor(
    private readonly getZoneSummaryUseCase: GetZoneSummaryUseCase,
    private readonly getZoneAnomaliesUseCase: GetZoneAnomaliesUseCase,
  ) {}

  @Get(':zoneId/summary')
  async getZoneSummary(
    @Param('zoneId') zoneId: string,
  ): Promise<ZoneTemperatureSummaryInterface> {
    return await this.getZoneSummaryUseCase.execute(zoneId);
  }

  @Get(':zoneId/anomalies')
  async getZoneAnomalies(
    @Param('zoneId') zoneId: string,
  ): Promise<TemperatureRecord[][]> {
    return await this.getZoneAnomaliesUseCase.execute(zoneId);
  }
}
