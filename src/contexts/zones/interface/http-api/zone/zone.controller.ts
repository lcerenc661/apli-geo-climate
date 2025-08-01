import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetZoneAnomaliesUseCase } from 'src/contexts/zones/application/use-cases/get-zone-temperature-records-anomalies.use-case';
import { GetZoneSummaryUseCase } from 'src/contexts/zones/application/use-cases/get-zone-temperature-records-summary.use-case';
import { ZoneTemperatureSummaryInterface } from 'src/contexts/zones/domain/interfaces/zone-temperature-summary.dto';
import { TemperatureRecord } from 'src/contexts/temperature-records/domain/entities/temperature-record.entity';
import { JwtAuthGuard } from 'src/contexts/auth/interface/guards/jwt-auth.guards';

@Controller('zones')
export class ZoneController {
  constructor(
    private readonly getZoneSummaryUseCase: GetZoneSummaryUseCase,
    private readonly getZoneAnomaliesUseCase: GetZoneAnomaliesUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':zoneId/summary')
  async getZoneSummary(
    @Param('zoneId') zoneId: string,
  ): Promise<ZoneTemperatureSummaryInterface> {
    return await this.getZoneSummaryUseCase.execute(zoneId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':zoneId/anomalies')
  async getZoneAnomalies(
    @Param('zoneId') zoneId: string,
  ): Promise<TemperatureRecord[][]> {
    return await this.getZoneAnomaliesUseCase.execute(zoneId);
  }
}
