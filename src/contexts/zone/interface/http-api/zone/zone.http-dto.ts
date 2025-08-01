import { IsNotEmpty, IsString } from 'class-validator';

export class GetZoneAnomaliesByIdHttpDto {
  @IsNotEmpty()
  @IsString()
  zoneId: string;
}

export class GetZoneSummaryByIdHttpDto {
  @IsNotEmpty()
  @IsString()
  zoneId: string;
}
