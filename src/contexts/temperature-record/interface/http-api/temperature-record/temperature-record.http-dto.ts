import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTemperatureRecordHttpDto {
  @IsNotEmpty()
  @IsString()
  zoneId: string;

  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @IsISO8601()
  timestamp!: Date;
}
