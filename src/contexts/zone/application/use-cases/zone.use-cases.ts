import { Injectable } from '@nestjs/common';

import {
  GetZoneAnomaliesRequestDto,
  GetZoneAnomaliesResponseDto,
  GetZoneSummaryRequestDto,
  GetZoneSummaryResponseDto,
} from '../dtos/zone.dto';
import { ZoneRepository } from '../../domain/repositories/zone.repository';
import { EntityNotFoundError } from 'src/contexts/shared/error/application-error';
import { InMemoryZoneRepository } from '../../infrastructure/in-memory/repositoriesImpl/in-memory.zone.repositoryImpl';

@Injectable()
export class GetZoneAnomaliesUseCase {
  constructor(private readonly zoneRepository: InMemoryZoneRepository) {}

  async execute(
    dto: GetZoneAnomaliesRequestDto,
  ): Promise<GetZoneAnomaliesResponseDto> {
    if (!(await this.zoneRepository.zoneExists(dto.zoneId))) {
      throw new EntityNotFoundError('Zone', dto.zoneId, 'Zone not found');
    }
    const anomalies = await this.zoneRepository.getAnomalies(dto.zoneId);
    return new GetZoneAnomaliesResponseDto(anomalies);
  }
}

@Injectable()
export class GetZoneSummaryUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(
    dto: GetZoneSummaryRequestDto,
  ): Promise<GetZoneSummaryResponseDto> {
    if (!(await this.zoneRepository.zoneExists(dto.zoneId))) {
      throw new EntityNotFoundError('Zone', dto.zoneId, 'Zone not found');
    }
    const summary = await this.zoneRepository.getSummary(dto.zoneId);
    return new GetZoneSummaryResponseDto(summary);
  }
}
